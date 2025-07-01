import { Module } from '@nestjs/common';
import { CreateAdminCommand } from './commands/create-admin.command';
import { PrismaService } from './prisma/prisma.service';
import { CreateAdminQuestions } from './questions/create-admin-questions';
import { GetAdminCommand } from './commands/get-admin.command';
import { DeleteAdminCommand } from './commands/delete-admin.command';
import { DeleteAdminQuestions } from './questions/delete-admin-questions';
import { CreateCategoryCommand } from './commands/create-category-command';
import { CreateCategoryQuestions } from './questions/create-category-questions';
import { SeedCommand } from './commands/seed-command';

@Module({
  providers: [
    CreateAdminCommand,
    CreateAdminQuestions,
    DeleteAdminCommand,
    DeleteAdminQuestions,
    GetAdminCommand,
    CreateCategoryCommand,
    CreateCategoryQuestions,
    SeedCommand,
    PrismaService
  ],
})
export class CliModule {}
