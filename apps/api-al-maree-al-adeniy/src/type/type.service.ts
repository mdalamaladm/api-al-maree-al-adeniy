import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data) {
    return await this.prisma.type.create({ data });
  }

  async findAll() {
    return await this.prisma.type.findMany();
  }

  async delete(id) {
    return await this.prisma.type.delete({
      where: { id }
    })
  }
}
