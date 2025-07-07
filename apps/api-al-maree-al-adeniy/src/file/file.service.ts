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
    return await this.prisma.file.create({ data })
  }

  async findAll() {
    return await this.prisma.file.findMany({
      select: {
        id: true,
        name: true,
        mediaId: true,
        typeId: true,
        contentId: true,
      }
    });
  }

  async findOne(id: string) {
    try {
      return await this.s3Client.getDownloadPresignedUrl("audio/muhadharat/test.mp3", 300);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(id, data) {
    return await this.prisma.file.update({
      where: {
        id
      },
      data
    });
  }

  async delete(id) {
    const { key } = this.prisma.file.findFirst({
      where: {
        id,
      },
      select: {
        key: true,
      }
    });

    await this.s3Client.deleteObject(key);

    return await this.prisma.type.delete({
      where: { id }
    });
  }

  async getUploadPresigned() {
    try {
      const key = crypto.randomUUID();
      const presigned = await this.s3Client.getUploadPresignedUrl(key);

      return { key, presigned }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
