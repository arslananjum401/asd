import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { GetInstitute } from '../../Actions/ListA';
import { GetCookie } from '../../Helpers/Coookies';
import { DeleteLocalStorage, GetLocalStorage } from '../../Helpers/LocalStorage';

const InstitutePage = () => {
    const { InstituteId } = useParams();
    const Navigate = useNavigate()
    const dispatch = useDispatch();
    const { Institute, loading } = useSelector((state) => state.ListReducer);
    useEffect(() => {
        dispatch(GetInstitute(InstituteId));
    }, [dispatch, InstituteId])
    useEffect(() => {
        if (!GetCookie('checkToken') && GetLocalStorage("User")) {
            DeleteLocalStorage('User')
            Navigate('/')
        }
        else if (!GetCookie('checkToken') || GetLocalStorage("User").User !== 'Admin') {
            Navigate('/')
        }
    }, [Navigate])
    return (
        !loading
            ? <>
                <div>{Institute?.UserId}</div>
                <div>{Institute?.UserId}</div>
            </>
            : <h1>loading</h1>
    )
}

export default InstitutePage