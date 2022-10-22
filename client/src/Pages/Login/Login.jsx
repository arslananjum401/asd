import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser } from '../../Actions/UserA.js';
import './Login.css';
import LoginWithGoogle from './LoginWithGoogle.js';
import LoginWithFacebook from './LoginWithFacebook.js';
import GoogleRecaptcha from '../../Components/GoogleRecaptcha/GoogleRecaptcha.jsx';


const Login = () => {
    const location = useLocation()
    const Navigate = useNavigate()
    const dispatch = useDispatch();
    const [IpAddress, setIpAddress] = useState();
    const [Login, setLogin] = useState({});
    const [PrePageURL, setPrePageURL] = useState({
        url: "",
        check: false
    })


    const { isAuthenticated, error, loading } = useSelector((state) => state.UserReducer);

    const SubmitStudentLogin = async (e) => {

        e.preventDefault();

        window.grecaptcha?.ready(function () {
            window.grecaptcha.execute(process.env.REACT_APP_GOOGLE_CAPTCHA_KEY).then(function (token) {
                Login.Token = token;
                Login.IpAddress=IpAddress;
                dispatch(LoginUser(Login));
            });
        });

    }

    useEffect(() => {
        window?.getIPs().then(res => { setIpAddress(res[0]) })

    }, [])
    useEffect(() => {
        if (location?.state?.path !== undefined && location?.state?.path !== '/login') {
            console.log("url")
            setPrePageURL({ url: location?.state?.path, check: true })
        }
    }, [location])


    useEffect(() => {
        if (isAuthenticated && PrePageURL?.check === false) {
            Navigate('/')
        }
        else if (isAuthenticated && PrePageURL?.check === true) {
            Navigate(`${PrePageURL.url}`)
        }
    }, [isAuthenticated, Navigate, PrePageURL])

    return (
        !loading ?
            <>
                <div>
                    <form
                        onSubmit={SubmitStudentLogin}
                        className='LoginForm'>
                        <span className='errorSpan'>{error ? error : null}</span>
                        <input
                            type="email"
                            placeholder="E-mail"
                            required
                            onChange={(e) => { setLogin({ ...Login, Email: e.target.value }) }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            onChange={(e) => { setLogin({ ...Login, Password: e.target.value }) }}
                        />
                        <button className='FormBtn' action="submit">Login</button>
                        <Link to={'/signup'} className='SignupLogBtn'>New here? <span> Then Signup</span></Link>
                        <Link to={'/forgot/password'} className='SignupLogBtn'><span>Forgot Password?</span></Link>

                        <LoginWithGoogle />
                        <LoginWithFacebook />
                        <GoogleRecaptcha />
                    </form>


                </div>
            </>
            : <h1>Loading</h1>
    )
}


export default Login