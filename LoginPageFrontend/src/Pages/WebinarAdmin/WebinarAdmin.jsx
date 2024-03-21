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
  const [userData, setUserdata] = useState([]);
  useEffect(() => {
    const getUserdata = async () => {
      const reqData = await fetch("http://192.168.199.115:5000/");
      const resData = await reqData.json();
      setUserdata(resData);
      console.log(resData);
    }
    getUserdata();
  }, []);

  console.log(localStorage.getItem("inputValue"))
  const parsedUserData = JSON.parse(userData);
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
              {parsedUserData && parsedUserData.map(user =>  (
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

  )
}

export default WebinarAdmin