import { CreateMultipartUploadCommand, GetBucketEncryptionCommand, GetObjectCommand, PutObjectCommand, S3Client, S3ClientConfig, UploadPartCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private readonly bucketName: string | undefined;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.get<string>('S3_BUCKET_NAME');

    this.s3Client = new S3Client();
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

  async getUploadPresignedUrl (key: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        ContentType: 'application/octet-stream',
      });

      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: 500
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
