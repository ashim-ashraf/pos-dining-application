import { Publisher, Subjects,  VendorOpenStatusEvent  } from '@snackopedia/common'

export class VendorOpenStatusPublisher extends Publisher<VendorOpenStatusEvent> {
  subject: Subjects.VendorOpenStatus = Subjects.VendorOpenStatus;
}