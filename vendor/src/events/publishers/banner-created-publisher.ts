import { Publisher, Subjects, BannerCreatedEvent  } from '@snackopedia/common'

export class BannerCreatedPublisher extends Publisher<BannerCreatedEvent> {
  subject: Subjects.BannerCreated = Subjects.BannerCreated;
}