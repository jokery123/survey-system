import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from 'src/survey-taking/response.entity';
import { ResponseService } from './response.service';
import { SurveyTakingController } from './survey-taking.controller';
import { SurveyTakingService } from './survey-taking.service';
import { Question } from 'src/survey-management/question.entity';
import { QuestionService } from 'src/survey-management/question.service';
import { Survey } from 'src/survey-management/survey.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey, Question, Response]),
  ],
  controllers: [
    SurveyTakingController
  ],
  providers: [
    QuestionService,
    ResponseService,
    SurveyTakingService
  ]
})
export class SurveyTakingModule { }