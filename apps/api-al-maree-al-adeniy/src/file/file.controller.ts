import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { S3Service } from '../s3/s3.service';
import { MultipartUploadPresignedDto } from './dto/multipart-upload-presigned.dto';
import { MultipartUploadCompleteDto } from './dto/multipart-upload-complete.dto';

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

  @Get('upload/presigned')
  async getUploadPresigned(@Query('key') key: string) {
    return await this.fileService.getUploadPresigned(key);
  }

  @Get('multipart-upload/upload-id/:key')
  async getMultipartUploadUploadId(@Param('key') key: string) {
    return await this.s3Client.getMultipartUploadId(key);
  }

  @Post('multipart-upload/presigned/:key/:uploadId')
  async getMultipartUploadPresigned(
    @Body() payload: MultipartUploadPresignedDto,
    @Param('key') key: string,
    @Param('uploadId') uploadId: string,
  ) {
    const presignedUrls = await this.s3Client.getMultipartUploadPresignedUrls(key, uploadId, payload.fileSize);

    return presignedUrls;
  }

  @Post('multipart-upload/complete/:key/:uploadId')
  async completeMultipartUpload(
    @Body() payload: MultipartUploadCompleteDto[],
    @Param('key') key: string,
    @Param('uploadId') uploadId: string,
  ) {
    const response = await this.s3Client.completeMultipartUpload(key, uploadId, payload);

    return response;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(id);
  }
}
