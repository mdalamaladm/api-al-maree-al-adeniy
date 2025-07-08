import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data) {
    return await this.prisma.media.create({ data });
  }

  async findAll() {
    return await this.prisma.media.findMany({
      orderBy: [
        {
          id: 'asc'
        }
      ],
    });
  }

  async update(id, data) {
    if (id === 1 || id === 2 || id === 3) {
      throw new HttpException('Cannot update default value', HttpStatus.BAD_REQUEST);
    } else {
      return await this.prisma.media.update({
        where: {
          id
        },
        data
      });
    }
  }

  async delete(id) {
    if (id === 1 || id === 2 || id === 3) {
      throw new HttpException('Cannot delete default value', HttpStatus.BAD_REQUEST);
    } else {
      return await this.prisma.media.delete({
        where: { id }
      });
    }
  }
}
