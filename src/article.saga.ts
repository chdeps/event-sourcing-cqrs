import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Saga, ofType } from '@nestjs/cqrs';
import { CreateArticleEvent } from './events/interfaces/create-article.event';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EventEntity } from './events/event.entity';

@Injectable()
export class EventSaga {
  public constructor(
    @InjectEntityManager('bilouteConnection')
    private readonly entityManager: EntityManager,
  ) {}
  private readonly eventRepository = this.entityManager.getRepository(EventEntity);
  @Saga()
  public eventPublished = (events$: Observable<any>): Observable<void> => {
    return events$.pipe(ofType(CreateArticleEvent), map(event => {
      const storeEvent = new EventEntity();
      storeEvent.payload = event;
      storeEvent.aggregateId = event.aggregateId;
      const { constructor } = Object.getPrototypeOf(event);
      storeEvent.className = constructor.name;
      this.eventRepository.save(storeEvent);
    }));
  }
}
