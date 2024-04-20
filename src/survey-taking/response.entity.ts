import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/user.entity'; // Make sure to define this entity
import { Question } from '../survey-management/question.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Response {
    constructor(partial?: Partial<Response>) {
        Object.assign(this, partial);
      }

    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column('text')
    @Expose()
    answer: string;

    @Column()
    questionId: number;

    @Column()
    userId: number;


    @ManyToOne(() => User, user => user.responses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    @Expose()
    user: User;

    @ManyToOne(() => Question, question => question.responses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'questionId' })
    @Expose()
    question: Question;
}
