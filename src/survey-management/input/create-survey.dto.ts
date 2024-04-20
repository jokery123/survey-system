import { IsDateString, IsString, Length } from 'class-validator';

export class CreateSurveyDto {
  @IsString()
  @Length(5, 255, { message: 'The title length is wrong' })
  title: string;

  @Length(5, 255, { message: 'The description length is wrong' })
  description: string;
}
