import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useStepperContext } from "../../../../contexts/StepperContext";

export default function Final() {
  const { userData, setUserData } = useStepperContext();
  const [success, setSuccess] = useState(false)
  const admin = useSelector((state) => state.vendor)

  const onSubmit = async () => {
    userData.userId = admin.admin.id; 
    console.log("userid" , userData.userId);
    console.log(userData);
    const formData = new FormData();
    
    console.log("here",userData)
    for (const key in userData) {
      if (key === 'image') {
        console.log("if", key);
        let file = userData.image;
        for(let i=0; i<file.length; i++){
          formData.append("image", file[i])
        }
      } else {
        console.log(key)
        formData.append(key, userData[key]);
      }
    }
    
    console.log("formdata122", formData);

    axios.post("/api/vendors/registration", formData)
      .then((response) => {
        setSuccess(true)
        console.log("then", response);
        
      })
      .catch(async (err) => {
        console.log(err.response.data.errors);
          
      });
  };

  useEffect(() => {
   console.log(userData)
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
        <a className="mt-10" href="/vendors/home">
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
