import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { S3Service } from '../s3/s3.service';
import { MultipartUploadPresigned } from './dto/multipart-upload-presigned.dto';

@Controller('file')
export class FileController {
  constructor (
    private readonly fileService: FileService,
    private readonly s3Client: S3Service,
  ) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto[]) {
    return this.fileService.create(createFileDto);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get('upload-presigned')
  async getUploadPresigned(@Query('key') key: string) {
    return await this.fileService.getUploadPresigned(key);
  }

  @Post('multipart-upload-presigned')
  async getMultipartUploadPresigned(@Body() payload: MultipartUploadPresigned) {
    const uploadId = await this.s3Client.getMultipartUploadId(payload.key);
    const presignedUrls = await this.s3Client.getMultipartUploadPresignedUrls(payload.key, payload.fileSize, uploadId);

    return presignedUrls;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(id);
  }
}
