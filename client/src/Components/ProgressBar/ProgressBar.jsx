import React, { useEffect, useState } from 'react'
import './ProgressBar.css'
const ProgressBar = ({ progress }) => {
    const [Animation, setAnimation] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setAnimation(true)
        }, 500)
    }, [])

    return (
        <div className='container'>
            
            <div className='Bar' style={Animation ? { width: `${progress}%` } : null} ></div>
        </div>
    )
}

export default ProgressBar