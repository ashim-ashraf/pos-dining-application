import { useState } from "react";
import Account from "./RegistrationForm/steps/Account";
import Payment from "./RegistrationForm/steps/Payment";
import Final from "./RegistrationForm/steps/Final";
import Stepper from "./RegistrationForm/Stepper";
import { toast } from "react-hot-toast";
import useFormUserValidation from "../../hooks/useFormUserValidation";
import useFormImageValidation from "../../hooks/useFormImageValidation";

  

function  RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    restaurantName: "",
    liscenceNo: "",
    description: "",
    restaurantPhone: "",
    restaurantType:"",
    address: "",
    state: "",
    pincode:"",
    email:"",
});   
const [image, setImage] = useState(null)
  
const { handleChangeValidation, errors, handleNext } = useFormUserValidation(userData);
const {imageErrors , imageHandleNext} = useFormImageValidation(image)

  const steps = [
    "Restaurant Info",
    "Upload Images",
    "Complete",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account userData={userData} setUserData={setUserData} handleChangeValidation={handleChangeValidation} errors={errors}/>;
      case 2:
        return <Payment image={image} setImage={setImage} imageErrors={imageErrors} />;
      case 3:
        return <Final userData={userData} image={image}/>;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
    if (newStep === 1) {
        if (handleNext()) {
            direction === "next" ? newStep++ : newStep--;
        } else {
            toast.error("Please fill out all the from before proceeding to next!");
        }
    } else if (newStep === 2) {
       if (imageHandleNext()){
         direction === "next" ? newStep++ : newStep--;
       } else {
        toast.error("Enter a valid Image")
       }
    } else if (newStep === 3) {
       ( direction === "next" || direction === "skip" )? newStep++ : newStep--;
    }

    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
};

  return (
    <div className=" mx-auto rounded-2xl bg-white pb-2 shadow-2xl  md:w-full">
      {/* Stepper */}
      <div className='bg-white    items-center  rounded-3xl  p-2 py-'>
                        <div className='text-center'>
                            <h1 className='text-transparent tracking-wide font-ubuntu
                         md:text-2xl text-l bg-clip-text bg-gradient-to-r  to-pink-600' >Registeration Page</h1>
                        </div>
                        <div className="horizontal container  md:px-32">
                            <Stepper steps={steps} currentStep={currentStep} />

                            <div className="my-10 p-10 ">
                                {displayStep(currentStep)}
                            </div>
                        </div>

                        {currentStep !== steps.length && (


                            <div className="container mb-8 flex justify-around">
                                <button
                                    onClick={() => handleClick()}
                                    className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-emerald-600 transition duration-200 ease-in-out hover:bg-emerald-600 hover:text-white  ${currentStep === 1 ? " cursor-not-allowed opacity-50 " : ""
                                        }`}
                                >
                                    Back
                                </button>
                                <div className='flex '>
                                    <button
                                        onClick={() => handleClick("skip")}
                                        className={`cursor-pointer rounded-lg bg-emerald-500 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-fuchsia-700 hover:text-white ${currentStep === 3 ? "block" : "hidden"}`}
                                    >Skip </button>
                                    <button
                                        onClick={() => handleClick("next")}
                                        className="cursor-pointer rounded-lg bg-emerald-500 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-fuchsia-700 hover:text-white"
                                    >
                                        {currentStep === steps.length - 1 ? "Confirm" : "Next"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
    </div>
  );
}

export default RegistrationForm;