import { useState } from "react";
import { validateImage } from "../validation/validation";

const useFormImageValidation =  (image) => {
  const [imageErrors, setImageErrors] = useState('');
  const error = []

  const formImageValidate = () => {
    console.log(image)
    if (!image) {
      setImageErrors("Enter a valid Image")
      error.push("error")
    } else if (!validateImage(image)) {
        error.push("error")
      setImageErrors("Enter a valid Image")
    } else {
      setImageErrors("");
      error.pop()
    }
  };

  const imageHandleNext = () => {
    formImageValidate();
    console.log(imageErrors , error);
    // if (!imageErrors.trim()) {
    //   return true;
    // } else {
    //   return false;
    // }

    if (!error.length > 0) {
        return true;
      } else {
        return false;
      }
  };
  return { imageErrors, imageHandleNext };
};
export default useFormImageValidation;
