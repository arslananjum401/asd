import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { GetUser, InstituteRequests } from '../../Actions/UserA';
import InsRequests from '../../Components/InsRequests';
import { GetCookie } from '../../Helpers/Coookies.js'
import { GetLocalStorage, DeleteLocalStorage } from '../../Helpers/LocalStorage.js';
import { useNavigate } from 'react-router-dom';

const InstituteRequest = ({ Socket }) => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const { Request, loading: ReqLoading } = useSelector((state) => state.AdminReducer);
    const { Notifications, loading: Userloading } = useSelector((state) => state.UserReducer);

    const [RequestRes, setRequestRes] = useState();
    const [UnreadNotifications, setUnreadNotifications] = useState(Notifications);
    useEffect(() => {
        if (!GetCookie("checkToken")) {
            DeleteLocalStorage('User');
            Navigate('/');
        }
        if (GetCookie("checkToken") && GetLocalStorage("User").User === 'Admin') {
            dispatch(GetUser())
            dispatch(InstituteRequests());
        } else {
            Navigate('/')
        }

    }, [dispatch, Navigate, RequestRes])



    useEffect(() => {
        setUnreadNotifications(Notifications)

    }, [Notifications])

    



    return (
        !ReqLoading || !Userloading ?
            <>
                <div className="allRequestsContainer">
                    <h1>Institute Requests</h1>

                    {Request && Request?.length > 0
                        ? <div className='RequestContainer' style={{ border: 'none' }}>
                            <div className='TextContainer'>
                                <span> <h2>Institute Name </h2></span>
                                <span> <h2>Location </h2></span>
                                <span> <h2>Status </h2></span>
                                <span></span>
                            </div>
                            <div className='RequestIcons'>
                                <span>Accept </span>
                                <span>Reject </span>
                                <span>Read? </span>
                            </div>
                        </div>

                        : <h2 style={{ margin: '20px 0px', color: "mediumseagreen" }}>No Requests Found</h2>
                    }

                    {UnreadNotifications && Request
                        ? Request?.map((value) => {
                       
                            const Notifi = UnreadNotifications.filter((val) => {
                                return val.FromUserId===value.InstituteUserId
                            })
                            return (
                                <InsRequests
                                    Socket={Socket}
                                    NotificationsId={Notifi[0]?.NotificationId}
                                    MarkAsRead={Notifi[0]?.MarkAsRead}
                                    key={value.InstituteUserId}
                                    InstituteId={value.InstituteId}
                                    InstituteName={value.InstituteName}
                                    InstituteLocation={value.InstituteLocation}
                                    ApplicationStatus={value.ApplicationStatus}
                                    DocumentFile={value.DocumentFile}
                                    setRequestRes={setRequestRes}
                                />
                            )
                        })
                        : null
                    }
                </div>
            </>
            : <h1>Loading</h1>

    )
}

export default InstituteRequest