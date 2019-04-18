import { CreateArticleCommand } from '../interfaces/create-article.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArticleEntity, createArticle } from '../../article.entity';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  public async execute(command: CreateArticleCommand): Promise<ArticleEntity> {
    const newArticle = createArticle(command.articleDto);
    return newArticle;
  }
}
