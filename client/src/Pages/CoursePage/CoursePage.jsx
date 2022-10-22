import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GetSingleCourse, GetUser } from '../../Actions/UserA'
import { GetCookie } from '../../Helpers/Coookies'
import { GetLocalStorage } from '../../Helpers/LocalStorage';
import './CoursePage.css';
import { EnrollCourse, GetSEnrollCourse, UnEnrollCourse } from '../../Actions/CourseA'
import Rating from '../../Components/Rating/Rating';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import { RemoveFromCartAction, AddToCartAction, BuyProductA } from '../../Actions/BuyA'


const CoursePage = ({ Height }) => {


    const Navigate = useNavigate()
    const { ProductId } = useParams()
    const dispatch = useDispatch();

    const [ProductInCart, setProductInCart] = useState(false);

    const { SCourse, EnrolledCourse: ReducedEnrolledCourses, loading: CourseLoading } = useSelector((state) => state.CourseReducer);

    const { User: SelectedUser, loading: UserLoading, ProductsInCart } = useSelector((state) => state.UserReducer);
    const [Course, setCourse] = useState();
    const [User, setUser] = useState(SelectedUser);
    const [EnrolledCourses, setEnrolledCourses] = useState([]);
    useEffect(() => {
        if (GetCookie('checkToken')) {
            dispatch(GetUser("/" + GetLocalStorage("User").User))
        }

        if (GetLocalStorage("User")?.User === 'Student') {

            // dispatch(GetSEnrollCourse(ProductId))
            dispatch(GetSingleCourse(ProductId))
        } else {
            dispatch(GetSingleCourse(ProductId))

        }
    }, [dispatch, ProductId])

    useEffect(() => {
        setCourse(SCourse);

    }, [SCourse])


    useEffect(() => {
        setUser(SelectedUser)
    }, [SelectedUser])


    useEffect(() => {


        setEnrolledCourses(ReducedEnrolledCourses)

    }, [ReducedEnrolledCourses])
    const EnrollForCourse = () => {
        if (!GetLocalStorage("User")) {
            Navigate('/login', { state: { path: window.location.pathname } })
            return
        }
        if (GetLocalStorage("User")?.User === 'Student') {
            dispatch(EnrollCourse(SCourse?.Course.CoursePK, ProductId))
        }
    }

    const AddToCart = async () => {
        if (!GetLocalStorage("User")) {
            Navigate('/login', { state: { path: window.location.pathname } })
            return
        }

        if (GetLocalStorage("User")?.User === 'Student') {
            dispatch(AddToCartAction(ProductId))

        }

    }
    const RemoveFromCart = () => {
        if (!GetLocalStorage("User")) {
            Navigate('/login', { state: { path: window.location.pathname } })
            return
        }
        if (GetLocalStorage("User")?.User === 'Student') {
            dispatch(RemoveFromCartAction(ProductId))
        }
    }

    const UnEnrollForCourse = () => {
        if (GetLocalStorage("User")?.User === 'Student') {
            dispatch(UnEnrollCourse(EnrolledCourses?.EnrollmentId));

            dispatch(GetSEnrollCourse(ProductId))
        }
    }
    const BuyProduct = () => {

        dispatch(BuyProductA({ BuyingProductId: ProductId }))
    }
    useEffect(() => {

        const Check = ProductsInCart?.some((value) => value.ProductId === ProductId);
        setProductInCart(Check);

    }, [ProductsInCart, ProductId])

    return (
        <>


            {!UserLoading && !CourseLoading ?
                <div className='setBg'
                    style={{ height: `calc(100% - ${Height}px)` }}
                >
                    {/* <Checkout /> */}
                    <div className='UpdateCourse'>
                        {GetLocalStorage("User")?.User === "Institute" &&
                            Course?.InstituteName === User?.InstituteName

                            ? <Link to={`/course/update/${ProductId}`} className='UpdateCourse'>
                                Update Course
                            </Link>

                            : !User || (User?.User !== 'Admin' && User?.User === 'Student')
                                ? <>
                                    {



                                        !EnrolledCourses || !EnrolledCourses?.EnrollmentStatus ?
                                            <button onClick={EnrollForCourse} className='UpdateCourse'>
                                                Enroll For this course
                                            </button>
                                            : EnrolledCourses?.EnrollmentStatus && <button onClick={UnEnrollForCourse} className='UpdateCourse'>
                                                UnEnroll From this course
                                            </button>
                                    }
                                </>
                                : null
                        }
                    </div>

                    <button onCanPlay={AddToCart}>Add to cart</button>
                    <div className='CourseData'>
                        <div className='CourseInfoContainer'>
                            <div className='CourseHeading'>
                                <h3>Completed By:</h3>
                                <h3>Promotions: </h3>
                                <h3>Course Name: </h3>
                                <h3>Running Courses: </h3>
                                {EnrolledCourses?.EnrollmentStatus === true ? <h3>Your Progress:</h3> : null}
                            </div>

                            <div className='CourseInfo'>
                                <h3> {Course?.Course?.Completed}</h3>
                                <h3> {Course?.Course?.Promotion}</h3>
                                <h3> {Course?.ProductName}</h3>
                                <h3> {Course?.Course?.RunningCourse}</h3>
                                {EnrolledCourses?.EnrollmentStatus === true &&
                                    !isNaN(EnrolledCourses?.Progress)
                                    ?
                                    <div className='ProgressContainer'>
                                        <ProgressBar progress={Math.round(EnrolledCourses?.Progress)} />
                                        <h4> {Math.round(EnrolledCourses?.Progress)}</h4>
                                    </div>
                                    : null}
                            </div>

                        </div>

                        <span className='DescriptionContainer'>
                            <h4 className='DescriptionHeading' >   Description:</h4>
                            <h4 className='DescriptionData'><span> {Course?.Course?.Description} </span></h4>
                        </span>

                        <Rating
                            EnrolledCourses={EnrolledCourses}
                            CRating={EnrolledCourses?.CourseRating}
                            Rated={EnrolledCourses?.Rated}
                            EnrollmentId={EnrolledCourses?.EnrollmentId}
                            OverallRating={Course?.OverallRating}
                        />
                    </div>
                </div>
                :
                <h1>loading</h1>
            }
        </>
    )
}

export default CoursePage


