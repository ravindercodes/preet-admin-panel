import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import LoginInfo from '../login/LoginInfo';
import LogoImage from '../../../images/dried-mango-logo.svg';
import Form from 'react-bootstrap/Form';
import Button from '../../../components/shared/buttons/button';
import { toast } from 'react-toastify';
import {useForgotPasswordMutation} from "../authApi";
import {useNavigate} from "react-router-dom";

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }

        try {
            await forgotPassword({ email }).unwrap();
            toast.success("A password reset email has been sent to your email address.");
            setEmail('');
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            console.error("Forgot Password Error:", error);
            if (error.status === 400 || error.status === 404) {
                toast.error(error.data.message || "Invalid Email or User not found.");
            } else if (error.data && error.data.message) {
                toast.error(error.data.message);
            }
            else {
                toast.error("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <Row className='m-0'>
            <Col lg={6} className='p-0'>
                <div className='login_wrapper d-flex justify-content-center align-items-center min-vh-100'>
                    <div className='login_form'>
                        <img src={LogoImage} alt="logo" className='img-fluid' />
                        <h1>Forget Password</h1>
                        <Form onSubmit={handleSubmit}> {/* Add the form and onSubmit handler */}
                            <Form.Group className="mb-3 cmn_input">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button label="Send Email" size='medium' className="w-100" type="submit" isLoading={isLoading} /> {/* Submit button */}
                        </Form>
                    </div>
                </div>
            </Col>
            <Col lg={6} className='p-0'>
                <div className='info_wrapper min-vh-100 d-flex justify-content-center align-items-center overflow-hidden position-relative'>
                    <LoginInfo />
                </div>
            </Col>
        </Row>
    );
};

export default ForgetPassword;