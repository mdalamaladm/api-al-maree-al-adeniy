import { Controller, Get } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor (private readonly mediaService: MediaService) {}

  @Get()
  findAll() {
    return this.mediaService.findAll({
      orderBy: [
        {
          createdAt: 'asc'
        },
      ],
      select: {
        types: {
          select: {
            type: {
              select: {
                alias: true,
                name: true,
              }
            }
          }
        }
      }
    });
  }
}
