import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AccessLevelModule } from './modules/access-level/access-level.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtStrategy } from './modules/auth/strategy';
import { CurrenciesModule } from './modules/currencies/currencies.module';
import { UsersModule } from './modules/users/users.module';
import { MorganMiddleware } from './middlewares';
import { ProfessionsModule } from './modules/professions/professions.module';
import { UserTypesModule } from './modules/user-types/user-types.module';
import { CompanyTypesModule } from './modules/company-types/company-types.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AccessLevelModule,
    AuthModule,
    UsersModule,
    CurrenciesModule,
    ProfessionsModule,
    UserTypesModule,
    CompanyTypesModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}
