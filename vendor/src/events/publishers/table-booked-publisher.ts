import { Publisher, Subjects, TableBookedEvent } from '@snackopedia/common'

export class TableBookedPublisher extends Publisher<TableBookedEvent> {
  subject: Subjects.TableBooked = Subjects.TableBooked;
}