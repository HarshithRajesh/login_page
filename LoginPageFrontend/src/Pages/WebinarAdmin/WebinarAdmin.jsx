import React, { useEffect, useState, useRef } from 'react'
import "./WebinarAdmin.css"
import { json, useNavigate } from 'react-router-dom'

const WebinarAdmin = () => {
  const navigate = useNavigate();
  const [userData, setUserdata] = useState([]);
  useEffect(() => {
    window.scroll(0, 0);
  }, [])
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/Login');
    }
  }, [])
  const Detailed = useRef();

  const handleClick = async () => {
    // Make a request here if needed
    // ...
    // After your request, you can update the userData
  };

  // Define the fetchData function
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/Admin');

      // Check if the response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUserdata(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  // Call fetchData function when the component mounts
  useEffect(() => {
    fetchData();  
    console.log(userData.count);
  }, []);

  return (
    <div>
      <textarea ref={Detailed} />
      <button onClick={handleClick}>Add</button>
      <br /><br /><br />
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
                {userData.map((userData, index) => (
                  <tr key={index}>
                    <td>{index + 1} </td>
                    <td>{userData.username} </td>
                    <td>{userData.email} </td>
                    <td>{userData.phone} </td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebinarAdmin;