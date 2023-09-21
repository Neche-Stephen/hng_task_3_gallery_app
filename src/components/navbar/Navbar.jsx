import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { signOutCurrentUser } from '../../utils/firebase.utils';

import './Navbar.css'

export default function Navbar({user, searchTerm , handleSearchChange}) {
//   const [searchTerm, setSearchTerm] = useState('');

    const handleSignOut = () =>{
        signOutCurrentUser();
        const response = signOutCurrentUser();
        response.then(() => {
            // The user is signed out.
            console.log('out')
          })
          .catch((error) => {
            // Handle sign-out errors
          });
    }
  return (
   <nav>
         <Container>
            <Row className='justify-content-between align-items-center'>
                <Col xs = '3'>
                    <p><Link to = '/' className='nav_home'>Paw-some Pets</Link></p>
                </Col>
                <Col xs = '4'>
                    <input type="text" 
                    className='form-control' 
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder='Search for a specific pet'/>
                </Col>
                <Col xs = '4'>
                    <Row>
                        <Col>
                            {user ? <p className='nav_logout' onClick={handleSignOut}>Logout</p>:
                            <Link to = '/login' className='nav_signin'>Signin</Link>    
                             }
                        </Col>
                        <Col>
                            <p><Link to = '/signup' className='nav_signup'>Create Account</Link></p>
                        </Col>
                    </Row>
                </Col>
            </Row>
         </Container>
   </nav>
  )
}
