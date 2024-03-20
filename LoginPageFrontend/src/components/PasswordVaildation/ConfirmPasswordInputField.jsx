import styles from './ConfirmPasswordInputField.module.css'
import React, { forwardRef, useImperativeHandle,useRef } from "react";
const ConfirmPasswordInputField = forwardRef((props, ref) => {
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      focusInput() {
        inputRef.current.focus();
      }
    }));
    return (
        <>
     <div className={styles.form_control}>
        <label htmlFor="ConirmPass">Confirm Password</label>
        <input
      type="password"
      ref={inputRef}
      onChange={props.handlePasswordChange}
      value={props.confirmPasswordValue}
      onKeyUp={props.handleValidation}
      name="confirmPassword"
      placeholder="Confirm Password"
    />
        <p className="text-danger">{props.confirmPasswordError}</p>
    </div>
    
        </> 
    );
    });

export default ConfirmPasswordInputField;