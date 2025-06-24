import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data) {
    const type = await this.prisma.type.create({ data });

    return type;
  }

  async findAll() {
    const types = await this.prisma.type.findMany();

    return types;
  }

  async delete(id) {
    const type = await this.prisma.type.delete({
      where: { id }
    })

    return type;
  }
}
