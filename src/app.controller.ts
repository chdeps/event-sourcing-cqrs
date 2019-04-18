import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleDto } from './articles.dto';

@Controller('articles')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getArticles(): Promise<ArticleDto[]> {
    return this.appService.getAllArticles();
  }

  @Post()
  postArticle(@Body() createArticleDto: ArticleDto): Promise<ArticleDto> {
    return this.appService.storeArticle(createArticleDto);
  }

  @Get(':id')
  getArticle(@Param('id') id: number): Promise<ArticleDto>{
    return this.appService.getArticle(id);
  }

}
