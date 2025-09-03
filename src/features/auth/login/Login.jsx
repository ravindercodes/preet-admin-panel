import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import LoginInfo from './LoginInfo';
import LogoImage from '../../../images/logo-name.png'
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/shared/buttons/button';
import ViewPassword from '../../../images/eye-icon.svg';
import HidePassword from '../../../images/eye-off.svg'
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import { clearRedirectPath } from '../../../app/globalSlice';
import { toast } from 'react-hot-toast';
import {useLoginUserMutation} from "../authApi";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const redirectPath = useSelector((state) => state.global.redirectPath);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [loginUser, { isLoading }] = useLoginUserMutation();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await loginUser(credentials).unwrap();
            if (result) {
                localStorage.setItem("authToken", result?.data?.access_token);
                dispatch(clearRedirectPath());
                navigate(redirectPath);
            } else {
                toast("Login failed. Please check your credentials.", "error");
            }
        } catch (error) {

        }
    };

    return (
        <Row className='m-0'>
            <Col lg={6} className='p-0'>
                <div className='login_wrapper d-flex justify-content-center align-items-center min-vh-100'>
                    <div className='login_form'>
                        <img src={LogoImage} alt="logo" className='img-fluid' />
                        <h1>Login</h1>
                        <p className='pt-1'>See what is going on with your <span className='hightlight'>business</span></p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 cmn_input">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="example@gmail.com"
                                    name="email"  // Changed to "email" to match state
                                    value={credentials.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 cmn_input">
                                <Form.Label>Password</Form.Label>
                                <div className='position-relative'>
                                    <Form.Control
                                        type={showPassword? "text": "password"}
                                        placeholder="************"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                    />
                                    <span className='view_pass' onClick={() => setShowPassword(!showPassword)}>
                                        <img src={showPassword ? ViewPassword : HidePassword} alt="eye" />
                                    </span>
                                </div>
                            </Form.Group>
                            <Button
                                label={isLoading? "Logging in...": "Login"}
                                size='medium'
                                className="w-100"
                                type="submit"

                            />
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

export default Login;