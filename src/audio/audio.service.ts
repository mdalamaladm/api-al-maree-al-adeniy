import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AudioService {
  private audio = [
    {
      id: '123',
      name: 'sample-1',
      key: 'zxc'
    }
  ];

  findOne(id: string) {
    const audio = this.audio.find(a => a.id === id);

    if (!audio) {
      throw new NotFoundException(`Audio #${id} not found`);
    }

    return audio;
  }
}
