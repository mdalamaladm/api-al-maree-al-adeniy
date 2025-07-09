import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { S3Service } from '../s3/s3.service';
import { MultipartUploadPresignedDto } from './dto/multipart-upload-presigned.dto';
import { MultipartUploadCompleteDto } from './dto/multipart-upload-complete.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { AuthGuard } from '../auth.guard';

@Controller('file')
export class FileController {
  constructor (
    private readonly fileService: FileService,
    private readonly s3Client: S3Service,
  ) {}

  @UseGuards(AuthGuard)
  @Get('upload/presigned')
  async getUploadPresigned() {
    return await this.fileService.getUploadPresigned();
  }

  @UseGuards(AuthGuard)
  @Get('multipart-upload/upload-id')
  async getMultipartUploadUploadId(@Query('key') key: string) {
    return await this.s3Client.getMultipartUploadId(key);
  }

  @UseGuards(AuthGuard)
  @Post('multipart-upload/presigned')
  async getMultipartUploadPresigned(
    @Body() payload: MultipartUploadPresignedDto,
    @Query('key') key: string,
    @Query('uploadId') uploadId: string,
  ) {
    const presignedUrls = await this.s3Client.getMultipartUploadPresignedUrls(key, uploadId, payload.fileSize);

    return presignedUrls;
  }
  
  @UseGuards(AuthGuard)
  @Post('multipart-upload/complete')
  async completeMultipartUpload(
    @Body() payload: MultipartUploadCompleteDto[],
    @Query('key') key: string,
    @Query('uploadId') uploadId: string,
  ) {
    const response = await this.s3Client.completeMultipartUpload(key, uploadId, payload);

    return response;
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: CreateFileDto) {
    return this.fileService.create(data);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFileDto
  ) {
    return this.fileService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.fileService.delete(id)
  }
}
