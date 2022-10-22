import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { GetCart } from '../../Actions/BuyA';
import './ViewCart.css'
const ViewCart = () => {
    const { ProductsInCart } = useSelector(state => state.UserReducer);

    const [TotalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetCart())
    }, [dispatch])


    useEffect(() => {
        if (TotalPrice === 0) {
            let total = 0
            ProductsInCart?.forEach((value, Index) => {
                total = total + Number(value.Price)
                if (ProductsInCart.length - 1 === Index) {
                    setTotalPrice(total)
                }
            })
        }
    }, [ProductsInCart, TotalPrice])
    return (
        <div className='Cart'>
            <div className='Cart'>
                <div className='CartHedaer CartContainer'>
                    <h3>Product</h3>
                    <h3>Price</h3>
                </div>
                {ProductsInCart?.map((value, index) => {
                    return (<div className='CartData CartContainer'>
                        <h4>{value.ProductName}</h4>
                        <h4>{value.Price}</h4>
                    </div>)
                })}

                <div className='CartData CartContainer'>
                    <h4>Total Price</h4>
                    <h4>{TotalPrice}</h4>
                </div>
            </div>

            <Link to='/checkout'>
                Checkout
            </Link>

        </div>
    )
}

export default ViewCart