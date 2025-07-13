import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data) {
    return await this.prisma.type.create({ data });
  }

  async findAll(params) {
    return await this.prisma.type.findMany(params);
  }

  async update(id, data) {
    if (id === 'none' || id === 'muhadharat' || id === 'khuthab' || id === 'durus' || id === 'fatawa') {
      throw new HttpException('Cannot update default value', HttpStatus.BAD_REQUEST);
    } else {
      return await this.prisma.type.update({
        where: {
          alias: id
        },
        data
      });
    }
  }

  async delete(id) {
    if (id === 'none' || id === 'muhadharat' || id === 'khuthab' || id === 'durus' || id === 'fatawa') {
      throw new HttpException('Cannot delete default value', HttpStatus.BAD_REQUEST);
    } else {
      return await this.prisma.type.delete({
        where: {
          alias: id
        }
      });
    }
  }
}
