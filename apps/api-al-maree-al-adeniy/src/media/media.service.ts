import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data) {
    const media = await this.prisma.media.create({ data });

    return media;
  }

  async findAll() {
    const medias = await this.prisma.media.findMany();

    return medias;
  }

  async delete(id) {
    const media = await this.prisma.media.delete({
      where: { id }
    });

    return media;
  }
}
