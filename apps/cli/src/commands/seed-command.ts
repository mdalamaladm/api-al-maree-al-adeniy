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
          { name: 'الوسيطة المجهولة', alias: 'nomedia' },
          { name: 'الصوتية', alias: 'audio' },
          { name: 'الفيديو', alias: 'video'},
        ]
      });

      console.log(`Initiate media data:\n${medias.map(e => ` - ${e.name} (Alias: ${e.alias})`).join('\n')}\n`);

      const types = await this.prisma.type.createManyAndReturn({
        data: [
          { name: 'النوع المجهول', alias: 'notype' },
          { name: 'المحاضرات', alias: 'muhadharat' },
          { name: 'الخطب', alias: 'khuthab'},
          { name: 'الدروس', alias: 'durus'},
          { name: 'الفتاوى', alias: 'fatawa'},
        ]
      });

      console.log(`Initiate type data:\n${types.map(e => ` - ${e.name} (Alias: ${e.alias})`).join('\n')}\n`);

      const contents = await this.prisma.content.createManyAndReturn({
        data: [
          { name: 'الموضوع المجهول', isLecture: false },
          { name: 'العقيدة الواسطية', isLecture: true },
          { name: 'العقيدة والتوحيد', isLecture: false },
        ]
      });

      console.log(`Initiate content data:\n${contents.map(e => ` - ${e.name} (${e.isLecture ? 'Lecture' : 'Other'})`).join('\n')}\n`);
    } catch (e) {
      console.log(e.message);
    }
  }
}