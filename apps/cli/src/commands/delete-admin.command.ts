import * as bcrypt from 'bcrypt';
import { Command, CommandRunner, InquirerService } from "nest-commander";
import { PrismaService } from "../prisma/prisma.service";

@Command({ name: 'delete-admin', description: 'Delete admin' })
export class DeleteAdminCommand extends CommandRunner {
  constructor(private readonly prisma: PrismaService, private readonly inquirer: InquirerService) {
    super();
  }

  async run() {
    try {
      let answer = await this.inquirer.ask('delete-admin-questions', undefined);

      const deleted = await this.prisma.admin.delete({
        where: {
          username: answer.username
        }
      });

      console.log(`Admin with username: ${deleted.username} has been deleted!`);
    } catch (e) {
      console.log(e.message);
    }
  }
}