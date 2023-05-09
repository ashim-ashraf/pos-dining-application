import React from "react";
import VendorLayout from "../../components/Vendor-Components/VendorLayout";
import MenuManagementForm from "../../components/Vendor-Components/MenuManagementForm";

function CategoryManagementPage() {
  return (
    <>
      <VendorLayout>
        <div className="px-4 pt-24 md:px-10 mx-auto w-full -m-24 ">
          <MenuManagementForm />
        </div>
      </VendorLayout>
    </>
  );
}

export default CategoryManagementPage;
