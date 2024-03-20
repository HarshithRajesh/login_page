import styles from "./PasswordInputField.module.css"
import React, { forwardRef, useImperativeHandle,useRef } from "react";
const PasswordInputField= forwardRef((props, ref) => {
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => ({
        focusInput() {
          inputRef.current.focus();
          console.log(inputRef.current.value);
        }
        
      }));
    return (
        <>
    
     <div className={styles.form_control}>
     <label htmlFor="Pass">Password</label>
        <input type="password"
      ref={inputRef}

      onChange={props.handlePasswordChange}
      value={props.passwordValue}
      onKeyUp={props.handleValidation}
      name="password"
      placeholder="Password" />
        <p className="text-danger">{props.passwordError}</p>
        </div>
        </>
    );
});

export default PasswordInputField;