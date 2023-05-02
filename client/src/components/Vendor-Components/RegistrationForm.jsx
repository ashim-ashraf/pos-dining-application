import { useState } from "react";
import StepperControl from "./RegistrationForm/StepperControl";
import Account from "./RegistrationForm/steps/Account";
import Payment from "./RegistrationForm/steps/Payment";
import Final from "./RegistrationForm/steps/Final";
import { UseContextProvider } from "../../contexts/StepperContext";
import Stepper from "./RegistrationForm/Stepper";
import { toast } from "react-hot-toast";
import useFormUserValidation from "../../hooks/useFormUserValidation";
import useFormImageValidation from "../../hooks/useFormImageValidation";

  

function  RegistrationForm({email}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    restaurantName: "asdf",
    liscenceNo: "132312",
    description: "asfd fsad sfad sfad sadf",
    restaurantPhone: "1323123121",
    address: "asdf",
    state: "safd",
    pincode:"132312",
    email:"afsd@fsda.com"
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
    console.log("New step =", newStep)
    if (newStep === 1) {
        if (handleNext()) {
            direction === "next" ? newStep++ : newStep--;
        } else {
            toast.error("Please fill out all the from before proceeding to next!");
        }
    } else if (newStep === 2) {
      console.log("image handle ", imageHandleNext())
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
    <div className=" mx-auto rounded-2xl bg-white pb-2 shadow-2xl md:w-full">
      {/* Stepper */}
      <div className='bg-white  mt-10  items-center  rounded-3xl shadow-2xl shadow-purple-500 p-2 py-'>
                        <div className='text-center'>
                            <h1 className='text-transparent tracking-wide font-ubuntu
                         md:text-2xl text-l bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600' >Registeration Page</h1>
                        </div>
                        <div className="horizontal container mt-5 md:px-32">
                            <Stepper steps={steps} currentStep={currentStep} />

                            <div className="my-10 p-10 ">
                                {displayStep(currentStep)}
                            </div>
                        </div>

                        {currentStep !== steps.length && (


                            <div className="container mt-4 mb-8 flex justify-around">
                                <button
                                    onClick={() => handleClick()}
                                    className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-purple-600 transition duration-200 ease-in-out hover:bg-purple-600 hover:text-white  ${currentStep === 1 ? " cursor-not-allowed opacity-50 " : ""
                                        }`}
                                >
                                    Back
                                </button>
                                <div className='flex '>
                                    <button
                                        onClick={() => handleClick("skip")}
                                        className={`cursor-pointer rounded-lg bg-purple-500 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-fuchsia-700 hover:text-white ${currentStep == 3 ? "block" : "hidden"}`}
                                    >Skip </button>
                                    <button
                                        onClick={() => handleClick("next")}
                                        className="cursor-pointer rounded-lg bg-purple-500 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-fuchsia-700 hover:text-white"
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