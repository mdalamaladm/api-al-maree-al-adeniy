import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Service } from 'src/s3/s3.service';


@Injectable()
export class AudioService {
  constructor(private readonly s3Service: S3Service) {}

  async findOne(id: string) {
    try {
      return await this.s3Service.getPresignedDownloadURl("audio/muhadharat/1. [MUHADHARAH][ADAB][NODATE][NOPLACE][CLEAN][CONFIRM][PM][2x] صلة الرحم.mp3", 300);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
