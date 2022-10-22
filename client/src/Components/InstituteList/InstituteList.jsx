import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { GetAllInstitutes } from '../../Actions/ListA';
import './InstituteList.css'
const InstituteList = () => {
    const { Institutes } = useSelector((state) => state.ListReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAllInstitutes());
    }, [dispatch])
    return (
        <div>
            <h2>  Institutes List</h2>
            <div className='AllInstitutesContainer'>
                {Institutes?.map((value) => {
                    return (
                        <Link key={value.UserId} to={`/admin/institute/${value.UserId}`} className="InstituteContainer">
                            <h2>{value.InstituteName}</h2>
                            <h3>Location: <span className='bold'>{value.InstituteLocation}</span></h3>
                            <h3>Status: <span className='bold'>{value.InstituteStatus}</span></h3>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default InstituteList