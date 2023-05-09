import React from "react";
import VendorLayout from "../../components/Vendor-Components/VendorLayout";
import VendorTable from "../../components/Vendor-Components/VendorTableListing";

function VendorTableManagement() {
  return (
    <div>
      <VendorLayout>
      <div className="px-4 pt-24 md:px-10 mx-auto w-full -m-24 ">
        <VendorTable />
      </div>
      </VendorLayout>
    </div>
  );
}

export default VendorTableManagement;
