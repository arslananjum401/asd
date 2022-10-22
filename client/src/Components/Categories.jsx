import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllCategories } from '../Actions/UserA';
import './Categories.css'
const Categories = () => {
    const { Categories: GotCategorries } = useSelector((state) => state.CategoriesReducer);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetAllCategories())
    }, [dispatch])

    return (
        <div className='Categories'>
            <h2>Categories</h2>
            <div className='CategoriesContainer'>
                {GotCategorries?.map((value) => {
                    return (
                        <h3 key={value.LicenseTypeId}>{value.LicenseTypeName} </h3>
                    )
                })}
            </div>
        </div>
    )
}

export default Categories