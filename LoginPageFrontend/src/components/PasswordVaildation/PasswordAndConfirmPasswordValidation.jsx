import React, { useState, useRef, useEffect, forwardRef } from "react";
import PasswordInputField from "./PasswordInputField";
import ConfirmPasswordInputField from "./ConfirmPasswordInputField";
const PasswordAndConfirmPasswordValidation = forwardRef((props, ref) => {
    const passwordRef = useRef(null);
    const [passwordError, setPasswordErr] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordInput, setPasswordInput] = useState({
        password: '',
        confirmPassword: ''
    })


    const handlePasswordChange = (evnt) => {
        console.log(passwordInput.password);
        const passwordInputValue = evnt.target.value.trim();
        const passwordInputFieldName = evnt.target.name;
        const NewPasswordInput = { ...passwordInput, [passwordInputFieldName]: passwordInputValue }
        setPasswordInput(NewPasswordInput);
        props.onPasswordChange(evnt.target.value.trim());
        console.log(NewPasswordInput);

    }
    const handleValidation = (evnt) => {

        const passwordInputValue = evnt.target.value.trim();
        const passwordInputFieldName = evnt.target.name;

        //for password 
        if (passwordInputFieldName === 'password') {
            const uppercaseRegExp = /(?=.*?[A-Z])/;
            const lowercaseRegExp = /(?=.*?[a-z])/;
            const digitsRegExp = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*.-])/;
            const minLengthRegExp = /.{8,}/;

            const passwordLength = passwordInputValue.length;
            const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
            const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
            const digitsPassword = digitsRegExp.test(passwordInputValue);
            const specialCharPassword = specialCharRegExp.test(passwordInputValue);
            const minLengthPassword = minLengthRegExp.test(passwordInputValue);

            let errMsg = "";
            if (passwordLength === 0) {
                errMsg = "Password is empty";
            } else if (!uppercasePassword) {
                errMsg = "At least one Uppercase";
            } else if (!lowercasePassword) {
                errMsg = "At least one Lowercase";
            } else if (!digitsPassword) {
                errMsg = "At least one digit";
            } else if (!specialCharPassword) {
                errMsg = "At least one Special Characters";
            } else if (!minLengthPassword) {
                errMsg = "At least minumum 8 characters";
            } else {
                errMsg = "";
            }
            setPasswordErr(errMsg);
        }

        // for confirm password
        if (passwordInputFieldName === "confirmPassword" || (passwordInputFieldName === "password" && passwordInput.confirmPassword.length > 0)) {

            if (passwordInput.confirmPassword !== passwordInput.password) {
                setConfirmPasswordError("Confirm password is not matched");
                localStorage.setItem('password',0);
            } else {
                setConfirmPasswordError("");
                localStorage.setItem('password',1);
            }

        }

    }

    // useEffect(() => {
    //     if (confirmPasswordError) {
    //       passwordRef.current.focus();
    //     }
    //   }, [confirmPasswordError]);
    //   if (PasswordError) {
    //     passwordRef.current.focus();
    //   }
    // }, [PasswordError]);
    
    return (
        <>
            <PasswordInputField ref={passwordRef} handlePasswordChange={handlePasswordChange} handleValidation={handleValidation} passwordValue={passwordInput.password} passwordError={passwordError} />
            <ConfirmPasswordInputField ref={passwordRef} handlePasswordChange={handlePasswordChange} handleValidation={handleValidation} confirmPasswordValue={passwordInput.confirmPassword} confirmPasswordError={confirmPasswordError} />
        </>
    )
});
export default PasswordAndConfirmPasswordValidation;