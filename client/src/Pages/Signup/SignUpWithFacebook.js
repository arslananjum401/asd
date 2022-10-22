
import React from 'react'
import { useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { SignUpWithFacebookAction } from '../../Actions/UserA';
import './SignUpWithFacebook.css';
const SignUpWithFacebook = () => {
    const dispatch = useDispatch();


    const responseFacebook = (response) => {
        if (response.status === "unknown") {
            return
        }
        dispatch(SignUpWithFacebookAction(response))
    }
    return (
        <>
            <span>
                <FacebookLogin
                    appId="1812012189152980"
                    autoLoad={false}
                    callback={responseFacebook}
                    render={renderProps => (
                        <span onClick={renderProps.onClick}>
                            <span style={{ transition: "opacity 0.5s ease 0s" }}>
                                <button type="button" className="kep-login-facebook metro">SignUp with Facebook
                                </button>
                            </span>
                        </span>
                    )}
                />
            </span>

        </>
    )
}



export default SignUpWithFacebook
