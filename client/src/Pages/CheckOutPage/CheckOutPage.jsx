import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { GetCart } from '../../Actions/BuyA';
import Checkout from './Checkout'
import './CheckOutPage.css';
import GooglePay from './GooglePay'
const CheckOutPage = () => {
  const dispatch = useDispatch();
  const { ProductsInCart } = useSelector((state => state.UserReducer));
  const [TotalPrice, setTotalPrice] = useState()
  useEffect(() => {
    if (TotalPrice === 0) {
      let total = 0
      ProductsInCart?.forEach((value, Index) => {
        total = total + Number(value.Product.Price)
        if (ProductsInCart.length - 1 === Index) {
          setTotalPrice(total)
        }
      })
    }
  }, [ProductsInCart, TotalPrice])



  useEffect(() => {
    dispatch(GetCart())
  }, [dispatch])
  return (
    <div>
      {
        ProductsInCart?.map((value) => {
          return (
            <div key={value.AddToCartId}>
              <h3>Price: {value.Price}</h3>
              <h3>ProductName: {value.ProductName}</h3>
            </div>
          )
        })
      }
      {TotalPrice && "TotalPrice:" + TotalPrice}
      <GooglePay TotalPrice={TotalPrice}/>
      <Checkout TotalPrice={TotalPrice} ProductsInCart={ProductsInCart}/>
    </div>
  )
}

export default CheckOutPage