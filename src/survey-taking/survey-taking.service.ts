import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../survey-management/question.entity';
import { Response } from './response.entity';
import { CreateResponseDto } from './input/create-response.dto';
import { ResponseService } from './response.service';
import { QuestionResponseOutput } from './output/question-response.output';


@Injectable()
export class SurveyTakingService {
    constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private readonly responseService: ResponseService
    ) {}

    public async findQuestionsBySurvey(surveyId: number): Promise<number[]> {
        const questions = await this.questionRepository
        .createQueryBuilder('question')
        .select('question.id')
        .where('question.surveyId = :surveyId', { surveyId })
        .getMany();
  
      return questions.map(question => question.id);
    }
    
    public async saveResponse(input: CreateResponseDto): Promise<Response> {
        return await this.responseService.saveResponse(input);
    }

    
    public async getSummary(userId: number, surveyId: number): Promise<QuestionResponseOutput[]> {

        const questions = await this.questionRepository
        .createQueryBuilder('q')
        .where('q.surveyId = :surveyId', { surveyId })
        .getMany();
        /*
        let questionResponses = [];
        questions.forEach(async question => {
            const response = await this.responseService.findByQuestionAndUser(userId, question.id);
            let questionResponse = new QuestionResponseOutput(
                {
                    text: question.text,
                    answer: response.answer
                }
            )
            questionResponses.push(questionResponse)
           console.log(questionResponses)
        });
        return questionResponses; */

        const questionIds = questions.map(q => q.id);
        const responses = this.responseService.findByQuestionAndUser(userId, questionIds);

        // 创建映射从questionId到response
        const responseMap = new Map<number, Response>();
        (await responses).forEach(response => {
        responseMap.set(response.questionId, response);
        });

        // 构建输出数组
        const outputs = questions.map(question => {
            const response = responseMap.get(question.id);
            const output = new QuestionResponseOutput({
                text: question.text,
                answer: response ? response.answer : 'No response'
            });
            return output;
        });

        return outputs;
    }
    

}
