import { Publisher, Subjects, BannerDeletedEvent  } from '@snackopedia/common'

export class BannerDeletedPublisher extends Publisher<BannerDeletedEvent> {
  subject: Subjects.BannerDeleted = Subjects.BannerDeleted;
}