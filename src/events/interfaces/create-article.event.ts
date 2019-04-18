export class CreateArticleEvent {
  constructor({ aggregateId, name, content}: { aggregateId: string, name: string, content: string}) {
    this.aggregateId = aggregateId;
    this.name = name;
    this.content = content;
  }
  aggregateId: string;
  name: string;
  content: string;
}
