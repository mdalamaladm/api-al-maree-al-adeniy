import { Module } from '@nestjs/common';
import { CommandService } from './command.service';

@Module({
  exports: [CommandService],
  providers: [CommandService],
})
export class CommandModule {}
