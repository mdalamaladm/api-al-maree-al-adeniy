import { Command, CommandRunner } from "nest-commander";

@Command({ name: 'create-admin', description: 'Create new admin' })
export class CreateAdminCommand extends CommandRunner {
  async run() {
    console.log('CREATE ADMIN TEST');
    console.log('CREATE ADMIN TEST');
    console.log('CREATE ADMIN TEST');
    console.log('CREATE ADMIN TEST');
    console.log('CREATE ADMIN TEST');
    console.log('CREATE ADMIN TEST');
  }
}