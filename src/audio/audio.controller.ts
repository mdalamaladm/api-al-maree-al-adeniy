import { Controller, Get, Param } from '@nestjs/common';
import { AudioService } from './audio.service';

@Controller('audio')
export class AudioController {
  constructor (private readonly audioService: AudioService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audioService.findOne(id);
  }
}
