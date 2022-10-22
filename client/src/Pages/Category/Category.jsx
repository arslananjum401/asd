import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetAllCategories,  } from '../../Actions/UserA';
import { GetCookie } from '../../Helpers/Coookies';
import { DeleteLocalStorage, GetLocalStorage } from '../../Helpers/LocalStorage';
import './Category.css';

const Category = () => {
    const [NewCategory, setNewCategory] = useState('');
    const [ValidError, setValidError] = useState(false);
    const [ShowSuccess, setShowSuccess] = useState(false);
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    useEffect(() => {
        if (!GetCookie('checkToken')) {
            DeleteLocalStorage("User")
            Navigate('/')
        } else if (GetLocalStorage("User")?.User !== "Admin") {
            Navigate('/')
        }
    }, [dispatch, Navigate])
    const CreateCategory = async (e) => {
        e.preventDefault();

        if (NewCategory) {
            await axios.post('/admin/category/create',
                { CategoryName: NewCategory },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            ).then(() => {
                setNewCategory('')
            })
                .then(() => {
                    dispatch(GetAllCategories())
                    setShowSuccess(true)
                    setTimeout(() => {
                        setShowSuccess(false)
                    }, 2500)
                })
        } else {
            setValidError(true);
        }

    }
    return (
        <>
            <form action="" className='CategoryForm' onSubmit={CreateCategory}>
                <span style={{ color: "red" }}> {ValidError ? "please Enter a Category" : null}</span>
                <input type="text"
                    placeholder="Enter a new category"
                    value={NewCategory}
                    onChange={(e) => {
                        setValidError(false);
                        setNewCategory(e.target.value)
                    }}
                />

                <button type="submit"> Create a Category</button>
                <h3 > {ShowSuccess ? "Category Created" : null} </h3>
            </form>
        </>
    )
}

export default Category