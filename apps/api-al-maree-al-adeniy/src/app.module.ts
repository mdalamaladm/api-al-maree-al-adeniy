import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { S3Module } from './s3/s3.module';
import { PrismaModule } from './prisma/prisma.module';
import { MediaModule } from './media/media.module';
import { TypeModule } from './type/type.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    FileModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AdminModule,
    S3Module,
    PrismaModule,
    MediaModule,
    TypeModule,
    ContentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
