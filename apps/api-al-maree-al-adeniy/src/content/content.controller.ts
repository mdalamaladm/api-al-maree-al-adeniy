import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { UpdateContentDto } from './dto/update-content.dto';
import { CreateContentDto } from './dto/create-content.dto';
import { AuthGuard } from '../auth.guard';

@Controller('content')
export class ContentController {
  constructor (private readonly contentService: ContentService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: CreateContentDto) {
    return this.contentService.create(data);
  }

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateContentDto
  ) {
    return this.contentService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.contentService.delete(id);
  }
}
