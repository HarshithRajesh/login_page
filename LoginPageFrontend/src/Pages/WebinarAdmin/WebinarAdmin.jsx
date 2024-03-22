import React, { useEffect, useState, useRef } from 'react'
import styles from "./WebinarAdmin.module.css"
import Button from "../../components/Button/Button"
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordAndConfirmPasswordValidation from '../../components/PasswordVaildation/PasswordAndConfirmPasswordValidation';
import { logo, SignUP, Close } from '../../Images';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// export const Detailed = () => { }
const WebinarAdmin = () => {
  const navigate = useNavigate();

  const [userData, setUserdata] = useState(null);
  const [Title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const [LinkURL, setLinkURL] = useState('');
  const [date, setdate] = useState('');
  const [time, settime] = useState('');
  const TitleRef = useRef('');
const descriptionRef = useRef('');
const LinkURLRef = useRef('');
const dateRef = useRef('');
const timeRef = useRef('');

  useEffect(() => {
    const getUserdata = async () => {
      try {
        const response = await fetch('http://192.168.97.188:5000/Admin', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          // If the response is not ok, handle the error here
          const errorMessage = `An error occurred while fetching products: ${response.statusText}`;
          console.error(errorMessage);
          return;
        }

        const json = await response.json();
        setUserdata(json.users);
      } catch (error) {
        // If an error occurs during the fetch request, handle it here
        console.error('An error occurred while fetching products:', error);
      }
    };
    getUserdata();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://192.168.97.188:5000/Webinar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Title: TitleRef.current ? TitleRef.current.value : '',
        description: descriptionRef.current ? descriptionRef.current.value : '',
        LinkURL: LinkURLRef.current ? LinkURLRef.current.value : '',
        date: dateRef.current ? dateRef.current.value : '',
        time: timeRef.current ? timeRef.current.value : '',
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        // Handle the response from the backend
        console.log(data);
        console.log('Title:', TitleRef,'description: ',description);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    // <div><textarea ref={Detailed} />
    //   <button onClick={handleClick}>Add</button>
    <> <br /><br /><br />
      <br /><br /><br />
      <Link to="/">Home</Link>
      <br /><br /><br />
      <div className={styles.contact_form}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={3} lg={4}>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={styles.center_paper}>
            <Paper elevation={8} className={styles.grid_content} p={100}>
              <div className={styles.Arranging}>
                <div className="Form">
                  <form action="" onSubmit={handleSubmit}>
                    <div className={styles.form_control}>
                      <label htmlFor="Title">Title</label>
                      <input ref={TitleRef} onChange={(e) => setTitle(e.target.value)} placeholder='Title' type="text" name="Title" />
                    </div>
                    <div className={styles.form_control}>
                      <label htmlFor="description">Description</label>
                      <textarea placeholder='Description' ref={descriptionRef} onChange={(e) => setdescription(e.target.value)} name="Description" />
                    </div>
                    <div className={styles.form_control}>
                      <label required htmlFor="Link">Link for the Webinar</label>
                      <input type='text' ref={LinkURLRef} onChange={(e) => setLinkURL(e.target.value)} placeholder='URL' name="Link" />
                    </div>
                    <div className={styles.form_control}>
                      <label required htmlFor="Date">Date</label>
                      <input type='text' ref={dateRef} onChange={(e) => setdate(e.target.value)} placeholder='date' name="date" />
                    </div>
                    <div className={styles.form_control}>
                      <label required htmlFor="time">Time</label>
                      <input type='text' ref={timeRef} onChange={(e) => settime(e.target.value)} placeholder='time' name="time" />
                    </div>
                    <div style={{
                      display: 'flex', justifyContent: 'left', padding: '0 12%'
                    }}>
                      <Button text="SUBMIT" /></div>
                  </form>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3} lg={4}>
          </Grid>
        </Grid></div>

      <h5>
        No of Users: {userData && userData.length}
      </h5>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h5 className="mt-2">User Data</h5>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone No</th>
                </tr>
              </thead>
              <tbody>
                {userData && userData.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1} </td>
                    <td>{user.name} </td>
                    <td>{user.email} </td>
                    <td>{user.phonenumber} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default WebinarAdmin