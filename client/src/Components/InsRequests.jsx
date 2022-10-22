import { Cancel, DoneAll, MarkAsUnread, Markunread } from '@mui/icons-material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { GetUser, InstituteRequests } from '../Actions/UserA'
import { GetLocalStorage } from '../Helpers/LocalStorage';
import './InstituteRequest.css'
// import { InstituteRequests } from '../Actions/UserA';
// import { useDispatch } from 'react-redux';
const InsRequests = ({ InstituteId, InstituteName, InstituteLocation, ApplicationStatus, DocumentFile, NotificationsId, MarkAsRead, setRequestRes, Socket, }) => {
    const dispatch = useDispatch();
    const [Read, setRead] = useState(MarkAsRead);

    const MarkNotification = (Message) => {
        Socket?.emit('MarkNotification', { UserName: GetLocalStorage("User").UserName, NotificationsId, Message: Message });
    }
    const RejectRequest = async (InstituteId) => {
        const { data } = await axios.put('/admin/InstitutesRequest/res',
            {
                ApplicationStatus: "Rejected",
                InstituteId: InstituteId,
                NotificationsId
            },
            {
                headers: { "Content-Type": "application/json" }
            })
        setRequestRes(data)

        dispatch(InstituteRequests())
        dispatch(GetUser());

        Socket?.emit('MarkNotification', { UserName: GetLocalStorage("User").UserName, NotificationsId, Message: true, Checked: true });
    }
    const AcceptRequest = async (InstituteId) => {
        const { data } = await axios.put('/admin/InstitutesRequest/res', {
            ApplicationStatus: "Accepted",
            InstituteId: InstituteId,
            NotificationsId
        }, {
            headers: { "Content-Type": "application/json" }
        }
        )
        setRequestRes(data)
        dispatch(InstituteRequests());
        dispatch(GetUser('/' + GetLocalStorage("User").User))
        Socket?.emit('MarkNotification', { UserName: GetLocalStorage("User").UserName, NotificationsId, Message: true, Checked: true });
    }

    useEffect(() => {
        setRead(MarkAsRead)
    }, [MarkAsRead])


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
        <>
            <div key={InstituteId} className={`RequestContainer RequestConReqs  
            ${Read === false ? 'MarkRead' : null}`
            }>

                <div className='TextContainer'>
                    <h3>{InstituteName} </h3>
                    <h3>{InstituteLocation}</h3>
                    <h3>{ApplicationStatus} </h3>


                    <button onClick={() => {
                        setRead(true)
                        MarkNotification(true)
                        DownloadDocument()
                    }}>Download Document</button>
                </div>
                <div className='RequestIcons'>
                    <span className='Icon'>
                        <DoneAll onClick={() => { AcceptRequest(InstituteId) }} />
                    </span>
                    <span className='Icon'>
                        <Cancel onClick={() => { RejectRequest(InstituteId) }} />
                    </span>
                    <span className='Icon'>
                        {Read
                            ? <MarkAsUnread onClick={() => {
                                MarkNotification(!Read)
                                setRead(!Read)
                            }} />

                            : <Markunread onClick={() => {
                                MarkNotification(!Read)
                                setRead(!Read)
                            }} />}
                    </span>
                </div>
            </div>
        </>
    )
}

export default InsRequests