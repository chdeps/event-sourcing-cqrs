import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateArticleHandler } from './commands/handlers/create-article.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRoot({
      name : 'bilouteConnection',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'biloutedb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CreateArticleHandler],
})
export class AppModule {}
