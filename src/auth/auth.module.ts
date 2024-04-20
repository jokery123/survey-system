import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { UserDoesNotExistConstraint } from './validation/user-does-not-exist.constraint';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.AUTH_SECRET,
        signOptions: {
          expiresIn: '30m',
        },
      }),
    }),
  ],
  providers: [
    LocalStrategy,
    JwtStrategy, 
    AuthService, 
    UserService,
    UserDoesNotExistConstraint
  ],
  controllers: [AuthController, UsersController],
})
export class AuthModule {}
