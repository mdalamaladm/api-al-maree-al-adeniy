import { Command, CommandRunner, InquirerService } from "nest-commander";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAdminDto } from "../dto/create-admin.dto";
import { generate } from "generate-password";
import { randomBytes } from "crypto";
import { hashSync } from "bcrypt";

@Command({ name: 'create-superadmin', description: 'Create new superadmin' })
export class CreateSuperadminCommand extends CommandRunner {
  constructor(private readonly prisma: PrismaService, private readonly inquirer: InquirerService) {
    super();
  }

  async run() {
    try {
      const salt = randomBytes(16).toString('hex');
      const password = generate({
        length: 16,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
      });

      const data: CreateAdminDto = {
        username: 'superadmin',
        password: hashSync(salt + password, 10),
        salt,
        createdBy: 'root',
        updatedBy: 'root',
      }

      const admin = await this.prisma.admin.create({ data });
      
      console.log(`Superadmin created!\n\nUsername: ${admin.username}\nPassword: ${password}`);
    } catch (e) {
      console.log(e.message);
    }
  }
}