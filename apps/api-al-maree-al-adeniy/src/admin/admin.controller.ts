import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admin')
export class AdminController {
  constructor (private readonly adminService: AdminService) {}

  @Post()
  @HttpCode(204)
  create(@Body() createAdminDto: CreateAdminDto) {
    console.log(createAdminDto);
  }
}
