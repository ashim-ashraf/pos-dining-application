import React from "react";
import RegistrationForm from "../../components/Vendor-Components/RegistrationForm";
import VendorLayout from "../../components/Vendor-Components/VendorLayout";

function VendorRegistrationPage() {
  return (
    <>
      <VendorLayout>
      <div className="px-4 pt-24 md:px-10 mx-auto w-full -m-24 ">
        <RegistrationForm />
      </div>
      </VendorLayout>
    </>
  );
}

export default VendorRegistrationPage;
