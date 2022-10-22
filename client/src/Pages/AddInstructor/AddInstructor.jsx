import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreateInstructors } from '../../Actions/InstructorA';
import { GetAllCourses, GetUser } from '../../Actions/UserA';
import { GetLocalStorage } from '../../Helpers/LocalStorage';
import './AddInstructor.css'
const AddInstructor = () => {
    const Navigate = useNavigate()
    const dispatch = useDispatch();
    const { Categories: GotCategorries } = useSelector((state) => state.CategoriesReducer);
    const { Success, error } = useSelector((state) => state.InstructorReducer);
    const { Courses: ReducedCourses, loading: CourseLoading } = useSelector((state) => state.CourseReducer);
    const [Courses, setCourses] = useState(ReducedCourses);
    const [Sent, setSent] = useState(false);
    const [VError, setVError] = useState();
    const [Instructor, setInstructor] = useState({
        Name: "",
        Vehicle: "",
        Category: "Category",
        Location: "",
        Time: "",
        ProductFK:"Course"
    });
    const SubmitInstructorForm = (e) => {
        e.preventDefault();
        let verrors;
        if (Instructor.ProductFK === 'Course' || Instructor.ProductFK === undefined || Instructor.ProductFK === '') {
            verrors.ProductFK = true;
        }
        if (Instructor.Category === 'Category' || Instructor.Category === undefined || Instructor.Category === '') {
            verrors.Category = true;
        }

        console.log("here")
        if (verrors) {
            console.log(verrors)
            setVError(verrors)
            return
        } 
            dispatch(CreateInstructors(Instructor));
            setSent(true);
        
    }

    useEffect(() => {
        setCourses(ReducedCourses);
    }, [ReducedCourses]);


    useEffect(() => {
        if (GetLocalStorage("User").User === 'Institute') {
            dispatch(GetAllCourses('/' + GetLocalStorage("User")?.User));
            dispatch(GetUser('/' + GetLocalStorage("User").User))
        } else {
            Navigate('/')
        }

    }, [dispatch, Navigate])
    // console.log(Success)
// console.log(Success === true,error === "" , Sent === true)
    useEffect(() => {
        if (Success === true && error === "" && Sent === true) {
            setSent(false);
            Navigate('/institute/instructors')
        }
    }, [Success, Navigate, error, Sent]);
    // console.log(Courses)
    return (
        !CourseLoading ?
            <form onSubmit={SubmitInstructorForm} className='InstructorForm'>

                <div className='InstructorContainer'>
                    <label htmlFor="InstructorName">Enter the name of Instructor</label>
                    <input type="text" id='InstructorName' placeholder='Instructor Name'
                        required
                        value={Instructor.Name}
                        onChange={(e) => { setInstructor({ ...Instructor, Name: e.target.value }) }}
                    />
                </div>
                <div className='InstructorContainer'>
                    <label htmlFor="InstructorName">Enter the name of Vehcile</label>
                    <input type="text" placeholder='Vehicle'
                        required
                        value={Instructor.Vehicle}
                        onChange={(e) => { setInstructor({ ...Instructor, Vehicle: e.target.value }) }}
                    />
                </div>


                <div className='InstructorContainer'>
                    <span style={{ color: 'red' }}>{VError?.Category ? "Please select a Category" : null} </span>
                    <label htmlFor="InstructorCategory">Enter the category of Instructor</label>
                    <select id="InstructorCategory"
                        required
                        value={Instructor.Category}
                        onChange={(e) => {
                            setVError({ ...VError, Category: false })
                            setInstructor({ ...Instructor, Category: e.target.value })
                        }}
                    >
                        <option value="Category" disabled defaultValue>Select a Category</option>
                        {GotCategorries?.map((value) => {
                            return <option key={value.CategoryName} value={value.CategoryName}>
                                {value.CategoryName}
                            </option>
                        })}
                    </select>
                </div>

                <div className='InstructorContainer'>
                    <span style={{ color: 'red' }}>{VError?.ProductFK ? "Please select a Course" : null} </span>
                    <label htmlFor="InstructorCourse">Enter the Course of Instructor</label>
                    <select id="InstructorCourse"
                        required
                        value={Instructor.ProductFK}
                        onChange={(e) => {
                            setVError({ ...VError, ProductFK: false })
                            setInstructor({ ...Instructor, ProductFK: e.target.value })
                        }}
                    >
                        {Courses?.length < 1
                            ? <option value="Course" disabled defaultValue>No Course Found</option>
                            : <>
                                <option value="Course" disabled defaultValue>Select a Course</option>
                                {
                                    Courses?.map((value) => {
                                        return <option key={value.ProductId} value={value.ProductId}>
                                            {value.ProductName}
                                        </option>
                                    })}
                            </>
                        }
                    </select>
                </div>


                <div className='InstructorContainer'>
                    <label htmlFor="InstructorName">Enter the Location</label>
                    <input type="text" placeholder='Location'
                        required
                        value={Instructor.Location}
                        onChange={(e) => { setInstructor({ ...Instructor, Location: e.target.value }) }}
                    />
                </div>
                <div className='InstructorContainer'>
                    <label htmlFor="InstructorName">Enter Time</label>
                    <input type="time"
                        value={Instructor.Time}
                        required
                        onChange={(e) => { setInstructor({ ...Instructor, Time: e.target.value }) }}
                    />
                </div>
                <button type="submit"> Create a Instructor</button>
            </form>
            : <h1>Loading</h1>
    )
}

export default AddInstructor