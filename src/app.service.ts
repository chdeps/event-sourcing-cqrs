import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CommandBus } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';
import { ArticleDto } from './articles.dto';
import { ArticleEntity } from './article.entity';
import { CreateArticleCommand } from './commands/interfaces/create-article.command';

@Injectable()
export class AppService {
  public constructor(
  @InjectEntityManager('bilouteConnection')
  private readonly entityManager: EntityManager,
  private readonly commandBus: CommandBus,
  ) {
  }

  private readonly articleRepository = this.entityManager.getRepository(ArticleEntity);

  public async storeArticle(article: ArticleDto): Promise<ArticleEntity> {
    return this.commandBus.execute(new CreateArticleCommand(article));
  }

  public getAllArticles(): Promise<ArticleEntity[]> {
    return this.articleRepository.find();
  }

  public getArticle(id: number): Promise<ArticleEntity> {
    return this.articleRepository.findOne(id);
  }
}
