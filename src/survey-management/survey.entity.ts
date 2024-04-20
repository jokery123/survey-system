import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Question } from './question.entity';
import { Expose } from 'class-transformer';
import { Paginated } from 'src/pagination/paginator';

@Entity()
export class Survey {
    constructor(partial?: Partial<Survey>) {
        Object.assign(this, partial);
      }

    
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({ length: 255 })
    @Expose()
    title: string;

    @Column({ length: 255 })
    @Expose()
    description: string;

    @CreateDateColumn()
    @Expose()
    createdAt: Date;

    @UpdateDateColumn()
    @Expose()
    updatedAt: Date;

    @OneToMany(() => Question, question => question.survey)
    @Expose()
    questions: Promise<Question[]>;

    @Expose()
    questionCount?: number;

}

export class PaginatedSurvers extends Paginated<Survey>(Survey) {}