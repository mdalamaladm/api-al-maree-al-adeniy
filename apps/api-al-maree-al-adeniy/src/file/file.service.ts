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
    try {
      return await this.prisma.file.create({ data })
    } catch (error) {
      console.log(error);

      await this.s3Client.deleteObject(data.key);

      throw new InternalServerErrorException(error);
    }
  }

  async findAll(params) {
    return await this.prisma.file.findMany(params);
  }

  async findUnique(params) {
    return await this.prisma.file.findUnique(params);
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
    const result = await this.prisma.file.findFirst({
      where: {
        id,
      },
    });

    if (!result) {
      throw new InternalServerErrorException('Id is not found');
    }

    await this.s3Client.deleteObject(result.key);

    return await this.prisma.file.delete({
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
