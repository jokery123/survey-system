import { IsInt, IsNotEmpty, Length } from "class-validator";

export class CreateResponseDto {
    @IsNotEmpty()
    @Length(1, 255)
    answer: string;

    @IsInt()
    questionId: number;

    @IsInt()
    userId: number;
}