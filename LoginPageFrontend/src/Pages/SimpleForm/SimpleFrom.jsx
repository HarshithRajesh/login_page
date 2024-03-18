import React, { useState, useRef } from 'react';

function SimpleForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch('http://192.168.199.115:5000/Form/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        email: emailRef.current.value,
        phoneNumber: phoneNumberRef.current.value,
        password: passwordRef.current.value
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
        console.log('name:', name, 'email:', email, 'phoneNumber:', phoneNumber, 'password:', password);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
        
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" ref={nameRef} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" ref={emailRef} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Phone Number:
        <input type="tel" ref={phoneNumberRef} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" ref={passwordRef} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default SimpleForm;