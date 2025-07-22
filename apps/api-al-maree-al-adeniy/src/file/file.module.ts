import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { S3Module } from '../s3/s3.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CommandModule } from '../command/command.module';

@Module({
  imports: [
    PrismaModule,
    S3Module,
    CommandModule,
  ],
  exports: [FileService],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
