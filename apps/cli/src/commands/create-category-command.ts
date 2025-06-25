import { Command, CommandRunner, InquirerService } from "nest-commander";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCategoryDto } from "../dto/create-category.dto";

@Command({ name: 'create-category', description: 'Create new data for category' })
export class CreateCategoryCommand extends CommandRunner {
  constructor(private readonly prisma: PrismaService, private readonly inquirer: InquirerService) {
    super();
  }

  async run() {
    try {
      let answer = await this.inquirer.ask('create-category-questions', undefined);

      const category: string = answer.category;
      const isLecture = answer.isLecture;

      let data: CreateCategoryDto = {
        name: answer.name,
      }

      if (category === 'content') {
        data.isLecture = isLecture;
      } else {
        data.alias = answer.alias;
      }

      const res = await this.prisma[category].create({ data });
      
      console.log(`${category} created!\n\nname: ${res.name}`);
    } catch (e) {
      console.log(e.message);
    }
  }
}