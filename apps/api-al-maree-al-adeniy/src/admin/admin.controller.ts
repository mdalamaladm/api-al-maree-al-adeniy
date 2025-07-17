import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
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

type AdminRequest = Request & {
  user: {
    username: string;
  }
}

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
    return await this.adminService.auth(loginAdminDto);
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
  createFile(
    @Body() data: CreateFileDto,
    @Req() request: AdminRequest,
  ) {
    data.createdBy = request.user.username;
    data.updatedBy = request.user.username;

    return this.fileService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get('file')
  findAllFile() {
    return this.fileService.findAll({
      orderBy: [
        {
          id: 'asc'
        }
      ],
      select: {
        id: true,
        name: true,
        mediaId: true,
        typeId: true,
        contentId: true,
        media: {
          select: {
            alias: true,
            name: true,
          }
        },
        type: {
          select: {
            alias: true,
            name: true,
          }
        },
        content: { select: { name: true } },
        createdAt: true,
        updatedAt: true,
        createdBy: true,
        updatedBy: true,
      }
    });
  }


  @UseGuards(AuthGuard)
  @Put('file/:id')
  updateFile(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFileDto,
    @Req() request: AdminRequest,
  ) {
    data.updatedBy = request.user.username;

    return this.fileService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete('file/:id')
  deleteFile(@Param('id', ParseIntPipe) id: number) {
    return this.fileService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Post('media')
  createMedia(
    @Body() data: CreateMediaDto,
    @Req() request: AdminRequest,
  ) {
    data.createdBy = request.user.username;
    data.updatedBy = request.user.username;

    return this.mediaService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get('media')
  async findAllMedia() {
    type Media = {
      alias: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      createdBy: string;
      updatedBy: string;
      types?: { type: string }[] | undefined;
    }

    const res: Media[] = await this.mediaService.findAll({
      orderBy: [
        {
          createdAt: 'asc'
        },
      ],
      select: {
        alias: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        createdBy: true,
        updatedBy: true,
        types: {
          select: {
            type: {
              select: {
                alias: true,
                name: true,
              }
            }
          }
        }
      }
    });

    return res.map(e => ({
      ...e,
      types: (e?.types || []).map(t => t.type)
    }))
  }

  @UseGuards(AuthGuard)
  @Put('media/:id')
  updateMedia(
    @Param('id') id: string,
    @Body() data: UpdateMediaDto,
    @Req() request: AdminRequest,
  ) {
    data.updatedBy = request.user.username;

    return this.mediaService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete('media/:id')
  deleteMedia(@Param('id') id: string) {
    return this.mediaService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Post('type')
  createType(
    @Body() data: CreateTypeDto,
    @Req() request: AdminRequest,
  ) {
    data.createdBy = request.user.username;
    data.updatedBy = request.user.username;

    return this.typeService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get('type')
  findAllType() {
    return this.typeService.findAll({
      orderBy: [
        {
          createdAt: 'asc'
        }
      ],
    });
  }
  
  @UseGuards(AuthGuard)
  @Put('type/:id')
  updateType(
    @Param('id') id: string,
    @Body() data: UpdateTypeDto,
    @Req() request: AdminRequest,
  ) {
    data.updatedBy = request.user.username;

    return this.typeService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete('type/:id')
  deleteType(@Param('id') id: string) {
    return this.typeService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Post('content')
  createContent(
    @Body() data: CreateContentDto,
    @Req() request: AdminRequest,
  ) {
    data.createdBy = request.user.username;
    data.updatedBy = request.user.username;

    return this.contentService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get('content')
  findAllContent() {
    return this.contentService.findAll({
      orderBy: [
        {
          id: 'asc'
        }
      ],
    });
  }

  @UseGuards(AuthGuard)
  @Put('content/:id')
  updateContent(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateContentDto,
    @Req() request: AdminRequest,
  ) {
    data.updatedBy = request.user.username;

    return this.contentService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete('content/:id')
  deleteContent(@Param('id', ParseIntPipe) id: number) {
    return this.contentService.delete(id);
  }
}
