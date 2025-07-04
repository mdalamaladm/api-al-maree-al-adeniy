import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ContentService } from './content.service';
import { UpdateContentDto } from './dto/update-content.dto';
import { CreateContentDto } from './dto/create-content.dto';

@Controller('content')
export class ContentController {
  constructor (private readonly contentService: ContentService) {}

  @Post()
  create(@Body() data: CreateContentDto) {
    return this.contentService.create(data);
  }

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateContentDto
  ) {
    return this.contentService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.contentService.delete(id);
  }
}
