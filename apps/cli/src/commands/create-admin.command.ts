import { Command, CommandRunner, InquirerService } from "nest-commander";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAdminDto } from "../dto/create-admin.dto";
import { generate } from "generate-password";
import { randomBytes } from "crypto";
import { hashSync } from "bcrypt";

@Command({ name: 'create-admin', description: 'Create new admin' })
export class CreateAdminCommand extends CommandRunner {
  constructor(private readonly prisma: PrismaService, private readonly inquirer: InquirerService) {
    super();
  }

  async run() {
    try {
      let answer = await this.inquirer.ask('create-admin-questions', undefined);

      const salt = randomBytes(16).toString('hex');
      const password = generate({
        length: 16,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
      });

      const data: CreateAdminDto = {
        username: answer.username,
        password: hashSync(salt + password, 10),
        salt,
        createdBy: 'superadmin',
        updatedBy: 'superadmin',
      }

      const admin = await this.prisma.admin.create({ data });
      
      console.log(`Admin created!\n\nUsername: ${admin.username}\nPassword: ${password}`);
    } catch (e) {
      console.log(e.message);
    }
  }
}