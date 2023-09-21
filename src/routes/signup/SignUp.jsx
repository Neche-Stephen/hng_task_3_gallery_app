import React, { useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';

import { createAuthUserWithEmailAndPassword } from '../../utils/firebase.utils';

export default function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        const response =  createAuthUserWithEmailAndPassword(email, password);
        response.then((userCredential) => {
          // User created successfully.
          const user = userCredential.user;
          console.log("User created:", user.uid);
          navigate('/')
      })
      .catch((error) => {
          // Handle errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error creating user:", errorCode, errorMessage);
      });
    }
  return (
    <>
    <Navbar />
    <Container className='mt-5'>
        <Row className='justify-content-center'>
            <h1>Login</h1>
               <form onSubmit={handleSubmit} className='col-4'>
                   <div className='row'>
                    <div className='col'>
                            <label htmlFor="">Email</label>
                            <input 
                            value = {email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" />
                        </div>
                        <div className='col'>
                            <label htmlFor="">Password</label>
                            <input 
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" />
                        </div>
                   </div>
                    <div className='row'>
                        <div className='col'>
                            <button>Sign In</button>
                        </div>
                    </div>
               </form>

        </Row>

    </Container>
    </>

  )
}
