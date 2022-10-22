import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GetAllWishesList } from '../../Actions/BuyA'
import { GetCookie } from '../../Helpers/Coookies'
import { GetLocalStorage } from '../../Helpers/LocalStorage'

const WishListPage = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const { WishList } = useSelector((state) => state.WishListReducer)
    useEffect(() => {
        if (!GetCookie('checkToken')) {
            Navigate('/');
        }
        else if (GetCookie('checkToken') && GetLocalStorage("User").User !== 'Student') {
            Navigate('/');
        }
    }, [Navigate])
    useEffect(() => {
        dispatch(GetAllWishesList());
    }, [dispatch])

    return (
        <div>{WishList?.map((value) => {

            return (<h2 key={value.WishId}>
                {value.ProductName}
            </h2>
            )
        })}</div>
    )
}

export default WishListPage