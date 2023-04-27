import { Publisher, Subjects, OrderStatusUpdateEvent  } from '@snackopedia/common'

export class OrderStatusUpdatePublisher extends Publisher<OrderStatusUpdateEvent> {
  subject: Subjects.OrderUpdated = Subjects.OrderUpdated;
}