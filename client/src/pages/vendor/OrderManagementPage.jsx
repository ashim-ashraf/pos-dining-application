import React from "react";
import ManageOrders from "../../components/Vendor-Components/ManageOrders";
import VendorLayout from "../../components/Vendor-Components/VendorLayout";

function OrderManagementPage() {
  return (
    <>
      <VendorLayout>
        <ManageOrders />
      </VendorLayout>
    </>
  );
}

export default OrderManagementPage;
