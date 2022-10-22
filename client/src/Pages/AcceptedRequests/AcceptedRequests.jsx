import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AcceptedInstituteRequests, GetUser, InstituteRequests } from '../../Actions/UserA';
import AcceptedReqs from '../../Components/AcceptedReqs/AcceptedReqs';
import { GetCookie } from '../../Helpers/Coookies';
import { DeleteLocalStorage, GetLocalStorage } from '../../Helpers/LocalStorage';
import './AcceptedRequests.css'
const AcceptedRequests = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const { AcceptedRequests } = useSelector((state) => state.AdminReducer)
    useEffect(() => {
        if (!GetCookie("checkToken")) {
            DeleteLocalStorage('User');
            Navigate('/');
        }
        if (GetCookie("checkToken") && GetLocalStorage("User").User === 'Admin') {
            dispatch(GetUser('/' + GetLocalStorage("User").User))
            dispatch(InstituteRequests());
            dispatch(AcceptedInstituteRequests());

        } else {
            Navigate('/')
        }

    }, [dispatch, Navigate])


    const [AcceptedInsReqs, setAcceptedInsReqs] = useState(AcceptedRequests);
    useEffect(() => {
        setAcceptedInsReqs(AcceptedRequests);
    }, [AcceptedRequests])
    return (
        <>
            <div className='AccepReqContainer'>
                {AcceptedInsReqs?.length > 0
                    ?
                    <div className='AcceptedReqContainer'>
                        <span> <h2>User Name </h2></span>
                        <span> <h2>Institute Name </h2></span>
                        <span> <h2>Location </h2></span>
                        <span> <h2>Document</h2></span>
                        <span> <h2>Application Status </h2></span>
                        <span> <h2>Institute Status </h2></span>
                    </div>

                    : <h2 style={{ margin: '20px 0px', color: "mediumseagreen" }}>No Request is accepted yet</h2>
                }
            </div>

            
            <div className="AllRequestsContainer">
                {

                    AcceptedInsReqs?.map((value) => {
                        return (
                            <AcceptedReqs
                                key={value.UserId}
                                UserName={value.UserName}
                                InstituteName={value.InstituteName}
                                InstituteLocation={value.InstituteLocation}
                                DocumentFile={value.DocumentFile}
                                InstituteStatus={value.InstituteStatus}
                                ApplicationStatus={value.ApplicationStatus}
                            />
                        )
                    })}
            </div>


        </>
    )
}

export default AcceptedRequests