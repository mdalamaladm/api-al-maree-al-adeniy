import { CliModule } from './cli.module';
import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  await CommandFactory.run(CliModule);
  
}
bootstrap();
