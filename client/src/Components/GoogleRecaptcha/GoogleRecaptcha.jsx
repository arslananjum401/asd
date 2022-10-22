import { useEffect } from 'react';

const GoogleRecaptcha = () => {

    useEffect(() => {
        const script = document.createElement("script")
        script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_GOOGLE_CAPTCHA_KEY}`
        document.body.appendChild(script)
    }, [])

}

export default GoogleRecaptcha