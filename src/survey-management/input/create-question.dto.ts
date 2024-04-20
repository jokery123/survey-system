import { IsIn, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateQuestionDto {
    @IsString()
    @Length(5, 255)
    text: string;

    @IsNotEmpty()
    @IsIn([1, 2], {
        message: 'questionType must be either 1 or 2'
    })
    questionType: number;

    @IsNumber()
    @IsNotEmpty()
    surveyId: number;
}