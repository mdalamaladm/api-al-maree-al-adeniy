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
          { name: 'وسيطة مجهولة', alias: 'none', createdBy: 'superadmin', updatedBy: 'superadmin' },
          { name: 'صوتيات', alias: 'audio', createdBy: 'superadmin', updatedBy: 'superadmin' },
          { name: 'فيديوهات', alias: 'video', createdBy: 'superadmin', updatedBy: 'superadmin' },
        ]
      });

      console.log(`Initiate media data:\n${medias.map(e => ` - ${e.name} (Alias: ${e.alias})`).join('\n')}\n`);

      const types = await this.prisma.type.createManyAndReturn({
        data: [
          { name: 'نوع مجهول', alias: 'none', createdBy: 'superadmin', updatedBy: 'superadmin' },
          { name: 'محاضرات', alias: 'muhadharat', createdBy: 'superadmin', updatedBy: 'superadmin' },
          { name: 'خطب', alias: 'khuthab', createdBy: 'superadmin', updatedBy: 'superadmin' },
          { name: 'دروس', alias: 'durus', createdBy: 'superadmin', updatedBy: 'superadmin' },
          { name: 'فتاوى', alias: 'fatawa', createdBy: 'superadmin', updatedBy: 'superadmin' },
        ]
      });

      console.log(`Initiate type data:\n${types.map(e => ` - ${e.name} (Alias: ${e.alias})`).join('\n')}\n`);

      await this.prisma.mediaType.createManyAndReturn({
        data: [
          { mediaId: 'audio', typeId: 'muhadharat' },
          { mediaId: 'audio', typeId: 'khuthab' },
          { mediaId: 'audio', typeId: 'durus' },
          { mediaId: 'audio', typeId: 'fatawa' },
          { mediaId: 'video', typeId: 'muhadharat' },
          { mediaId: 'video', typeId: 'khuthab' },
          { mediaId: 'video', typeId: 'durus' },
          { mediaId: 'video', typeId: 'fatawa' },
        ]
      });

      console.log('\n\nInitiate types assignment to media data\n\n');

      const contents = await this.prisma.content.createManyAndReturn({
        data: [
          { name: 'موضوع مجهول', isLecture: false, createdBy: 'superadmin', updatedBy: 'superadmin' },
        ]
      });

      console.log(`Initiate content data:\n${contents.map(e => ` - ${e.name} (${e.isLecture ? 'Lecture' : 'Other'})`).join('\n')}\n`);
    } catch (e) {
      console.log(e.message);
    }
  }
}