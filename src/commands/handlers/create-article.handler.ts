import { CreateArticleCommand } from '../interfaces/create-article.command';
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ArticleEntity, createArticle } from '../../article.entity';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  constructor(private readonly eventPublisher: EventPublisher) {}
  public async execute(command: CreateArticleCommand): Promise<ArticleEntity> {
    let newArticle = createArticle(command.articleDto);
    newArticle = this.eventPublisher.mergeObjectContext(newArticle);
    newArticle.commit();
    return newArticle;
  }
}
