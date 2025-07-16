import { Command, CommandRunner} from "nest-commander";
import { PrismaService } from "../prisma/prisma.service";

@Command({ name: 'seed', description: 'Seed initial data of database' })
export class SeedCommand extends CommandRunner {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async run() {
    try {
      const medias = await this.prisma.media.createManyAndReturn({
        data: [
          { name: 'الوسيطة المجهولة', alias: 'none', createdBy: 'superadmin', updatedBy: 'superadmin' },
          { name: 'الصوتية', alias: 'audio', createdBy: 'superadmin', updatedBy: 'superadmin' },
          { name: 'الفيديو', alias: 'video', createdBy: 'superadmin', updatedBy: 'superadmin' },
        ]
      });

      console.log(`Initiate media data:\n${medias.map(e => ` - ${e.name} (Alias: ${e.alias})`).join('\n')}\n`);

      const types = await this.prisma.type.createManyAndReturn({
        data: [
          { name: 'النوع المجهول', alias: 'none', createdBy: 'superadmin', updatedBy: 'superadmin' },
          { name: 'المحاضرات', alias: 'muhadharat', createdBy: 'superadmin', updatedBy: 'superadmin' },
          { name: 'الخطب', alias: 'khuthab', createdBy: 'superadmin', updatedBy: 'superadmin' },
          { name: 'الدروس', alias: 'durus', createdBy: 'superadmin', updatedBy: 'superadmin' },
          { name: 'الفتاوى', alias: 'fatawa', createdBy: 'superadmin', updatedBy: 'superadmin' },
        ]
      });

      console.log(`Initiate type data:\n${types.map(e => ` - ${e.name} (Alias: ${e.alias})`).join('\n')}\n`);

      const contents = await this.prisma.content.createManyAndReturn({
        data: [
          { name: 'الموضوع المجهول', isLecture: false, createdBy: 'superadmin', updatedBy: 'superadmin' },
        ]
      });

      console.log(`Initiate content data:\n${contents.map(e => ` - ${e.name} (${e.isLecture ? 'Lecture' : 'Other'})`).join('\n')}\n`);
    } catch (e) {
      console.log(e.message);
    }
  }
}