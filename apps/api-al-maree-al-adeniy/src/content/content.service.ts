import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data) {
    return await this.prisma.content.create({ data });
  }

  async findAll() {
    return await this.prisma.content.findMany();
  }

  async delete(id) {
    return await this.prisma.content.delete({
      where: { id }
    })
  }
}
