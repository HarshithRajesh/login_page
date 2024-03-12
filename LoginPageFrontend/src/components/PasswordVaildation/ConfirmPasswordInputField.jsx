import styles from './ConfirmPasswordInputField.module.css'

function ConfirmPasswordInputField({handleValidation, handlePasswordChange, confirmPasswordValue, confirmPasswordError}){
    return (
        <><form>
     <div className={styles.form_control}>
        <label htmlFor="ConirmPass">Confirm Password</label>
        <input type="password" value={confirmPasswordValue}  onChange={handlePasswordChange} onKeyUp={handleValidation} name="confirmPassword" placeholder="Confirm Password" />
        <p className="text-danger">{confirmPasswordError}</p>
    </div>
    </form>
        </>
    )
}

export default ConfirmPasswordInputField;