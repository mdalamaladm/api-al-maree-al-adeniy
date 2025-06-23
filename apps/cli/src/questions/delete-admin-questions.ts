import { Question, QuestionSet } from "nest-commander";

@QuestionSet({ name: 'delete-admin-questions' })
export class DeleteAdminQuestions {
  @Question({
    message: 'Which admin you want to delete? (Insert username)',
    name: 'username'
  })
  parseUsername(val: string) {
    return val;
  }
}