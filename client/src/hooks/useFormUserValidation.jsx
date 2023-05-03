/* eslint-disable no-lone-blocks */
/* eslint-disable default-case */
import React, { useEffect, useState } from 'react'
import { isValidName, validateDescription, validatePhone } from '../validation/validation';

const useFormUserValidation = (userData) => {
    const [errors, setErrors] = useState({
        restaurantName: "",
    liscenceNo: "",
    description: "",
    restaurantPhone: "",
    restaurantType:"",
    address: "",
    state: "",
    pincode:"",
    email:""
    });

    const handleChangeValidation = async (e) => {
        let { name, value } = e.target
        value = value.trim()
        validation(name, value)
    }

    const validation = (name, value) => {

        let error = "";
        switch (name) {
            case 'restaurantName': {
                if (!isValidName(value)) {
                    error = "Name is Required"
                }
                break;
            };
            case 'liscenceNo': {
                if (!value) {
                    error = "Liscence No is Required"
                }
                break;
            };
            case 'email': {
                var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;
                if (!value) {
                    error = "E-mail is Required"
                }
                else if(!validRegex.test(value))
                {
                    error ="E-mail address is invalid"
                }
                break;
            };
            case 'phone': {
                if (!value) {
                    error = "Registered Mobile is required"
                } else if (!validatePhone(value)) {
                    error = "Mobile number should be 10 digits"
                }
                break;
            };
            case 'restaurantPhone': {
                if (!value) {
                    error = "Registered Mobile is required"
                } else if (!validatePhone(value)) {
                    error = "Mobile number should be 10 digits"
                }
                break;
            };
            case 'restaurantType' :{
                if(!value){
                    error = "Restaurant type is required"
                } else if (!isValidName(value)){
                    error = 'Enter a valid Restaurant type'
                }
                break;
            }
            case 'description': {
                if (!validateDescription(value)) {
                    error = "Enter a valid Description"
                }
                break;
            };
            case 'address': {
                if (!isValidName(value)) {
                    error = "Enter a valid Address "
                }
                break;
            };
            case 'state': {
                if (!isValidName(value)) {
                    error = "Enter a valid State "
                }
                break; 
            };
            case 'pincode': {
                if (!value) {
                    error = "Enter a valid pincode "
                }
                break; 
            }
        }
        setErrors((prevErrors) => ({
            ...prevErrors, [name]: error
        }))

    }
    const handleNext = () => {
        let flag = 0
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                // console.log(`${key}: ${errors[key].length}`);
                if (errors[key]?.length !== 0) {
                    return false
                }
            }
        }
        

        for (const key in userData) {
            if (userData.hasOwnProperty(key)) {
                validation(key , userData[key])
                if (userData[key]?.length === 0) {
                    flag = 1;
                }
            }
        }
        if(flag === 1)
        {
            return false
        }else{
        return true
        }
    }

    return { handleChangeValidation, errors, handleNext }
}

export default useFormUserValidation