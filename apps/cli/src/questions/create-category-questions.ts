import { Question, QuestionSet } from "nest-commander";

@QuestionSet({ name: 'create-category-questions' })
export class CreateCategoryQuestions {
  @Question({
    type: 'list',
    message: 'Which category',
    name: 'category',
    choices: ['media', 'type', 'content']
  })
  parseCategory(val: string) {
    return val;
  }

  @Question({
    type: 'list',
    message: 'Which type',
    name: 'isLecture',
    choices: ['Lecture', 'Other'],
    when: (answer) => answer.category === 'content'
  })
  parseType(val: string) {
    if (val === 'Lecture') return true;
    else return false;
  }

  @Question({
    message: 'Please enter new data for the category',
    name: 'name'
  })
  parseName(val: string) {
    return val;
  }
}