import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { GetAllInstructors } from '../../Actions/InstructorA';
import { GetUser } from '../../Actions/UserA';
import { GetLocalStorage } from '../../Helpers/LocalStorage';
import './AllInstructors.css'
const AllInstructors = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { Instructors } = useSelector((state) => state.InstructorReducer)

    useEffect(() => {
        if (GetLocalStorage("User").User === 'Institute') {

            dispatch(GetUser('/' + GetLocalStorage("User").User))
            dispatch(GetAllInstructors())
        } else {
            Navigate('/')
        }

    }, [dispatch, Navigate])

    return (
        <div className='AllInstructors'>
            <h1>Instructors</h1>

            <div className='MAllInstructors'>
                {
                    Instructors && Instructors?.map((value) => {
                        return (
                            <Link
                                className='SingleContainer' to={`/institute/instructor/${value.InstructorPK}`} key={value.InstructorPK}>

                                <div className={`headingContainer`}>
                                    <span>Name </span>
                                    <span>Location </span>
                                </div>
                                <div className={`ValueContainer`}>
                                    <span>{value.Name} </span>
                                    <span>{value.Location} </span>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default AllInstructors