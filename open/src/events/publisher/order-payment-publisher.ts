import { Publisher, Subjects, OrderPaymentUpdateEvent  } from '@snackopedia/common'

export class OrderPaymentUpdatePublisher extends Publisher<OrderPaymentUpdateEvent> {
  subject: Subjects.PaymentUpdate = Subjects.PaymentUpdate;
}