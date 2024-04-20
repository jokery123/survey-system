import { IsNotEmpty, IsNumber, IsString, Length, IsIn } from 'class-validator';


export class UpdateQuestionDto {
    @IsNumber()
    id: number;

    @IsString()
    @Length(5, 255)
    text: string;

    @IsNotEmpty()
    @IsIn([1, 2], {
        message: 'questionType must be either 1 or 2'
    })
    questionType: number;
}