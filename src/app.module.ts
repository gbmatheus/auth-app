import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.POST },
        // 'users/(.*)'
      )
      // .forRoutes({ path: 'users', method: RequestMethod.GET });
      // .forRoutes({ path: 'users/:id?', method: RequestMethod.GET });
      .forRoutes(UsersController);
  }
}
