import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateMediaDto } from '../media/dto/create-media.dto';

@Controller('file')
export class FileController {
  constructor (private readonly fileService: FileService) {}

  @Post('media')
  create(@Body() createMediaDto: CreateMediaDto[]) {
    return this.fileService.create(createMediaDto);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(id);
  }
}
