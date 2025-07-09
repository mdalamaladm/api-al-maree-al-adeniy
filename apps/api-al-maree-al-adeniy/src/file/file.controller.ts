import { Controller, Get, Param } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor (
    private readonly fileService: FileService,
  ) {}

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(id);
  }
}
