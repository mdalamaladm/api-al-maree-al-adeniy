import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudioModule } from './audio/audio.module';
import { ConfigModule } from '@nestjs/config';
import { S3Service } from './s3/s3.service';

@Module({
  imports: [
    AudioModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
