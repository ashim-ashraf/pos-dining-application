import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useStepperContext } from "../../../../contexts/StepperContext";

export default function Final({userData, image}) {

  const [success, setSuccess] = useState(false)
  const vendorId = useSelector((state) => state.vendor.vendor.id);

  const onSubmit = async () => {
    userData.userId = vendorId; 
    userData.image = image;
    const formData = new FormData();  
    
    for (const key in userData) {
    formData.append(key, userData[key]);
    }
    
    axios.post("/api/vendors/editregistration", formData)
      .then((response) => {
        setSuccess(true)
      })
      .catch(async (err) => {
        console.log(err.response.data.errors);
      });
  };

  useEffect(() => {
   onSubmit()   
  }, [])
  
  return (


    <div className="container md:mt-10">
      <div className="flex flex-col items-center">

        {success?(<><div className="wrapper">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <div className="mt-3 text-xl font-semibold uppercase text-green-500">
          Success!
        </div>
        <div className="text-lg font-semibold text-gray-500">
          Your Request has been Submitted. Awaiting Approval
        </div>
        <a className="mt-10" href="/vendors/dashboard">
          <button className="h-10 px-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100 on">
            Close
          </button>
        </a></>):(<><div className="wrapper">
          
        </div>

        <div className="mt-3 text-xl font-semibold uppercase text-green-500">
          Hold On!
        </div>
        <div className="text-lg font-semibold text-gray-500">
          Your Request is beeing submitted
        </div>
        
        </>)}
        
      </div>
    </div>
  );
}
