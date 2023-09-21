import React, { useState} from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';


import './SignUp.css'

import { createAuthUserWithEmailAndPassword } from '../../utils/firebase.utils';

export default function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formLoading, setFormLoading] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();
        setFormLoading(true);
        const response =  createAuthUserWithEmailAndPassword(email, password);
        response.then((userCredential) => {
          // User created successfully.
          const user = userCredential.user;
        //   console.log("User created:", user.uid);
          setFormLoading(false);
          setEmail('');
          setPassword('');
          navigate('/')
      })
      .catch((error) => {
          // Handle errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error creating user:", errorCode, errorMessage);
          if(errorCode === 'auth/network-request-failed'){
            console.log('yuo')
            setErrorMessage('Network request failed, check your internet connection and try again');
            setFormLoading(false);
        }
        else if(errorCode === 'auth/invalid-email'){
            setErrorMessage('Invalid email, Please choose a valid email address')
            setFormLoading(false);
        }
        else if(errorCode === 'auth/weak-password'){
            setErrorMessage('Password should be at least 6 characters')
            setFormLoading(false);
        }
        else if(errorCode === 'auth/email-already-in-use'){
            setErrorMessage('Email already in use');
            setFormLoading(false);
        }
      });
    }
  return (
    <>
    <Navbar />
    <Container className='mt-5 signup_component'>
        <Row className='justify-content-center align-items-center mb-5'>
            <Col xs = '10' sm = '6' lg = '4'>
                    <div className='signup_pet animate__animated animate__swing'>

                    </div>
            </Col>

            <form onSubmit={handleSubmit} className='col-auto col-sm-6 col-lg-4'>
            <div className='row'>
                        <div className='col'>
                            <p className='signup_title'>Discover and share cute and cuddly pets with fellow animal lovers.</p>
                        </div>
                    </div>
                <div className='row mb-4'>
                <div className='col-10'>
                        <label className='signup_email' htmlFor="">Email</label>
                        <input 
                        className='form-control signup_input'
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" required />
                    </div>
                    <div className='col-10'>
                        <label className='signup_password' htmlFor="">Password</label>
                        <input 
                        className='form-control signup_input'
                        value = {password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" required />
                    </div>
                    <div className="form-text text-danger" style={{fontWeight:'600'}}>{errorMessage}</div>
                </div>
                <div className='row'>
                    <div className='col'>
                    <div className='d-flex'>
                            <button disabled = {formLoading} className='btn signup_btn me-5'>Create Account</button>
                            {formLoading && <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>}
                            </div>
                    </div>
                </div>
            </form>

        </Row>

    </Container>
    </>

  )
}
