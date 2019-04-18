import { CreateArticleCommand } from '../interfaces/create-article.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';
import { ArticleEntity } from '../../article.entity';
import { InjectEntityManager } from '@nestjs/typeorm';

@CommandHandler(CreateArticleCommand)
class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  constructor(
  @InjectEntityManager('bilouteConnection')
  private readonly entityManager: EntityManager,
  ) {}

  private readonly articleRepository = this.entityManager.getRepository(ArticleEntity);

  public async execute(command: CreateArticleCommand): Promise<ArticleEntity> {
    const newArticle = await this.articleRepository.create(command.articleDto);
    this.articleRepository.save(newArticle);
    return newArticle;
  }
}
