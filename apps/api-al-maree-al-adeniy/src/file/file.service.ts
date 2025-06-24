import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data) {
    const file = await this.prisma.file.create({ data });

    return file;
  }

  async findAll() {
    const files = await this.prisma.file.findMany();

    return files;
  }

  async delete(id) {
    const file = await this.prisma.file.delete({
      where: { id }
    });

    return file;
  }
}
