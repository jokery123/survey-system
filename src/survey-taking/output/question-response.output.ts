import { Expose } from "class-transformer";

export class QuestionResponseOutput {
    constructor(partial?: Partial<QuestionResponseOutput>) {
        Object.assign(this, partial);
      }

    @Expose()
    text: string;
    
    @Expose()
    answer: string;
}