import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [MediaService],
  providers: [MediaService],
  controllers: [MediaController]
})
export class MediaModule {}
