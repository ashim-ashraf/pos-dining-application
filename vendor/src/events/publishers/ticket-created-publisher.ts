import { Publisher, Subjects, TicketCreatedEvent } from '@snackopedia/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
