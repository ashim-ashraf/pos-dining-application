/* eslint-disable no-lone-blocks */
/* eslint-disable default-case */
import React, { useEffect, useState } from 'react'

const useFormUserValidation = (userData) => {
    const [errors, setErrors] = useState({
        fname: "",
        lname: "",
        phone: "",
        company: "",
        password: "",
        repeat_password: "",
        email: ""
    });


    const handleChangeValidation = async (e) => {

        let { name, value } = e.target
        value = value.trim()
        validation(name, value)
    }
    const validation = (name, value) => {

        let error = "";
        switch (name) {
            case 'fname': {
                if (!value) {
                    error = "First Name is Required"
                }
                break;
            };
            case 'lname': {
                if (!value) {
                    error = "Last Name is Required"
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
                } else if (value.length != 10) {
                    error = "Mobile number should be 10 digits"
                }
                break;
            };
            case 'company': {
                if (!value) {
                    error = "Company name is Required"
                }
                break;
            };
            case 'password': {
                if (!value) {
                    error = "Password is Required"
                } else if (value.length < 6) {
                    error = "Password needs to be 6 characters or more"
                }
                break;
            };
            case 'repeat_password': {
                if (!value) {
                    error = "Confirm password is Required"
                } else if (userData.password != value) {
                    error = "Passwords do not match"
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
                if (errors[key].length != 0) {
                    return false
                }
            }
        }
        // console.log("Handle Function 222222222222222222222")

        for (const key in userData) {
            if (userData.hasOwnProperty(key)) {
                validation(key , userData[key])
                if (userData[key].length == 0) {
                    flag = 1;
                }
            }
        }
        if(flag == 1)
        {
            return false
        }else{
        return true
        }

    }

    return { handleChangeValidation, errors, handleNext }
}

export default useFormUserValidation