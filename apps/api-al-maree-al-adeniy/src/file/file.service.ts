import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class FileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3Client: S3Service
  ) {}

  async create(data) {
    return await this.prisma.file.createManyAndReturn({ data })
  }

  async findAll() {
    return await this.prisma.file.findMany();
  }

  async findOne(id: string) {
    try {
      return await this.s3Client.getPresignedDownloadUrl("audio/muhadharat/test.mp3", 300);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getUploadPresigned(key: string) {
    try {
      return await this.s3Client.getUploadPresignedUrl(key);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
