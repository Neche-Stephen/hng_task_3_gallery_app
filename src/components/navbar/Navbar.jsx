import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { signOutCurrentUser } from '../../utils/firebase.utils';

import './Navbar.css'

export default function Navbar({user, handleSearchChange}) {
    const handleSignOut = () =>{
        signOutCurrentUser();
        const response = signOutCurrentUser();
        response.then(() => {
            // The user is signed out.
            // console.log('out')
            alert('You are now signed out')
          })
          .catch((error) => {
            // Handle sign-out errors
          });
    }
  return (
   <nav>
         <Container>
            <Row className='justify-content-center justify-content-sm-between align-items-center'>
                <Col xs = 'auto' sm ='4' lg = '3'>
                    <p><Link to = '/' className='nav_home'>Paw-some <span className='d-inline-block d-sm-none d-lg-inline-block'>Pets</span></Link></p>
                </Col>
              {
                user && <Col xs = '6' sm = '4' lg = '4'>
                <input type="text" 
                className='form-control' 
                // value={searchTerm}
                onChange={handleSearchChange}
                placeholder='Search "dog" or "cat" pets'/>
            </Col>
              }
                <Col xs = '6' sm ={user ? '4': '8'} lg = '4'>
                    <Row className='justify-content-end align-items-center'>
                        <Col>
                            {user ? <p style={{cursor:'pointer'}} className='nav_logout' onClick={handleSignOut}>Logout</p>:
                           <p> <Link to = '/login' className='nav_signin'>Signin</Link> </p>   
                             }
                        </Col>
                        <Col>
                            <p><Link to = '/signup' className='nav_signup'><span className='d-none d-lg-block'>Create Account</span> <span className='d-lg-none'>Login</span></Link></p>
                        </Col>
                    </Row>
                </Col>
            </Row>
         </Container>
   </nav>
  )
}
