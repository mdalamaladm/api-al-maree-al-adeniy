import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { S3Module } from '../s3/s3.module';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { MediaModule } from '../media/media.module';
import { TypeModule } from '../type/type.module';
import { ContentModule } from '../content/content.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    PrismaModule,
    S3Module,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1m' }
    }),
    FileModule,
    MediaModule,
    TypeModule,
    ContentModule,
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
