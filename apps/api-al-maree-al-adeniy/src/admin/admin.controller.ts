import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { MediaService } from '../media/media.service';
import { TypeService } from '../type/type.service';
import { ContentService } from '../content/content.service';
import { CreateContentDto } from '../content/dto/create-content.dto';
import { CreateMediaDto } from '../media/dto/create-media.dto';
import { CreateTypeDto } from '../type/dto/create-type.dto';
import { AuthGuard } from '../auth.guard';
import { CreateFileDto } from '../file/dto/create-file.dto';
import { FileService } from '../file/file.service';
import { UpdateFileDto } from '../file/dto/update-file.dto';
import { MultipartUploadCompleteDto } from '../file/dto/multipart-upload-complete.dto';
import { MultipartUploadPresignedDto } from '../file/dto/multipart-upload-presigned.dto';
import { S3Service } from '../s3/s3.service';
import { UpdateMediaDto } from '../media/dto/update-media.dto';
import { UpdateTypeDto } from '../type/dto/update-type.dto';
import { UpdateContentDto } from '../content/dto/update-content.dto';

@Controller('admin')
export class AdminController {
  constructor (
    private readonly adminService: AdminService,
    private readonly fileService: FileService,
    private readonly mediaService: MediaService,
    private readonly typeService: TypeService,
    private readonly contentService: ContentService,
    private readonly s3Client: S3Service,
  ) {}

  @Post('auth')
  async login(@Body() loginAdminDto: LoginAdminDto) {
    return await this.adminService.login(loginAdminDto);
  }

  @UseGuards(AuthGuard)
  @Get('file/upload/presigned')
  async getUploadPresigned() {
    return await this.fileService.getUploadPresigned();
  }

  @UseGuards(AuthGuard)
  @Get('file/multipart-upload/upload-id')
  async getMultipartUploadUploadId(@Query('key') key: string) {
    return await this.s3Client.getMultipartUploadId(key);
  }

  @UseGuards(AuthGuard)
  @Post('file/multipart-upload/presigned')
  async getMultipartUploadPresigned(
    @Body() payload: MultipartUploadPresignedDto,
    @Query('key') key: string,
    @Query('uploadId') uploadId: string,
  ) {
    const presignedUrls = await this.s3Client.getMultipartUploadPresignedUrls(key, uploadId, payload.fileSize);

    return presignedUrls;
  }
  
  @UseGuards(AuthGuard)
  @Post('file/multipart-upload/complete')
  async completeMultipartUpload(
    @Body() payload: MultipartUploadCompleteDto[],
    @Query('key') key: string,
    @Query('uploadId') uploadId: string,
  ) {
    const response = await this.s3Client.completeMultipartUpload(key, uploadId, payload);

    return response;
  }

  @UseGuards(AuthGuard)
  @Post('file')
  createFile(@Body() data: CreateFileDto) {
    return this.fileService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get('file')
  findAllFile() {
    return this.fileService.findAll();
  }


  @UseGuards(AuthGuard)
  @Put('file/:id')
  updateFile(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFileDto
  ) {
    return this.fileService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete('file/:id')
  deleteFile(@Param('id', ParseIntPipe) id: string) {
    return this.fileService.delete(id)
  }

  @UseGuards(AuthGuard)
  @Post('media')
  createMedia(@Body() data: CreateMediaDto) {
    return this.mediaService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get('media')
  findAllMedia() {
    return this.mediaService.findAll();
  }

  @UseGuards(AuthGuard)
  @Put('media/:id')
  updateMedia(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMediaDto
  ) {
    return this.mediaService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete('media/:id')
  deleteMedia(@Param('id', ParseIntPipe) id: number) {
    return this.mediaService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Post('type')
  createType(@Body() data: CreateTypeDto) {
    return this.typeService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get('type')
  findAllType() {
    return this.typeService.findAll();
  }
  
  @UseGuards(AuthGuard)
  @Put('type/:id')
  updateType(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTypeDto
  ) {
    return this.typeService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete('type/:id')
  deleteType(@Param('id', ParseIntPipe) id: number) {
    return this.typeService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Post('content')
  createContent(@Body() data: CreateContentDto) {
    return this.contentService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get('content')
  findAllContent() {
    return this.contentService.findAll();
  }

  @UseGuards(AuthGuard)
  @Put('content/:id')
  updateContent(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateContentDto
  ) {
    return this.contentService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete('content/:id')
  deleteContent(@Param('id', ParseIntPipe) id: number) {
    return this.contentService.delete(id);
  }
}
