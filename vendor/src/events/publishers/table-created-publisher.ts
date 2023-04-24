import { Publisher, Subjects, TableCreatedEvent  } from '@snackopedia/common'

export class TableCreatedPublisher extends Publisher<TableCreatedEvent> {
  subject: Subjects.TableCreated = Subjects.TableCreated;
}