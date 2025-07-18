import { Controller, Get, Param } from '@nestjs/common';
import { MediaService } from './media.service';

type Media = {
  alias: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  types?: { type: string }[] | undefined;
}

@Controller('media')
export class MediaController {
  constructor (private readonly mediaService: MediaService) {}

  @Get()
  async findAll() {
    const res: Media[] = await this.mediaService.findAll({
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

    return res.map(e => ({
      ...e,
      types: (e?.types || []).map(t => t.type)
    }))
  }

  @Get(':id')
  async findUnique(
    @Param('id') id: string
  ) {
    const res: Media = await this.mediaService.findUnique({
      where: {
        alias: id,
      },
      select: {
        name: true,
        alias: true,
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

    return {
      ...res,
      types: (res?.types || []).map(t => t.type)
    }
  }
}
