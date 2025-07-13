import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data) {
    return await this.prisma.media.create({ data });
  }

  async findAll(params) {
    return await this.prisma.media.findMany(params);
  }

  async update(id, data) {
    if (id === 'none' || id === 'audio' || id === 'video') {
      throw new HttpException('Cannot update default value', HttpStatus.BAD_REQUEST);
    } else {
      return await this.prisma.media.update({
        where: {
          alias: id
        },
        data
      });
    }
  }

  async delete(id) {
    if (id === 'none' || id === 'audio' || id === 'video') {
      throw new HttpException('Cannot delete default value', HttpStatus.BAD_REQUEST);
    } else {
      return await this.prisma.media.delete({
        where: {
          alias: id
        }
      });
    }
  }
}
