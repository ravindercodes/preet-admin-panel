import React from 'react'
import { Row,Col } from 'react-bootstrap'
import LoginInfo from '../login/LoginInfo';
import LogoImage from '../../../images/dried-mango-logo.svg'
import Form from 'react-bootstrap/Form';
import Button from '../../../components/shared/buttons/button';
import ViewPassword from '../../../images/eye-icon.svg'
const ResetPassword = () => {
  return (
    <Row className='m-0'>
        <Col lg={6} className='p-0'>
            <div className='login_wrapper d-flex justify-content-center align-items-center min-vh-100'>
                <div className='login_form'>
                     <img src={LogoImage} alt="logo" className='img-fluid' />
                     <h1>Create Your Password</h1>
                     <p className='pt-1'>Create a new password.</p>
                     <Form.Group className="mb-3 cmn_input">
                    <Form.Label>Create Password</Form.Label>
                    <div className="position-relative">
                        <Form.Control 
                        type="password" 
                        placeholder="Enter new password" 
                        autoComplete="new-password"
                        />
                        <span className="view_pass">
                        <img src={ViewPassword} alt="eye" />
                        </span>
                    </div>
                    </Form.Group>

                    <Form.Group className="mb-4 cmn_input">
                    <Form.Label>Confirm Password</Form.Label>
                    <div className="position-relative">
                        <Form.Control 
                        type="password" 
                        placeholder="Confirm password" 
                        autoComplete="new-password"
                        />
                        <span className="view_pass">
                        <img src={ViewPassword} alt="eye" />
                        </span>
                    </div>
                    </Form.Group>
                    
                     <Button label="Confirm" size='medium' className="w-100"/>
                  </div>
            </div>
        </Col>
        <Col lg={6} className='p-0'>
        <div className='info_wrapper min-vh-100 d-flex justify-content-center align-items-center overflow-hidden position-relative'>
            <LoginInfo/>
        </div>
        </Col>
    </Row>
  )
}

export default ResetPassword