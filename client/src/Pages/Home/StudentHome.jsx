import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllCategories, GetAllCourses, GetUser } from '../../Actions/UserA';
import { GetLocalStorage } from '../../Helpers/LocalStorage';
import { cities } from './Cities.js';
import './StudentHome.css'
const StudentHome = ({ setShow, Show }) => {
    const dispatch = useDispatch();
    const [Course, setCourse] = useState({
        CourseLicenseType: "Category",
        City: "City"
    })
    const { Categories: GotCategorries } = useSelector((state) => state.CategoriesReducer);
    useEffect(() => {
        dispatch(GetAllCategories())
    }, [dispatch])

    const SubmitForm = async (e) => {
        e.preventDefault();
        console.log(Course)
        await axios.post('/me/Interest', Course);
        dispatch(GetUser());
        dispatch(GetAllCourses('/' + GetLocalStorage("User")?.User));
    }
    const Update = () => {
        setShow('hideStudentForm')
    }
    return (
        <>
            <form className={`StudentForm ${Show}`} onSubmit={SubmitForm}>
                <div>
                    <label htmlFor="cars">Choose a Category:</label>
                    <select id="cars" name="cars" className='SelectOptions'
                        value={Course.CourseLicenseType}
                        onChange={(e) => { setCourse({ ...Course, CourseLicenseType: e.target.value }) }}
                    >
                        <option value="Category" disabled defaultValue>Select Category</option>
                        {GotCategorries?.map((value) => {
                            return (
                                <option value={value.LicenseTypeId} key={value.LicenseTypeId+1}>{value.LicenseTypeName}</option>
                            )
                        })}

                    </select>
                </div>
                <div>
                    <label htmlFor="cars">Select your City:</label>
                    <select id="cars" name="cars"
                        className='SelectOptions'
                        value={Course.City}
                        onChange={(e) => { setCourse({ ...Course, City: e.target.value }) }}
                    >
                        <option value="City" disabled defaultValue>Select City</option>
                        {cities?.map((value) => {
                            return (
                                <option value={value} key={value}>{value}</option>
                            )
                        })}
                    </select>
                </div>
                <button className='FormBtn' action='submit' onClick={Update}>Done</button>
            </form>
        </>
    )
}

export default StudentHome