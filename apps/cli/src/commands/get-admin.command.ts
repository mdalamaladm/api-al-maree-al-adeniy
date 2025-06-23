import { Command, CommandRunner} from "nest-commander";
import { PrismaService } from "../prisma/prisma.service";

@Command({ name: 'get-admin', description: 'List of admins' })
export class GetAdminCommand extends CommandRunner {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async run() {
    try {
      const admin = await this.prisma.admin.findMany({
        select: {
          username: true
        }
      });

      console.log(`List of admins:\n\n${admin.map(a => a.username).join('\n')}\n`);
    } catch (e) {
      console.log(e.message);
    }
  }
}