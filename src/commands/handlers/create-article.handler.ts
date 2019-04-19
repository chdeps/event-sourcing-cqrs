import { CreateArticleCommand } from '../interfaces/create-article.command';
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ArticleEntity, createArticle } from '../../article.entity';
import { EntityManager } from 'typeorm';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  constructor(private readonly eventPublisher: EventPublisher, private readonly entityManager: EntityManager) {}
  private articleRepository = this.entityManager.getRepository(ArticleEntity);
  public async execute(command: CreateArticleCommand): Promise<ArticleEntity> {
    // TODO : Move logic else where
    const savedArticle = await this.articleRepository.create(command.articleDto);
    this.articleRepository.save(savedArticle);
    // Dispatch event
    let newArticle = createArticle(command.articleDto);
    newArticle = this.eventPublisher.mergeObjectContext(newArticle);
    newArticle.commit();
    return savedArticle;
  }
}
