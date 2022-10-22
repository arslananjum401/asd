import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux';
import { CheckResetToken, ResetPasswordA } from '../../Actions/ForgotPasswordA';
import './ResetPassword.css'

const ResetPassword = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const { ResetToken } = useParams();
    const [Password, setPassword] = useState('');
    const [ChPassword, setChPassword] = useState('');

    const { loading, RPmessage, CTmessage, error } = useSelector((state) => state.ForgotPasswordReducer);
    const [PassError, setPassError] = useState();
    useEffect(() => {
        dispatch(CheckResetToken(ResetToken))
    }, [ResetToken, dispatch])
    const SubmitForm = (e) => {
        e.preventDefault()
        if (Password === ChPassword) {
            setPassword('')
            setChPassword('')
            dispatch(ResetPasswordA(ResetToken, Password));
        }
        else {
            setPassError(true)
        }
    }

    const NavigateToLogin = () => {
        setTimeout(() => {

            Navigate('/login')
        }, 1000)
    }

    //This will happen when req to reset password is send 
    useEffect(() => {
        if (RPmessage?.success === true && !PassError) {
            setTimeout(() => {
                NavigateToLogin()
            }, 5000)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [RPmessage, PassError, Navigate])



    //This will happen if token is expired
    useEffect(() => {
        if (error?.success === false) {
            setTimeout(() => {
                Navigate('/login')
            }, 200000)
        }

    }, [error, Navigate])

    //This will remove error message for Password!==ConfirmPassword
    useEffect(() => {
        if (PassError && (ChPassword === Password)) {
            setPassError(false)
        }
    }, [PassError, ChPassword, Password])
    return (
        !loading ?
            <div
                className='PassFormContainer'
            >
                {CTmessage?.success === true
                    ? <form
                        className='PassForm'
                        onSubmit={SubmitForm}
                    >
                        <h2>
                            Please Enter Your new Password
                        </h2>
                        <div className='InputPassContainer'>
                            <input type="password" placeholder='Password'
                                required
                                value={Password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            <input type="password" placeholder='Confirm Password'
                                value={ChPassword}
                                required
                                onChange={(e) => { setChPassword(e.target.value) }}
                            />
                        </div>
                        <span
                            className={` ${RPmessage?.success === true ? "RPMessageSpanReset" : null} ${PassError ? "error" : null} MessageSpanSize`}
                        >
                            {PassError ? "Password and Reset Password must be same" : null}
                            {RPmessage?.success === true && RPmessage?.message === "Password Changed Successfully"
                                ? RPmessage?.message
                                : null
                            }
                        </span>
                        <button type="submit">Change Password</button>
                    </form>
                    : <div>
                        <div>
                            <h2>{error?.message}</h2>
                        </div>
                    </div>
                }
            </div>
            : <h2>Loading</h2>
    )
}

export default ResetPassword