import { Controller, Get, Param } from '@nestjs/common';
import { TypeService } from './type.service';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  
  @Get()
  findAll() {
    return this.typeService.findAll({
      orderBy: [
        {
          createdAt: 'asc'
        }
      ],
      select: {
        name: true,
        alias: true,
      }
    });
  }

  @Get(':id')
  findUnique(
    @Param('id') id: string
  ) {
    return this.typeService.findUnique({
      where: {
        alias: id
      },
      select: {
        name: true,
        alias: true,
      }
    });
  }
}
