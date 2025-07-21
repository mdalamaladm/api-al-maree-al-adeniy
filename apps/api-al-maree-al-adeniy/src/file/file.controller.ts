import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Query } from '@nestjs/common';
import { FileService } from './file.service';
import { S3Service } from '../s3/s3.service';
import { File } from 'generated/prisma';

@Controller('file')
export class FileController {
  constructor (
    private readonly fileService: FileService,
    private readonly s3Client: S3Service,
  ) {}

  @Get()
  findAll(
    @Query() query: Record<string, any>
  ) {
    return this.fileService.findAll({
      where: query,
      orderBy: [
        {
          id: 'asc'
        }
      ],
      select: {
        id: true,
        name: true,
        media: {
          select: {
            alias: true,
            name: true,
          }
        },
        type: {
          select: {
            alias: true,
            name: true,
          }
        },
        content: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });
  }

  @Get('/meta/:id')
  async findMeta(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: Record<string, any>,
  ) {
    const file: File | null = await this.fileService.findUnique({
      where: {
        id
      }
    });

    if (!file) {
      throw new HttpException('Id is invalid', HttpStatus.BAD_REQUEST);
    }

    const meta = await this.s3Client.getMeta(file.key);

    const returnedMeta = {};

    for (const key in query) {
      if (query[key] === 'true') {
        returnedMeta[key] = meta[key];
      }
    }

    return returnedMeta;
  }

  @Get('/:id')
  async findUnique(
    @Param('id', ParseIntPipe) id: number
  ) {
    const file: File | null = await this.fileService.findUnique({
      where: {
        id
      }
    });

    if (!file) {
      throw new HttpException('Id is invalid', HttpStatus.BAD_REQUEST);
    }

    return await this.s3Client.getDownloadPresignedUrl(file.key, 300);
  }
}
