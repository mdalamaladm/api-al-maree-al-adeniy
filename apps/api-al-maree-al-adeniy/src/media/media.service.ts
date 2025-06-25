import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data) {
    return await this.prisma.media.create({ data });
  }

  async findAll() {
    return await this.prisma.media.findMany();
  }

  async delete(id) {
    return await this.prisma.media.delete({
      where: { id }
    });
  }
}
