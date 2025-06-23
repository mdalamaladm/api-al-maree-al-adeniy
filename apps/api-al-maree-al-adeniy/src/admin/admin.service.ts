import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor (
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  async login(payload) {
    const admin = await this.prisma.admin.findUnique({
      where: {
        username: payload.username
      }
    });

    if (!admin) {
      throw new HttpException('Username or password is invalid', HttpStatus.UNAUTHORIZED)
    }

    const match = compareSync(admin.salt + payload.password, admin.password);

    if (!match) {
      throw new HttpException('Username or password is invalid', HttpStatus.UNAUTHORIZED)
    }

    return {
      access_token: await this.jwt.signAsync({ username: admin.username })
    };
  }
}
