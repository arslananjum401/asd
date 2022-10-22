import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { setSocketA } from '../../Actions/SocketA';
import { EmptyLogout, GetAllCourses, GetInstituteOnReqRes, GetUser, InstituteRequests, LogOutUser } from '../../Actions/UserA';
import { NotificationsNoneOutlined } from '@mui/icons-material';
import { GetCookie } from '../../Helpers/Coookies';
import { DeleteLocalStorage, GetLocalStorage } from '../../Helpers/LocalStorage';
import Categories from '../Categories';
import './Header.css';
import { Typography } from '@mui/material';


const Header = ({ Socket, setSocket, setHeight }) => {
    const { User: SelectedUser, Notifications: ServerNotifications, Message } = useSelector((state) => state.UserReducer);
    const { Request } = useSelector((state) => state.AdminReducer)
    const SocketR = useSelector((state) => state.SocketReducer);
    const [Notifications, setNotifications] = useState([]);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [User, setUser] = useState(SelectedUser);
    useEffect(() => {
        if (!GetCookie('checkToken')) {
            DeleteLocalStorage("User")
        }
        else if (GetCookie('checkToken')) {
            dispatch(GetUser())
        }
    }, [dispatch])
    useEffect(() => {


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, SocketR, User])

    // Updating notifications State
    useEffect(() => {
        if (User?.User === 'Admin' && Request) {
            const a = ServerNotifications?.filter((value) => {
                const checkVal = Request?.find((element) => {

                    return element.InstituteUserId === value.FromUserId
                })
                return value.Message === 'A request for a new Institute' && value.MarkAsRead === false && checkVal
            })

            setNotifications(a);
        }
    }, [ServerNotifications, User, Request])


    useEffect(() => {
        if (User?.User === 'Admin') {
            Socket?.on('NotifyRequests', (data) => {
                dispatch(GetUser())
            })
        }
    }, [Socket, User, dispatch])

    useEffect(() => {
        setUser(SelectedUser)
    }, [SelectedUser])


    const logoutUser = () => {
        setUser(undefined);
        dispatch(LogOutUser()).then(() => {
            dispatch(GetAllCourses('/' + GetLocalStorage("User")?.User));
            DeleteLocalStorage("User")
        }).then(() => {
            Navigate('/', { state: { funct: dispatch(EmptyLogout()) } })
        })
    }

    useEffect(() => {
        setSocket(io('http://localhost:9000'));
    }, [setSocket])
    useEffect(() => {

        if (User && SocketR?.join === false) {
            Socket?.emit('SaveUser', { UserId: User?.UserId, UserType: User?.User })
            dispatch(setSocketA())
        }

    }, [User, SocketR, dispatch, Socket])

    const styles = {
        typography: {
            color: "white",
            fontSize: 13,
            position: "absolute",
            top: "1.2%",
            left: "2%"
        }
    };
    // console.log(User)
    useEffect(() => {

        if (User?.User === 'Admin') {

            Socket?.on('MarkNotificationRes', () => {
                dispatch(GetUser())
            })

            Socket?.on('NotifyRequests', () => {
                dispatch(InstituteRequests());
            })
        }
    }, [Socket, dispatch, User])


    useEffect(() => {
        if (User?.User === 'Institute') {
            Socket?.on('NotifyInstituteFReq', (InstituteData) => {
                dispatch(GetInstituteOnReqRes(InstituteData))
            })

        }
    }, [User, Socket, dispatch])
    var offsetHeight = document?.getElementById('Header')?.offsetHeight;

    useEffect(() => {
        setHeight(offsetHeight);
    }, [offsetHeight, setHeight])


    return (

        <header id='Header'>

            <div className='UpperHeader' >
                <Link to="/" style={{ backgroundColor: "rgb(93 187 93 / 0%)" }}>
                    <h2>Vehicle learning Institute</h2>
                </Link>

                {
                    User ?
                        <nav className='nav'>
                            {User.User === 'Institute'
                                ? User.ApplicationStatus === 'Accepted' &&
                                    User.InstituteStatus === 'Working'

                                    //Institute Request accepted
                                    ? <>
                                        <Link to="/course/create" className='NavButton'>
                                            Create a new Course
                                        </Link>
                                        <Link to="/institute/instructor/create" className='NavButton'>
                                            Add a Instructor
                                        </Link>
                                        <Link to="/institute/instructors" className='NavButton'>
                                            All Instructor
                                        </Link>
                                    </>

                                    //Institute Request not accepted yet
                                    : <h1>{Message ? Message : "Your Application is under review"}</h1>

                                //Admin Portion
                                : User.User === 'Admin'
                                    ?
                                    <>
                                        <Link to="/admin/requests" className='NavButton'>

                                            {/* <svg height="25" width="25" className='NotificationIcon' >
                                                <circle cx="12" cy="11" r="9" stroke="black" stroke-width="2" fill='#00000000'/>
                                            </svg> */}
                                            <Typography style={styles.typography}>2</Typography>
                                            <NotificationsNoneOutlined className='NotificationIcon' />
                                            Institute Requests
                                            {Notifications?.length > 0 && <h1>{Notifications.length}</h1>}
                                        </Link>
                                        <Link to="/admin/request/accepted" className='NavButton'>
                                            Accepted Requests
                                        </Link>
                                        <Link to="/admin/category/create" className='NavButton'>
                                            Create Category
                                        </Link>
                                        <Link to="/admin/categories" className='NavButton'>
                                            All Categories
                                        </Link>

                                    </>
                                    : User?.User === 'Student'

                                        ? <>
                                            <Link to="/wishList" className='NavButton'>
                                                Wish List
                                            </Link>
                                        </>
                                        : null
                            }
                        </nav>
                        : null
                }
                <div className="HeaderLeft">
                    {User ?
                        <>
                            <h2>{User.UserName}</h2>
                            <button onClick={logoutUser}>
                                <h3>LogOut</h3>
                            </button>
                        </>
                        : <div className='LogSignBtns'>
                            <Link to='/login'>
                                <h3>Login</h3>
                            </Link>
                            <Link to='/signup'>
                                <h3>Signup</h3>
                            </Link>
                        </div>
                    }
                </div>
            </div>



            <div className='LowerHeader'>
                <Categories />
            </div>
        </header>
    )
}

export default Header