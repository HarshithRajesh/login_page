import styles from "./PasswordInputField.module.css"

function PasswordInputField({handleValidation, handlePasswordChange, passwordValue, passwordError}){
    return (
        <>
    <form>
     <div className={styles.form_control}>
     <label htmlFor="Pass">Password</label>
        <input type="password" value={passwordValue}  onChange={handlePasswordChange} onKeyUp={handleValidation} name="password" placeholder="Password" />
        <p className="text-danger">{passwordError}</p>
        </div>
    </form>
          
        </>
    )
}

export default PasswordInputField;