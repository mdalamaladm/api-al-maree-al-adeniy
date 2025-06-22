import { Module } from '@nestjs/common';
import { CreateAdminCommand } from './commands/create-admin.command';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [CreateAdminCommand, PrismaService],
})
export class CliModule {}
