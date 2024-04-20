import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './input/create-question.dto';
import { UpdateQuestionDto } from './input/update-question.dto';
import { Survey } from './survey.entity';


@Injectable()
export class QuestionService {
    constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>
    ) {}

    public async findOneById(questionId: number): Promise<Question> {
        return await this.questionRepository.findOneByOrFail({id: questionId}); 
        }

    public async findBySurveyId(surveyId: number): Promise<Question[]> {
        await   this.surveyRepository.findOneByOrFail({id: surveyId})
        return await this.questionRepository.find({
            where: {
                survey: { id: surveyId },
            },
        }); 
    }


    public async createQuestion(input: CreateQuestionDto): Promise<Question> {
        await this.surveyRepository.findOneByOrFail({id: input.surveyId});

        return await this.questionRepository.save(new Question({
            ...input
        }));
    }

    public async updateQuestion(
        input: UpdateQuestionDto,
    ): Promise<Question> {
        let question = await this.findOneById(input.id);

        question.text = input.text;
        question.questionType = input.questionType;

        return await this.questionRepository.save(question);
    }

    public async deleteQuestion(
        id: number
      ): Promise<DeleteResult> {

        return await this.questionRepository
          .createQueryBuilder('q')
          .delete()
          .where('id = :id', { id })
          .execute();
      }  
}
