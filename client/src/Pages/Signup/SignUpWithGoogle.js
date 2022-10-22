import React, { useState, useEffect } from 'react';
import JwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { SignUpWithGoogleAction } from '../../Actions/UserA';



const SignUpWithGoogle = () => {
    const [Component, setComponent] = useState({});
    const dispatch = useDispatch();


    useEffect(() => {

        if (Component.id !== undefined && window?.google !== undefined) {

            function handleCredentialResponse(response) {
                const Decoded = JwtDecode(response.credential);
                dispatch(SignUpWithGoogleAction(Decoded))

            }
            function LoadButton() {
                window?.google?.accounts?.id.initialize({
                
                    client_id: "930835429220-57v4696c4vm8qrv033qq010t5jlsjp3a.apps.googleusercontent.com",
                    callback: handleCredentialResponse
                });
                window.google.accounts.id.renderButton(
                    document.getElementById(Component?.id),
                    { theme: "outline", size: "large" } // customization attributes
                );
                // window.google.accounts.id.prompt(); // also display the One Tap dialog
            }
            LoadButton()
        }

    }, [Component, dispatch])


    return (
        <>
            <div id="buttonDiv" ref={(e) => { setComponent(e) }}></div>
        </>
    )
}

export default SignUpWithGoogle
