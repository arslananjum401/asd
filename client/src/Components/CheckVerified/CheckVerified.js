import axios from 'axios';
import React, { useState } from 'react'
import { GetLocalStorage } from '../../Helpers/LocalStorage';
import './CheckVerified.css';
const CheckVerified = () => {
    const [ResMessage, setResMessage] = useState();
    const RequestEmail = async () => {
        const { data } = await axios.post('/common/request/verify-email', GetLocalStorage("User"))

        setResMessage(data);
    }
    // flex justify-start flex-col p-2.5 relative left-2/4 top-2/4 
    return (
        <div className='CheckVerifiedContainer'>
            <h3>Please Verify Your Email</h3>
            <div className='CheckVerified'>
                <p>To verify your E-mail address click on the verification link in the email you received from Vehicle Learning School.
                </p>
                <p>Did not Received the email? Click on the button below.</p>
                <span className='CheckVerifiedBtn'>

                    <button onClick={RequestEmail}>Request Verification Email</button>
                </span>
                <h4>{ResMessage?.message}</h4>
            </div>
        </div>
    )
}

export default CheckVerified