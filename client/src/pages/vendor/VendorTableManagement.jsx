import React from "react";
import VendorLayout from "../../components/Vendor-Components/VendorLayout";
import VendorTable from "../../components/Vendor-Components/VendorTableListing";

function VendorTableManagement() {
  return (
    <div>
      <VendorLayout>
        <VendorTable />
      </VendorLayout>
    </div>
  );
}

export default VendorTableManagement;
