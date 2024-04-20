import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Survey } from './survey.entity';
import { Expose } from 'class-transformer';
import { Response } from '../survey-taking/response.entity';

export enum QuestionTypeEnum {
    multipleChoice = 1,
    openEnded,
  }

@Entity()
export class Question {
  constructor(partial?: Partial<Question>) {
    Object.assign(this, partial);
  }
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ length: 255 })
    @Expose()
    text: string;

    @Column('enum', {
        enum: QuestionTypeEnum,
        default: QuestionTypeEnum.multipleChoice,
      })
    @Expose()
    questionType: number;

    @Column()
    surveyId: number;

    @OneToMany(() => Response, response => response.question)
    @Expose()
    responses: Response[];

    @ManyToOne(() => Survey, survey => survey.questions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'surveyId' })
    @Expose()
    survey: Survey;
}
