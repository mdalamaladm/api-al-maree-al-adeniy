import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async update(id, data) {
    delete data.id;

    if (id === 1) {
      throw new HttpException('Cannot update default value', HttpStatus.BAD_REQUEST);
    } else {
      return await this.prisma.content.update({
        where: {
          id
        },
        data
      });
    }
  }

  async delete(id) {
    if (id === 1) {
      throw new HttpException('Cannot delete default value', HttpStatus.BAD_REQUEST);
    } else {
      return await this.prisma.content.delete({
        where: { id }
      });
    }
  }
}
