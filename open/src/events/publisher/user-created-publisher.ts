import { Publisher, Subjects, UserCreatedEvent } from '@snackopedia/common'

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}