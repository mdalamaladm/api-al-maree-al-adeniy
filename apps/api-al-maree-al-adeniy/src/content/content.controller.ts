import { Controller, Get, Query } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor (private readonly contentService: ContentService) {}

  
  @Get()
  findAll(
    @Query('typeId') typeId: string
  ) {
    const where: { isLecture?: boolean } = {};

    if (typeId !== undefined) {
      where.isLecture = typeId === 'durus';
    }

    return this.contentService.findAll({
      where,
      orderBy: [
        {
          id: 'asc'
        }
      ],
      select: {
        id: true,
        name: true,
        isLecture: true,
      }
    });
  }
}
