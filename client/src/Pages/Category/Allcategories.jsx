import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetAllCategories } from '../../Actions/UserA';
import { GetCookie } from '../../Helpers/Coookies';
import { DeleteLocalStorage, GetLocalStorage } from '../../Helpers/LocalStorage';
import { Delete } from '@mui/icons-material';
import './Allcategories.css';
import axios from 'axios';
const Allcategories = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { Categories: GotCategorries } = useSelector((state) => state.CategoriesReducer);
    const [Categories, setCategories] = useState()
    useEffect(() => {
        if (!GetCookie('checkToken')) {
            DeleteLocalStorage("User")
            Navigate('/')
        } else if (GetLocalStorage("User")?.User !== "Admin") {
            Navigate('/')
        }
        dispatch(GetAllCategories())
    }, [dispatch, Navigate])

    useEffect(() => {
        setCategories(GotCategorries);
    }, [GotCategorries])

    const DelCategory = async (CategoryId) => {
         await axios.put('/admin/category/delete',{
            CategoryId
        },
        {
            headers: { 'Content-Type': 'application/json' }
        }
        ).then(()=>{
            dispatch(GetAllCategories())
        })
    }
    return (
        <>
            {Categories?.map((value) => {
                return (
                    <div key={value.CategoryId} className='CategoryContainer'>
                        <h3>{value.CategoryName}</h3>
                        <Delete className='DelIcon' onClick={() => { DelCategory(value.CategoryId) }} />
                    </div>
                )
            })}
        </>
    )
}

export default Allcategories