import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [ContentService],
  providers: [ContentService],
  controllers: [ContentController],
})
export class ContentModule {}
