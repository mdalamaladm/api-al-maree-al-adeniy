import { Question, QuestionSet } from "nest-commander";

@QuestionSet({ name: 'create-admin-questions' })
export class CreateAdminQuestions {
  @Question({
    message: 'Please enter username',
    name: 'username'
  })
  parseUsername(val: string) {
    return val;
  }
}