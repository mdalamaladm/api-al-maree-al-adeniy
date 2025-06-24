import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';

@Controller('admin/content')
export class ContentController {
  constructor (private readonly contentService: ContentService) {}

  @Post()
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentService.create(createContentDto);
  }

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.contentService.delete(+id);
  }
}
