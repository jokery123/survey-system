import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, SerializeOptions, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuardJwt } from "./../auth/auth-guard.jwt";
import { QuestionService } from "./question.service";
import { CreateQuestionDto } from "./input/create-question.dto";
import { UpdateQuestionDto } from "./input/update-question.dto";

@Controller('/questions')
@SerializeOptions({ strategy: 'excludeAll' })
export class QuestionController {
    constructor(
        private readonly questionService: QuestionService
    ) { }

    @Get(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.questionService.findOneById(id);
    }

    @Get('/survey/:id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async findBySurveyID(@Param('id', ParseIntPipe) id: number) {
        return await this.questionService.findBySurveyId(id);
    }

    @Post()
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async create(@Body() input: CreateQuestionDto) {
        return await this.questionService.createQuestion(input);
    }

    @Patch(':id')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async update(@Body() input: UpdateQuestionDto) {

        return await this.questionService.updateQuestion(input);
    }

    @Delete(':id')
    @UseGuards(AuthGuardJwt)
    @HttpCode(204)
    async remove(@Param('id', ParseIntPipe) id) {
        await this.questionService.findOneById(id);

        await this.questionService.deleteQuestion(id);
    }
}