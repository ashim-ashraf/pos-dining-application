/* eslint-disable import/prefer-default-export */

export const validatePhone = (phone) => {
  if(!phone){
    return false
  }
    const regex = /([0-9\s-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
    return regex.test(phone);
  };
  
  
  export const isValidName=(name)=> {
    if(!name){
        return false
    }
    const regex = /^[a-zA-Z ]+$/;
    return regex.test(name);
  }
  
  export const isValidEmail=(email)=> {
    if(!email){
      return false
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  export function validateDescription(description) {
    if (!description) {
        return false; // or any other error handling behavior
      }
      const words = description.trim().split(/\s+/);
      return words.length >= 5;
  }

  export function validatePrice(price) {
    if(!price){
        return false
    }
    return price.trim().length > 0 && parseFloat(price) > 0;
  }

  export function validateDropdown(value) {
    if(!value){
        return false
    }
    return value !== "";
  }

  export function validateImage(images) {
    if (!images || images.length === 0) {
        return false;
      }
    
      const allowedTypes = ["image/jpeg", "image/jpg", "image/webp"];
    
      for (let i = 0; i < images.length; i++) {
        if (!allowedTypes.includes(images[i].type)) {
          return false;
        }
      }
    
      return true;
  }
  
  export function validatePassword(password) {
    if(!password){
      return false
    }
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinimumLength = password.length >= 8;
  
    if (!hasUppercase) {
      return 'Password must contain at least one uppercase letter';
    }
  
    if (!hasNumber) {
      return 'Password must contain at least one number';
    }
  
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }
  
    if (!hasMinimumLength) {
      return 'Password must be at least 8 characters long';
    }
  
    return null;
  }