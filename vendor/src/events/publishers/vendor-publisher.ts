import { Publisher, Subjects, VendorPublishedEvent,  } from '@snackopedia/common'

export class VendorPublisher extends Publisher<VendorPublishedEvent> {
  subject: Subjects.VendorPublished = Subjects.VendorPublished;
}