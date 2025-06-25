import { Body, Controller, Delete, HttpCode, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { MediaService } from '../media/media.service';
import { TypeService } from '../type/type.service';
import { ContentService } from '../content/content.service';
import { CreateContentDto } from '../content/dto/create-content.dto';
import { CreateMediaDto } from '../media/dto/create-media.dto';
import { CreateTypeDto } from '../type/dto/create-type.dto';

@Controller('admin')
export class AdminController {
  constructor (
    private readonly adminService: AdminService,
    private readonly mediaService: MediaService,
    private readonly typeService: TypeService,
    private readonly contentService: ContentService,
  ) {}

  @Post('auth')
  async login(@Body() loginAdminDto: LoginAdminDto) {
    return await this.adminService.login(loginAdminDto);
  }

  @Post('media')
  createMedia(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @Delete('media/:id')
  deleteMedia(@Param('id') id: string) {
    return this.mediaService.delete(+id);
  }

  @Post('type')
  create(@Body() CreateTypeDto: CreateTypeDto) {
    return this.typeService.create(CreateTypeDto);
  }

  @Delete('type/:id')
  delete(@Param('id') id: string) {
    return this.typeService.delete(+id);
  }

  @Post('content')
  createContent(@Body() createContentDto: CreateContentDto) {
    return this.contentService.create(createContentDto);
  }

  @Delete('content/:id')
  deleteContent(@Param('id') id: string) {
    return this.contentService.delete(+id);
  }
}
