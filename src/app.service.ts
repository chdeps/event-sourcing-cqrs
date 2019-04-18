import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ArticleDto } from './articles.dto';
import { ArticleEntity } from './article.entity';

@Injectable()
export class AppService {
  public constructor(
  @InjectEntityManager('bilouteConnection')
  private readonly entityManager: EntityManager) {
  }

  public async storeArticle(article: ArticleDto): Promise<ArticleEntity> {
    const repository = this.entityManager.getRepository(ArticleEntity);
    const newArticle = await repository.create(article);
    repository.save(newArticle);
    return newArticle;
  }

  public async getAllArticles(): Promise<ArticleEntity[]> {
    const repository = this.entityManager.getRepository(ArticleEntity);
    return repository.find();
  }
}
