import { CreateMultipartUploadCommand, GetObjectCommand, S3Client, S3ClientConfig, UploadPartCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private readonly bucketName: string | undefined;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.get<string>('S3_REGION');
    const params: S3ClientConfig = {
      region: this.configService.get<string>('S3_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('S3_ACCESS_KEY_ID') || '',
        secretAccessKey: this.configService.get<string>('S3_SECRET_ACCESS_KEY') || '',
      }
    };

    this.s3Client = new S3Client(params);
  }

  async getPresignedDownloadUrl (key: string, expiresInSeconds: number = 300): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: expiresInSeconds,
      });

      return url;
    } catch (error) {
      throw new InternalServerErrorException('Failed to generate pre-signed URL');
    }
  }

  async getMultipartUploadId (key: string) {
    const createMultipartUploadCommand = new CreateMultipartUploadCommand({
      Bucket: this.bucketName,
      Key: key
    });

    const startUploadResponse = await this.s3Client.send(createMultipartUploadCommand);

    return startUploadResponse.UploadId;
  }

  async getMultipartUploadPresignedUrls (key: string, fileSize: number, uploadId: string | undefined) {
    const fiveMB = 5_000_000
    const numberOfParts = Math.ceil(fileSize / fiveMB);

    const presignedUrls: string[] = [];

    for (let  i = 0; i < numberOfParts; i++) {
      const uploadPartCommand = new UploadPartCommand({
        Bucket: this.bucketName,
        Key: key,
        UploadId: uploadId,
        PartNumber: i + 1,
      })

      const presignedUrl = await getSignedUrl(this.s3Client, uploadPartCommand, {
        expiresIn: 60 * 5
      })

      presignedUrls.push(presignedUrl);
    }

    return presignedUrls;
  }
}
