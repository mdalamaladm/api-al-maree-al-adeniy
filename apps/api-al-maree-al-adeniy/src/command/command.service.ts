import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class CommandService {
  async runBashCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${error.message}`);
          return;
        }

        if (stderr) {
          reject(`stderr: ${stderr}`);
          return;
        }

        resolve(stdout);
      });
    });
  }
}
