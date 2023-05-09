import React from "react";
import ManageOrders from "../../components/Vendor-Components/ManageOrders";
import VendorLayout from "../../components/Vendor-Components/VendorLayout";

function OrderManagementPage() {
  return (
    <>
      <VendorLayout>
      <div className="px-4 pt-24 md:px-10 mx-auto w-full -m-24 ">
        <ManageOrders />
      </div>
      </VendorLayout>
    </>
  );
}

export default OrderManagementPage;
