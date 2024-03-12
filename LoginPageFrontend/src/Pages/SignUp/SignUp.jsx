import React from 'react'
import styles from './SignUp.module.css'
import Button from "../../components/Button/Button"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordAndConfirmPasswordValidation from '../../components/PasswordVaildation/PasswordAndConfirmPasswordValidation';
import { Link } from "react-router-dom";
import { logo,SignUP,Close} from '../../Images';


const SignUp = () => {
  const onSubmit = (event) => {
    event.preventDefault();
    toast.success('Registered Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <>
      <div style={{ backgroundColor: 'var(--Aqua)', height: '100vh', width: '100%', }}>
        <div className={styles.contact_form}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={3} lg={4}>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={styles.center_paper}>
            <Paper elevation={8} className={styles.grid_content} p={100}>
              <div className={styles.Close}>
           <Link to="/"> <img src={Close} width={20}/></Link></div>
            <br />
              <div className={styles.Arranging}>
                <div className={styles.Image}><h1 className={styles.Head}>SignUp</h1><br /> <br /> <br /> <br /> 
                <img src={SignUP} width={250} />
                </div>
                <div className="Form">
                <img src={logo} width={50} /><br /><br />
                  <form action="" onSubmit={onSubmit}>
                    <div className={styles.form_control}>
                      <label htmlFor="Name">Username</label>
                      <input required placeholder='UserName' type="text" name="Name" />
                    </div>
                    <div className={styles.form_control}>
                      <label htmlFor="number">Contact Number</label>
                      <input placeholder='Enter your number' type="tel" name="number" />
                    </div>
                    <div className={styles.form_control}>
                      <label required htmlFor="email">Email</label>
                      <input type='email' placeholder='Email' name="email" />
                    </div>
                    <div><PasswordAndConfirmPasswordValidation /> </div>
                    <div className={styles.form_control_check}>
                      <input type="checkbox" name="check" />
                      <label htmlFor="chec"> I authorize Medical Mentor to contact me via email, SMS & voice call.</label>
                    </div>
                    <div className={styles.form_control_check}>
                      <input required type="checkbox" name="check" />
                      <label htmlFor="chec">Remember me</label>
                    </div>
                    <div style={{
                      display: 'flex', justifyContent: 'left', padding: '0 12%'
                    }}>
                      <Button text="SUBMIT" /></div>
                    <div className="loginlink">
                      <p>Already have a account?<Link to="/Login">Login</Link></p>
                    </div>
                  </form>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3} lg={4}>
          </Grid>
        </Grid>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </div></div>
    </>
  )
}

export default SignUp