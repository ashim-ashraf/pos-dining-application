import { Publisher, Subjects, OrderItemCancelledEvent  } from '@snackopedia/common'

export class OrderItemCancelledPublisher extends Publisher<OrderItemCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}