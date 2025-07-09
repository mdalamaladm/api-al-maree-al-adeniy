import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { AuthGuard } from '../auth.guard';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: CreateTypeDto) {
    return this.typeService.create(data);
  }

  @Get()
  findAll() {
    return this.typeService.findAll();
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTypeDto
  ) {
    return this.typeService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.typeService.delete(id);
  }
}
