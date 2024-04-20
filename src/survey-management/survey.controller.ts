import { Body, ClassSerializerInterceptor, Controller, Delete, ForbiddenException, Get, HttpCode, Logger, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, SerializeOptions, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuardJwt } from "./../auth/auth-guard.jwt";
import { CurrentUser } from "./../auth/current-user.decorator";
import { User } from "./../auth/user.entity";
import { SurveyService } from "./survey.service";
import { ListSurveys } from "./input/list.surveys";
import { CreateSurveyDto } from "./input/create-survey.dto";
import { UpdateSurveyDto } from "./input/update-survey.dto";



@Controller('/surveys')
@SerializeOptions({ strategy: 'excludeAll' })
export class SurveyController {
    //private readonly logger = new Logger(SurveyController.name);

    constructor(
        private readonly surveyService: SurveyService
    ) { }

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll(@Query() filter: ListSurveys) {
        const events = await this.surveyService
            .getSurveysWithQuestionCountPaginated(
                {
                    currentPage: parseInt(filter.page),
                    limit: parseInt(filter.limit),
                    total: Boolean(parseInt(filter.total))
                }
            );
        return events;
    }

    @Get(':id')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const survey = await this.surveyService.getSurveyWithQuestionCount(id);

        if (!survey) {
            throw new NotFoundException();
        }

        return survey;
    }

    @Post()
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async create(
        @Body() input: CreateSurveyDto,
        @CurrentUser() user: User
    ) {
        return await this.surveyService.createSurvey(input);
    }

    @Patch(':id')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async update(
        @Param('id', ParseIntPipe) id,
        @Body() input: UpdateSurveyDto,
        @CurrentUser() user: User
    ) {
        const survey = await this.surveyService.findOne(id);

        if (!survey) {
            throw new NotFoundException();
        }

        return await this.surveyService.updateSurvey(survey, input);
    }

    @Delete(':id')
    @UseGuards(AuthGuardJwt)
    @HttpCode(204)
    async remove(
        @Param('id', ParseIntPipe) id,
        @CurrentUser() user: User
    ) {
        const survey = await this.surveyService.findOne(id);

        if (!survey) {
            throw new NotFoundException();
        }

        await this.surveyService.deleteEvent(id);
    }
}
