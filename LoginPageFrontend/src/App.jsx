import React,{useEffect} from 'react'
import { Link } from "react-router-dom";
const App = () => {
  useEffect(()=>{
    window.scroll(0,0);
  },[])
  return <><div>
 Hello
  </div>
  <div><Link to="/SignUp">SignUp</Link></div>
  <div><Link to="/Login">Login</Link></div>
  <div><Link to="/simple">SimpleForm</Link></div>
  <div><Link to="/WebinarAdmin">WebinarAdmin</Link></div>

  </>
}

export default App