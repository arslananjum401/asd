import express from "express";
import { BuyProducts } from "../Controllers/Student Controllers/BuyControllers.js";
import { PayWithPaypal } from "../Controllers/Student Controllers/PaypalController.js";
import { ViewCourses } from "../Controllers/Student Controllers/StudentCoursesControllers.js";
import { GetWishlist, CreateWish, DeleteWish, EnrollCourse, GetEnrolledCourses, UnEnrollCourse, GetUnEnrolledCourses, AddInterest, ChangeInterest, RateCourse, GetSingleEnrolledCourse, AddToCart, GetFullCart, RemoveFromCart } from "../Controllers/StudentControllers.js";
import { AuthenticatedUser } from "../Middlewares/AuthenticateUser.js";
import { ConfirmPaymentIntent, CreateCustomer, CreatePaymentIntent } from "../Middlewares/StripePayment.js";

const Srouter = express.Router();

//Interest
Srouter
    .post('/me/Interest', AuthenticatedUser, AddInterest)
    .put('/me/Interest', AuthenticatedUser, ChangeInterest)
//WishList 
Srouter
    .post('/wishlist', AuthenticatedUser, CreateWish)
    .get('/wishlist', AuthenticatedUser, GetWishlist)
    .delete('/wishlist', AuthenticatedUser, DeleteWish)

//EnrollCourse
Srouter
    .post('/enrollCourse', AuthenticatedUser, EnrollCourse)
    .get('/enrollCourse', AuthenticatedUser, GetEnrolledCourses)
    .get('/enrollCourse/:CoursePK', AuthenticatedUser, GetSingleEnrolledCourse)
    .post('/Course/rating', AuthenticatedUser, RateCourse)
    .put('/enrollCourse', AuthenticatedUser, UnEnrollCourse)
    .get('/unenrollCourse', AuthenticatedUser, GetUnEnrolledCourses);

Srouter.get('/GetCourse/:ProductId', ViewCourses)
//Add to cart
Srouter
    .post('/addtocart/:ProductId', AuthenticatedUser, AddToCart)
    .delete('/cart/:ProductId', AuthenticatedUser, RemoveFromCart)
    .get('/cart', AuthenticatedUser, GetFullCart)

//Buy Product
Srouter.post('/buy', AuthenticatedUser,PayWithPaypal)


// .post('/paymentIntent/create', AuthenticatedUser, CreateCustomer, CreatePaymentIntent)
// .post('/Customer/create', AuthenticatedUser, CreateCustomer)
// .post('/paymentIntent/confirm', AuthenticatedUser, ConfirmPaymentIntent)

Srouter.post('/Buy/products', AuthenticatedUser, BuyProducts)
export default Srouter;