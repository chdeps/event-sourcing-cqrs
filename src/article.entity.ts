import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { CreateArticleEvent } from './events/interfaces/create-article.event';
import * as uuid from 'uuid/v4';

export const createArticle  = ({ name, content}) =>  {
  const newArticle = new ArticleEntity();
  newArticle.apply(new CreateArticleEvent({ aggregateId: uuid(), name, content }));
  return newArticle;
};

@Entity()
export class ArticleEntity extends AggregateRoot {

  @PrimaryGeneratedColumn('rowid')
  public id!: string;

  @Column('text', { nullable : false })
  public name: string;

  @Column('text', { nullable : false })
  public content: string;

}
