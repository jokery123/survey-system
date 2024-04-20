import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { Survey } from './survey.entity';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey,Question]),
  ],
  controllers: [
    SurveyController,
    QuestionController
  ],
  providers: [
    SurveyService,
    QuestionService
  ]
})
export class SurveyModule { }