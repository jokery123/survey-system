import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedSurvers, Survey } from "./survey.entity";
import { Repository, SelectQueryBuilder, DeleteResult } from 'typeorm';
import { paginate, PaginateOptions } from "src/pagination/paginator";
import { CreateSurveyDto } from "./input/create-survey.dto";
import { User } from "../auth/user.entity";
import { UpdateSurveyDto } from "./input/update-survey.dto";

@Injectable()
export class SurveyService {
    //private readonly logger = new Logger(SurveyService.name);

    constructor(
      @InjectRepository(Survey)
      private readonly surveyRepository: Repository<Survey>
    ) { }
  
    private getSurveysBaseQuery(): SelectQueryBuilder<Survey> {
      return this.surveyRepository
        .createQueryBuilder('s')
        .orderBy('s.id', 'ASC');
    }
  
    public getSurveyWithQuestionCountQuery(): SelectQueryBuilder<Survey> {
      return this.getSurveysBaseQuery()
        .loadRelationCountAndMap(
          's.questionCount', 's.questions'
        );
    }
  
    public async getSurveysWithQuestionCountPaginated(
      paginateOptions: PaginateOptions
    ): Promise<PaginatedSurvers> {
      return await paginate<Survey, PaginatedSurvers>(
        this.getSurveyWithQuestionCountQuery().select(['s.id','s.title', 's.description', 's.createdAt', 's.updatedAt']),
        PaginatedSurvers,
        paginateOptions
      );
    }
  
    public async getSurveyWithQuestionCount(
      id: number
    ): Promise<Survey | undefined> {
      const query = this.getSurveyWithQuestionCountQuery()
        .andWhere('s.id = :id', { id });
  
         return await query.getOne();
    }
  
    public async findOne(id: number): Promise<Survey | undefined> {
      return await this.surveyRepository.findOneBy({id:id});
    }
  
    public async createSurvey(input: CreateSurveyDto): Promise<Survey> {
      return await this.surveyRepository.save(
        new Survey({
          ...input
        })
      );
    }
  
    public async updateSurvey(
      survey: Survey, input: UpdateSurveyDto
    ): Promise<Survey> {
      return await this.surveyRepository.save(
        new Survey({
          ...survey,
          ...input,
        })
      );
    }
  
    public async deleteEvent(
      id: number
    ): Promise<DeleteResult> {
      return await this.surveyRepository
        .createQueryBuilder('s')
        .delete()
        .where('id = :id', { id })
        .execute();
    }    
}