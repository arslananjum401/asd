import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChangedInterest, EmptyLogout, GetAllCategories, GetAllCourses, InstituteRequests } from '../../Actions/UserA';
import { useNavigate } from 'react-router-dom';
import CourseBox from '../../Components/CourseBox.jsx';
import './Home.css'
import { DeleteLocalStorage, GetLocalStorage, } from '../../Helpers/LocalStorage.js'
import { GetCookie } from '../../Helpers/Coookies.js';
import StudentHome from './StudentHome';
import InstituteList from '../../Components/InstituteList/InstituteList';
import { GetAllWishesList } from '../../Actions/BuyA';
import CheckVerified from '../../Components/CheckVerified/CheckVerified';
import Loader from '../../Components/Loader/Loader';

const Home = ({ Height }) => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const { User: SelectedUser, loading, Interest } = useSelector((state) => state.UserReducer);
    const { Categories: GotCategories } = useSelector((state) => state.CategoriesReducer);
    const { Courses: ReducedCourses, loading: CourseLoading } = useSelector((state) => state.CourseReducer);

    const [Show, setShow] = useState('hideStudentForm');
    const [SelectedCategory, setSelectedCategory] = useState({
        CourseCategory: "Category"
    });
    const [User, setUser] = useState(SelectedUser);
    const [Courses, setCourses] = useState(ReducedCourses);
    //checking use login
    useEffect(() => {
        if (!GetCookie('checkToken')) {
            DeleteLocalStorage("User")
            dispatch(EmptyLogout());
        }

        dispatch(GetAllCourses('/' + GetLocalStorage("User")?.User));

    }, [dispatch, Navigate])
    // console.log(Courses)

    useEffect(() => {
        dispatch(GetAllCategories())
    }, [dispatch])
    useEffect(() => {
        if (GetLocalStorage("User")?.User === 'Student') {
            dispatch(GetAllWishesList());
        }
    }, [dispatch])

    useEffect(() => {
        if (Interest) {
            setSelectedCategory(Interest)
        }
    }, [Interest])

    useEffect(() => {

        if (!Interest?.StudentId) {

            if ((User?.User === "Student")) {
                setShow('')
            }

        }
        else {
            setShow('hideStudentForm');
        }
    }, [Interest, User])


    //getting user Data
    useEffect(() => {
        setUser(SelectedUser)
    }, [SelectedUser])

    useEffect(() => {
        if (User?.User === "Admin") {
            dispatch(InstituteRequests());
        }
    }, [User, dispatch])



    useEffect(() => {
        if (!GetCookie('checkToken')) {
            DeleteLocalStorage("User")
            setCourses(ReducedCourses);
        }
        else if (GetLocalStorage("User")?.User === 'Student') {

        } else if (GetLocalStorage("User")?.User !== 'Student') {
            setCourses(ReducedCourses);
        }
        if (SelectedCategory?.CourseCategory === "Category") {
            setCourses(ReducedCourses);

        } else {
            setCourses(ReducedCourses?.filter((value) => {
                return value.Category === SelectedCategory?.CourseCategory
            }));
        }

    }, [SelectedCategory, User, ReducedCourses])



    return (
        <>
            <div className='Container'></div>

            {!loading && !CourseLoading ?
                <div className='HomeContainer'
                    style={{ minHeight: `calc(100% - ${Height}px)` }}
                >
                    {GetLocalStorage("User")?.isVerified === false ||
                        GetLocalStorage("User")?.isVerified === null
                        ? <CheckVerified />
                        : <>
                            <div className='CourseMajorContainer'>
                                
                                <div>
                                    <h1>Courses</h1>
                                    {/* Change Course Category for Student */}
                                    {<select value={SelectedCategory?.CourseCategory}
                                        onChange={(e) => {

                                            setSelectedCategory({ ...SelectedCategory, CourseCategory: e.target.value })
                                            if (GetLocalStorage("User")?.User === 'Student' && e.target.value !== "Category")
                                                dispatch(ChangedInterest(e.target.value, SelectedCategory?.InterestId))
                                        }}
                                    >
                                        <option value="Category" defaultValue >All Categories</option>
                                        {GotCategories?.map((value, index) => {

                                            return (
                                                <option value={value.LicenseTypeId} key={value.LicenseTypeId}>{value.LicenseTypeName}</option>
                                            )
                                        })}
                                    </select>

                                    }
                                </div>
                                <input type="date" name="" id=""
                                    onChange={(e) => { console.log(e.target.value) }}
                                />
                                <div className='CoursesContainer'>

                                    {Courses && Courses.length > 0

                                        ? Courses?.map((value) => {
                                            return (
                                                <CourseBox
                                                    value={value}

                                                />
                                            )
                                        }
                                        )
                                        : <h1>No courses found</h1>
                                    }
                                </div>
                                {GetCookie('checkToken') && GetLocalStorage("User")?.User === 'Admin'
                                    ? <InstituteList />
                                    : null
                                }
                            </div>

                            <StudentHome setShow={setShow} Show={Show} />
                        </>}
                </div>
                : <Loader />
            }

        </>
    )
}

export default Home