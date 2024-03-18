import React, { useState, useRef, useEffect } from 'react';
import styles from './SignUp.module.css'
import Button from "../../components/Button/Button"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordAndConfirmPasswordValidation from '../../components/PasswordVaildation/PasswordAndConfirmPasswordValidation';
import { Link } from "react-router-dom";
import { logo, SignUP, Close } from '../../Images';
import axios from 'axios'

const SignUp = () => {
  const [response, setResponse] = useState('');
  const nameRef = useRef();
  const emailRef = useRef();
  const phonenumberRef = useRef();
  const passwordRef = useRef(null);
  console.log(nameRef, emailRef, phonenumberRef, passwordRef);
  const sendData = async (name, email, phonenumber, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = 'http://192.168.97.188:5000/Form/';
        const params = new URLSearchParams();
        params.append('name', name);
        params.append('email', email);
        params.append('phonenumber', phonenumber);
        params.append('password', password);
        if (passwordRef.current) {
          params.append('confirmPassword', passwordRef.current.current.value);
        }

        const response = await axios.post(url,null, {params});
        setResponse(response.data);
        resolve();
      } catch (error) {
        console.error('Error sending data:', error);
        reject(error);
      }
    });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log('onSubmit');
    console.log('nameRef:', nameRef.current.value);
    console.log('passwordRef:', passwordRef.current.value);
    
    try {
      
      console.log('nameRef:', nameRef.current.value);
      const name = nameRef.current.value;
      console.log('name:', name);
      const email = emailRef.current.value;
      const phonenumber = phonenumberRef.current.value;
      const password = passwordRef.current.current.value;// Access the password value through the ref
      console.log
      console.log('name:', name);
      if (!name || !email || !phonenumber || !password) {
        console.error('Missing required fields');
        return;
      }
      console.log('Sending data:', name, email, phonenumber, password);
      sendData(name, email, phonenumber, password);
    } catch (error) {
      console.error('Error sending data:', error);
    }
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
                    <Link to="/"> <img src={Close} width={20} /></Link></div>
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
                          <input required ref={nameRef} placeholder='UserName' type="text" name="Name" />
                        </div>
                        <div className={styles.form_control}>
                          <label htmlFor="number">Contact Number</label>
                          <input placeholder='Enter your number' ref={phonenumberRef} type="tel" name="number" />
                        </div>
                        <div className={styles.form_control}>
                          <label required htmlFor="email">Email</label>
                          <input type='email' ref={emailRef} placeholder='Email' name="email" />
                        </div>
                        <div><PasswordAndConfirmPasswordValidation ref={passwordRef} /> </div>
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
                        <div>{response}</div>
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