import { Publisher, Subjects, VendorApprovalEvent  } from '@snackopedia/common'

export class VendorApprovalPublisher extends Publisher<VendorApprovalEvent> {
  subject: Subjects.VendorApproval = Subjects.VendorApproval;
}