import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { GetUser, InstituteRequests, RegisterInstituteAction, } from '../../Actions/UserA';
import './SignUp.css'
import { GetCookie } from '../../Helpers/Coookies';
import { DeleteLocalStorage, GetLocalStorage } from '../../Helpers/LocalStorage';
import { io } from 'socket.io-client'


const RegisterInstitute = () => {
    const Navigate = useNavigate()

    const { Request } = useSelector((state) => state.AdminReducer)
    const { User: SelectedUser, Notifications: ReducedNotifications, SUser:SignedUpUser } = useSelector((state) => state.UserReducer);
    let { error, loading } = useSelector((state) => state.UserReducer)

    const [Notifications, setNotifications] = useState(ReducedNotifications);
    const [Signup, setSignup] = useState({});
    const [User, setUser] = useState(SelectedUser);


    const [ValidationError, setValidationError] = useState(error);
    const [DocumentFile, setDocumentFile] = useState()
    const [Socket, setSocket] = useState();
    const dispatch = useDispatch();
    const [FileName, setFileName] = useState(false)


    const SubmitStudentLogin = async (e) => {
        e.preventDefault();
        const SendFile = new FormData();
        SendFile.append('Signup', JSON.stringify(Signup));
        SendFile.append('Document', DocumentFile)

        dispatch(RegisterInstituteAction(SendFile, "/Institute"))
            .then(() => {
                // if (!ValidationError && !loading) {
                //     Socket.emit('InsituteRequest',
                //         {
                //             FromUserName: Signup.UserName,
                //             FromUserType: 'Institute'
                //         })
                //     // Navigate('/')
                // } else {
                //     console.log("failed")
                // }
            })
    }
    useEffect(() => {
        if (!ValidationError && !loading && SelectedUser?.InstituteId !== undefined) {

            Socket?.emit('InsituteRequest',
                {
                    FromUserType: 'Institute',
                    FromUserId: SelectedUser?.UserId
                })
            Navigate('/')
        }
    }, [ValidationError,Navigate, loading, SignedUpUser, Socket, SelectedUser])

    useEffect(() => {
        setSocket(io('http://localhost:9000'))
        if (User?.User === 'Admin') {
            dispatch(InstituteRequests());
            Socket?.emit('SaveUser', { UserName: User?.UserName, UserType: User?.User })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [User, dispatch])


    useEffect(() => {
        setValidationError(error);
    }, [error])
    useEffect(() => {
        if (!GetCookie("checkToken")) {
            DeleteLocalStorage('User');
        }

        else if (GetCookie("checkToken")) {
            if (GetLocalStorage("User").User === 'Institute') {
                Navigate('/')

            } else {
                dispatch(GetUser('/' + GetLocalStorage("User").User))
            }
        }

    }, [dispatch, Navigate])




    useEffect(() => {
        if (GetCookie('checkToken')) {
            dispatch(GetUser("/" + GetLocalStorage("User").User))
        }

    }, [dispatch,])





    useEffect(() => {
        setUser(SelectedUser)
    }, [SelectedUser])

    useEffect(() => {
        if (User?.User === 'Admin' && Request) {
            const a = ReducedNotifications?.filter((value) => {
                let checkVal = false;

                Request.forEach((element) => {
                    if (element.UserName === value.FromUserName) {
                        checkVal = true;
                    } else checkVal = false;
                });
                return value.Message === 'A request for a new Institute' && value.MarkAsRead === false && checkVal
            })
            setNotifications(a);
        }

    }, [ReducedNotifications, User, Request])
    useEffect(() => {
        if (User?.User === 'Admin') {

            Socket?.on('MarkNotificationRes', () => {
                dispatch(GetUser("/" + GetLocalStorage("User")?.User))
            })
            Socket?.on('NotifyRequests', () => {
                dispatch(InstituteRequests());
            })
        }
    }, [Socket, dispatch, User])

    return (
        <>
          
            {!loading
                ? <form onSubmit={SubmitStudentLogin} className='SignupForm'>


                    <span className='errorSpan'>{ValidationError ? ValidationError.UserNameMsg : null} </span>
                    <input
                        type="text"
                        placeholder="Username"
                        required
                        onChange={(e) => {
                            setValidationError('');
                            setSignup({ ...Signup, UserName: e.target.value })
                        }}
                    />



                    <span className='errorSpan'>{ValidationError ? ValidationError.EmailMsg : null} </span>
                    <input
                        type="email"
                        placeholder="E-mail"
                        required
                        onChange={(e) => {
                            setValidationError('');
                            setSignup({ ...Signup, Email: e.target.value })
                        }}
                    />



                    <span className='errorSpan'>{ValidationError ? ValidationError.InstituteNameMsg : null} </span>
                    <input
                        type="text"
                        placeholder="Institute Name"
                        required
                        onChange={(e) => {
                            setValidationError('');
                            setSignup({ ...Signup, InstituteName: e.target.value })
                        }}
                    />


                    <input
                        type="text"
                        placeholder="Institute Location"
                        required
                        onChange={(e) => { setSignup({ ...Signup, InstituteLocation: e.target.value }) }}
                    />
                    <div className='FileContainer'>
                        <label htmlFor="file">Attach a Detailed PDF document of your <br />Institute</label>
                        <label htmlFor='file' >
                            <span className="FileSelector">
                                Select File
                            </span>

                            {FileName}
                            <input
                                name='file'
                                type="file"
                                id='file'
                                accept='.pdf'
                                placeholder="Institute Document"
                                required
                                onChange={
                                    (e) => {
                                        setFileName(e.target.files[0].name)
                                        setDocumentFile(e.target.files[0])
                                    }
                                }
                            />
                        </label>

                    </div>
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        onChange={(e) => { setSignup({ ...Signup, Password: e.target.value }) }}
                    />
                    <button action="submit" >Sign Up</button>
                </form>
                : <h1>loading</h1>}
        </>
    )
}

export default RegisterInstitute