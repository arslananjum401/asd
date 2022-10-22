
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
// import FacebookLogin from 'react-facebook-login'
import { LoginWithFacebookAction } from '../../Actions/UserA';

const LoginWithFacebook = () => {
    const dispatch = useDispatch();
    // const Ref
    const [Root, setRoot] = useState();
    const [LoginButton, setLoginButton] = useState();
    useEffect(() => {
        function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
            console.log('statusChangeCallback');
            console.log(response);                   // The current login status of the person.
            if (response.status === 'connected') {   // Logged into your webpage and Facebook.
                console.log("Facebook Connected")
            } else {
                if (document.getElementById('status'))
                    document.getElementById('status').innerHTML = 'Please log ' +
                        'into this webpage.'; // Not logged into your webpage or we are unable to tell.


            }

            
        }

        if (Root && LoginButton) {
            console.log("hrrer")
            window.fbAsyncInit = function () {
                window.FB.init({
                    appId: '1812012189152980',
                    cookie: true,
                    xfbml: true,
                    version: 'v15.0'
                });



            };
            window.fbAsyncInit()
            if (window?.FB) {
                window?.FB.login(function (response) {
                    console.log(response)
                });
                console.log("here")
            }
            // window.fbAsyncInit();

        }
    }, [Root, LoginButton])

    return (
        <>

            <div id="fb-root" ref={(e) => { setRoot(e) }}></div>


            <div className="fb-login-button" data-size="large" data-button-type="continue_with" data-layout="default"
                data-auto-logout-link="false" data-use-continue-as="true" data-width=""
                ref={(e) => { setLoginButton(e) }}
            ></div>
  

        </>
    )
}

export default LoginWithFacebook

