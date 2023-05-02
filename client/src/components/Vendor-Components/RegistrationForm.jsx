import { useState } from "react";
import StepperControl from "./RegistrationForm/StepperControl";
import Account from "./RegistrationForm/steps/Account";
import Payment from "./RegistrationForm/steps/Payment";
import Final from "./RegistrationForm/steps/Final";
import { UseContextProvider } from "../../contexts/StepperContext";
import Stepper from "./RegistrationForm/Stepper";
import { toast } from "react-hot-toast";

  

function  RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [validate,SetValidate]=useState('')
  const [check, setCheck] = useState(false)
  const steps = [
    "Restaurant Info",
    "Upload Images",
    "Complete",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account SetValidate={SetValidate} check />;
      case 2:
        return <Payment />;
      case 3:
        return <Final />;
      default:
    }
  };

  const handleClick = (direction) => {
    console.log(direction);
    let newStep = currentStep;

    // direction === "next" ? newStep++ : newStep--;
    if(direction === "next"){
      setCheck(!check)
      console.log(validate)
      if (validate && Object.keys(validate).length === 0) {
        newStep++
      }
      toast.error("Invalid Inputs")
    }else{
      newStep--
    }
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className=" mx-auto rounded-2xl bg-white pb-2 shadow-2xl md:w-full">
      {/* Stepper */}
      <div className="horizontal container mt-5 ">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="p-10 ">
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </div>
      </div>

      {/* navigation button */}
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )}
    </div>
  );
}

export default RegistrationForm;