import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { AuthGuard } from '../auth.guard';

@Controller('media')
export class MediaController {
  constructor (private readonly mediaService: MediaService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: CreateMediaDto) {
    return this.mediaService.create(data);
  }

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMediaDto
  ) {
    return this.mediaService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.mediaService.delete(id);
  }
}
