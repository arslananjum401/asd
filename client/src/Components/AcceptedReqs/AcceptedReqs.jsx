import axios from 'axios'
import React from 'react'
import './AcceptedReqs.css'
const AcceptedReqs = ({ UserName, InstituteName, InstituteLocation, DocumentFile, InstituteStatus, ApplicationStatus }) => {
    const DownloadDocument = async () => {

        await axios.post('/admin/download',
            {
                InstituteName,
                DocumentFile
            },
            {
                withCredentials: true,
                headers: { 'Content-Type': "application/json" }
            })

    }

    return (
        <div className='ReqContainer'>
            <div><h3>{UserName}</h3></div>
            <div><h3>{InstituteName}</h3></div>
            <div><h3>{InstituteLocation}</h3></div>
            <div>
                <button onClick={DownloadDocument} className='DownloadBtn'>Download Document</button>
            </div>
            <div><h3>{ApplicationStatus}</h3></div>
            <div><h3>{InstituteStatus}</h3></div>
        </div>
    )
}

export default AcceptedReqs