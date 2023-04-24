import { Publisher, Subjects, OrderCreatedEvent } from '@snackopedia/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}