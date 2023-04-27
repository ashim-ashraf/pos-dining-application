import { useState } from "react";
import { Stepper } from "konsta/react";
import StepperControl from "./RegistrationForm/StepperControl";
import Account from "./RegistrationForm/steps/Account";
import Details from "./RegistrationForm/steps/Details";
import Payment from "./RegistrationForm/steps/Payment";
import Final from "./RegistrationForm/steps/Final";
import { UseContextProvider } from "../../contexts/StepperContext";

  

function  RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [validate,SetValidate]=useState('')
  const steps = [
    "Restaurant Info",
    "Type and Timing",
    "Upload Images",
    "Complete",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account SetValidate={SetValidate}/>;
      case 2:
        return <Details />;
      case 3:
        return <Payment />;
      case 4:
        return <Final />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    // direction === "next" ? newStep++ : newStep--;
    if(direction === "next"){
      console.log(validate)
      alert(validate)
      newStep++
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