import React, { useEffect, useState, useRef } from 'react'
import "./WebinarAdmin.css"
import { useNavigate } from 'react-router-dom'
export const Detailed = () => { }
const WebinarAdmin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scroll(0, 0);
  }, [])
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/Login');
    }
  }, [])
  const Detailed = useRef();

  const handleClick = () => {
    console.log(Detailed.current.value, "initial value")
    localStorage.setItem("inputValue", Detailed.current.value)
  }
  const [userData, setUserdata] = useState(null);
  
  useEffect(() => {
    const getUserdata = async () => {
      try {
        const response = await fetch('http://192.168.199.115:5000/Admin', {
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

  console.log(localStorage.getItem("inputValue"))
  return (
    <div><textarea ref={Detailed} />
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
    </div>

  )
}

export default WebinarAdmin