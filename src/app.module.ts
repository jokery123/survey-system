import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { AppService } from './app.service';
import { SurveyModule } from './survey-management/survey.module';
import { SurveyTakingModule } from './survey-taking/surver-taking.module';
import { MyLogger } from './logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
      envFilePath: `${process.env.NODE_ENV ?? ''}.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),
    AuthModule,
    SurveyModule,
    SurveyTakingModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MyLogger,
    {
      provide: 'APP_NAME',
      useValue: 'Nest Survey Backend!',
    },
  ],
})
export class AppModule {}
