import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { SignUpUser } from '../../Actions/UserA';
import './SignUp.css'
import { GetLocalStorage } from '../../Helpers/LocalStorage';
import SignUpWithGoogle from './SignUpWithGoogle';
import SignUpWithFacebook from './SignUpWithFacebook';
const SignUp = () => {
    const [Signup, setSignup] = useState({});
    const Navigate = useNavigate()
    const { isAuthenticated, error } = useSelector((state) => state.UserReducer)
    const dispatch = useDispatch();
    const SubmitStudentLogin = (e) => {
        e.preventDefault();
        dispatch(SignUpUser(Signup))
            .then(() => {
                if (!error) {
                    Navigate('/login')
                }

            })
    }

    useEffect(() => {
        if (GetLocalStorage('User')) {
            Navigate('/')
        }
    }, [isAuthenticated, Navigate])

    return (
        <>
            <form onSubmit={SubmitStudentLogin} className='SignupForm'>
                <span className='errorSpan'>{error ? error : null} </span>
                <input
                    type="text"
                    placeholder="Username"
                    required
                    onChange={(e) => { setSignup({ ...Signup, UserName: e.target.value }) }}
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    required
                    onChange={(e) => { setSignup({ ...Signup, Email: e.target.value }) }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => { setSignup({ ...Signup, Password: e.target.value }) }}
                />
                <button className='SignFormBtn' action="submit">Sign Up</button>
                <SignUpWithGoogle />
                <SignUpWithFacebook/>
            </form>
        </>
    )
}

export default SignUp