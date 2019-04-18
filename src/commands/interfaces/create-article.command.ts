import { ArticleDto } from '../../articles.dto';

export class CreateArticleCommand {
  public constructor(public readonly articleDto: ArticleDto) {}
}
