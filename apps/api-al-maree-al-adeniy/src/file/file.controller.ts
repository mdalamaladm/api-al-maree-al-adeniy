import { Controller, Get, Param, Query } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor (
    private readonly fileService: FileService,
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

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(id);
  }
}
