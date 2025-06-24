import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';

@Controller('admin/file')
export class FileController {
  constructor (private readonly fileService: FileService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.fileService.delete(+id);
  }
}
