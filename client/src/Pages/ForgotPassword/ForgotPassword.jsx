import React from 'react'
import { useState } from 'react'
import { SendForgotPasswordreq } from '../../Actions/ForgotPasswordA';
import { useDispatch, useSelector } from 'react-redux'
import './ForgotPassword.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const ForgotPassword = () => {
    const Navigate = useNavigate();
    const { message, error: ForgotPassError } = useSelector((state) => state.ForgotPasswordReducer);
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const [Email, setEmail] = useState('');
    const SubmitForm = (e) => {
        e.preventDefault()
        setError('')
        dispatch(SendForgotPasswordreq({ Email}));
        setEmail('')
    }
    useEffect(() => {
        if (message?.success === true) {
            setError('');
        }
        if (ForgotPassError?.success === false) {
            setError(ForgotPassError);
        }
    }, [ForgotPassError, message])
    const CancelForgotPassword = () => {
     
        Navigate(`/login/`)
    }
    return (
        
            <div className='ForgotContainer'>
                <form className='ForgotPasswordForm' onSubmit={SubmitForm}>
                    <h2>Find Your Account</h2>
                    <div className='ForgotInputContainer'>
                        <p>Please enter your email address to search for your account.</p>
                        <input type="email" placeholder='Email address'
                            value={Email}
                            required
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div className='ForgotPasswordBtns'>
                        <button className='Cancel' onClick={CancelForgotPassword}>
                            Cancel
                        </button>
                        <button type="submit" className='Submit' >
                            Send
                        </button>
                    </div>
                </form>
                <span style={error?.success === false ? { color: "red" } : null}>
                    {message?.success === true ? message.message : null}
                    {error?.success === false ? error?.message : null}
                </span>
            </div>
    )
}

export default ForgotPassword