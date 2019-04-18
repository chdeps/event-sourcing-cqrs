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

  private readonly articleRepository = this.entityManager.getRepository(ArticleEntity);

  public async storeArticle(article: ArticleDto): Promise<ArticleEntity> {
    const newArticle = await this.articleRepository.create(article);
    this.articleRepository.save(newArticle);
    return newArticle;
  }

  public getAllArticles(): Promise<ArticleEntity[]> {
    return this.articleRepository.find();
  }

  public getArticle(id: number): Promise<ArticleEntity> {
    return this.articleRepository.findOne(id);
  }
}
