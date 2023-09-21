import React, { useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';

import './SignIn.css'
import { signInAuthUserWithEmailAndPassword } from '../../utils/firebase.utils';

export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        const response =  signInAuthUserWithEmailAndPassword(email, password);
        response.then((userCredential) => {
            // User signed in successfully.
            const user = userCredential.user;
            console.log("User signed in:", user.uid);
            navigate('/')
        })
        .catch((error) => {
            // Handle errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error signing in:", errorCode, errorMessage);
      });
    }
  return (
    <>
    <Navbar />
    <Container className='mt-5 signin_component'>
        <Row className='justify-content-evenly align-items-center'>
                <Col xs = '4'>
                    <div className='signin_pet'>

                    </div>
                </Col>
               <form onSubmit={handleSubmit} className='col-4'>
                   <div className='row mb-4'>
                    <div className='col-10'>
                            <label className='signin_email' htmlFor="">Email</label>
                            <input 
                            className='form-control'
                            value = {email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" />
                        </div>
                        <div className='col-10'>
                            <label className='signin_password' htmlFor="">Password</label>
                            <input 
                            className='form-control'
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" />
                        </div>
                   </div>
                    <div className='row'>
                        <div className='col'>
                            <button className='btn signin_btn'>Sign In</button>
                        </div>
                    </div>
               </form>

        </Row>

    </Container>
    </>

  )
}
