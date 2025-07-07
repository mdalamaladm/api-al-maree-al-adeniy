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
          { name: 'الوسيطة المجهولة'  },
          { name: 'الصوتية'  },
          { name: 'الفيديو' },
        ]
      });

      console.log(`Initiate media data:\n${medias.map(e => ` - ${e.name}`).join('\n')}\n`);

      const types = await this.prisma.type.createManyAndReturn({
        data: [
          { name: 'النوع المجهول'  },
          { name: 'المحاضرات'  },
          { name: 'الخطب' },
          { name: 'الدروس' },
          { name: 'الفتاوى' },
        ]
      });

      console.log(`Initiate type data:\n${types.map(e => ` - ${e.name}`).join('\n')}\n`);

      const contents = await this.prisma.content.createManyAndReturn({
        data: [
          { name: 'الموضوع المجهول', isLecture: false },
        ]
      });

      console.log(`Initiate content data:\n${contents.map(e => ` - ${e.name} (${e.isLecture ? 'Lecture' : 'Other'})`).join('\n')}\n`);
    } catch (e) {
      console.log(e.message);
    }
  }
}