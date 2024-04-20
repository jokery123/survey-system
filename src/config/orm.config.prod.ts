import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Survey } from '../survey-management/survey.entity';
import { Question } from '../survey-management/question.entity';
import { User } from '../auth/user.entity';
import { Response } from '../survey-taking/response.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Survey, Question, Response],
    synchronize: false,
    dropSchema: false,
  }),
);
