import { Body, ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Post, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuardJwt } from "./../auth/auth-guard.jwt";
import { SurveyTakingService } from "./survey-taking.service";
import { QuestionService } from "src/survey-management/question.service";
import { CreateResponseDto } from "./input/create-response.dto";
import { CurrentUser } from "src/auth/current-user.decorator";
import { User } from "src/auth/user.entity";



@Controller('/surveytaking')
@SerializeOptions({ strategy: 'excludeAll' })
export class SurveyTakingController {
    constructor(
        private readonly surveyTakingService: SurveyTakingService,
        private readonly questionService: QuestionService
    ) { }

    @Get(':surveyId')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async findQuestionIdListBySurveyId(@Param('surveyId', ParseIntPipe) surveyId: number) {
        return await this.surveyTakingService.findQuestionsBySurvey(surveyId);
    }


    @Get('/question/:questionId')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async getNextQuestion(@Param('questionId', ParseIntPipe) questionId: number) {
        return await this.questionService.findOneById(questionId);
    }

    @Post()
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async saveResponse(@Body() input: CreateResponseDto) {
        return await this.surveyTakingService.saveResponse(input);
    }

    @Get('/summary/:surveyId')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async getSummary(
        @Param('surveyId', ParseIntPipe) surveyId,
        @CurrentUser() user: User
    ) {

        return await this.surveyTakingService.getSummary(user.id, surveyId);
    }
}
