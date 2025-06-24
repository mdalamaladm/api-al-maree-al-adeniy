import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';

@Controller('admin/type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  create(@Body() CreateTypeDto: CreateTypeDto) {
    return this.typeService.create(CreateTypeDto);
  }

  @Get()
  findAll() {
    return this.typeService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.typeService.delete(+id);
  }
}
