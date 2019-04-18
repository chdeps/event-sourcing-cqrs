import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ArticleEntity {

  @PrimaryGeneratedColumn('rowid')
  public id!: string;

  @Column('text', { nullable : false })
  public name: string;

  @Column('text', { nullable : false })
  public content: string;

}
