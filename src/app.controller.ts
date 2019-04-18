import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleDto } from './articles.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('articles')
  getArticles(): ArticleDto {
    return {
      name : 'Biloute',
      content : 'Hehe',
    };
  }

  @Post('articles')
  postArticle(@Body() createArticleDto: ArticleDto): Promise<ArticleDto> {
    return this.appService.storeArticle(createArticleDto);
  }
}
