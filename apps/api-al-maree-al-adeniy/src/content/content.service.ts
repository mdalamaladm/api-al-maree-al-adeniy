import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data) {
    const content = await this.prisma.content.create({ data });

    return content;
  }

  async findAll() {
    const contents = await this.prisma.content.findMany();

    return contents;
  }

  async delete(id) {
    const content = await this.prisma.content.delete({
      where: { id }
    })

    return content;
  }
}
