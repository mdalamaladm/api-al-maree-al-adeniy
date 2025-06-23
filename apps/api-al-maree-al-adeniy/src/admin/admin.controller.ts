import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('admin')
export class AdminController {
  constructor (private readonly adminService: AdminService) {}

  @Post('auth')
  async login(@Body() loginAdminDto: LoginAdminDto) {
    return await this.adminService.login(loginAdminDto);
  }
}
