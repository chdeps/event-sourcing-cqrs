import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class EventEntity {

  @PrimaryGeneratedColumn('rowid')
  public id!: string;

  @Column('text', { nullable : false })
  public className: string;

  @Column('json')
  public payload: any;

  @Column('text')
  public aggregateId: string;

  @CreateDateColumn()
  public createdAt: Date;
}
