import { Controller, Get, Param } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor (
    private readonly fileService: FileService,
  ) {}

  @Get()
  findAll() {
    return this.fileService.findAll({
      orderBy: [
        {
          id: 'asc'
        }
      ],
      select: {
        id: true,
        name: true
      }
    });
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(id);
  }
}
