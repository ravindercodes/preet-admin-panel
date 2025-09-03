import React from 'react'
import { ConfirmSvg } from '../../../svgFiles/confirmSvg.jsx';
import LogoImage from '../../../images/dried-mango-logo.svg'
import Form from 'react-bootstrap/Form';
import Button from '../../../components/shared/buttons/button';
import ViewPassword from '../../../images/eye-icon.svg'
import './createPassword.css'
const CreatePassword = () => {
  return (
  <div className='min-vh-100 d-flex align-items-center justify-content-center light_bg'>
    <div className='login_wrapper d-flex justify-content-center align-items-center create_password'>
      <div className='login_form '>
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
      <div className='password_confirmed d-none'>
        <div className='confirm_image text-center'>
          {ConfirmSvg}
        </div>
          <h4>Your password has been successfully created.</h4>
          <h3>
          Continue to log in to your account.
          </h3>
          <Button label="Continue" size='medium' className="w-100"/>
      </div>
    </div>
  </div>
            
      
  )
}

export default CreatePassword