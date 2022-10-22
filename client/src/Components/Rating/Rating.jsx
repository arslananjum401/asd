import React from 'react'
import { useState, useEffect } from 'react';
import { Star } from '@mui/icons-material';
import './Rating.css'
import { useDispatch } from 'react-redux';
import { RateCourse } from '../../Actions/CourseA';
import { GetLocalStorage } from '../../Helpers/LocalStorage';
const Rating = ({ EnrolledCourses, CRating, Rated, EnrollmentId, OverallRating }) => {
    const dispatch = useDispatch();
    const [ChangeRating, setChangeRating] = useState(false);
    const [HoverVal, setHoverVal] = useState(0);
    const [Rating, setRating] = useState(CRating);
    const [AllowRate, setAllowRate] = useState();
    const [ShowRateMessage, setShowRateMessage] = useState(false);
    const SetColor = {
        color: 'rgb(230, 230, 0)',
        transition: '0.1s'
    }

    useEffect(() => {

        setRating(CRating);
    }, [CRating])
    useEffect(() => {
        setAllowRate(EnrolledCourses?.Progress)
    }, [EnrolledCourses])
    const RateCourseEvent = async () => {
        if (ChangeRating && Rated) {
            dispatch(RateCourse(Rating, EnrollmentId))
        } else if (!Rated) {
            dispatch(RateCourse(Rating, EnrollmentId))
        }
    }

    return (
        <>
            <div>
                {OverallRating ? <h3>Rating:<span> {OverallRating}</span></h3> :
                    <h3>{
                        GetLocalStorage("User")?.User !== "Student"
                            ? "No reviews"
                            : "Be the first to review"}
                    </h3>}
            </div>
            {GetLocalStorage("User")?.User === 'Student' ?
                <div className='RatingContainer'
                    onMouseEnter={() => { setShowRateMessage(true) }}
                    onMouseLeave={() => { setShowRateMessage(false) }}
                >
                    {!EnrolledCourses ?
                        <div
                            className={`${ShowRateMessage ? "RateMessgaeShow RateMessgaeShowDisplay" : null}  RateMessgae`}>
                            <h4 className='Message'>Message  </h4>
                            <h4>
                                Only Enrolled Students can Rate course
                            </h4>
                        </div>
                        : null
                    }

                    {
                        AllowRate <= 29
                            ? <div
                                className={`${ShowRateMessage ? "RateMessgaeShow RateMessgaeShowDisplay" : null}  RateMessgae`}>
                                <h4 className='Message'>Message  </h4>
                                <h4> You Must complete 30% of the course to rate this course
                                </h4>
                            </div>
                            : null
                    }
                    {
                        Rated && !ChangeRating
                            ? <button className={`${AllowRate <= 30 ? "EditRating" : "ReviewButton AllowedRating"} `}
                                onClick={() => { if (AllowRate >= 30) setChangeRating(!ChangeRating) }}
                            >
                                Edit
                            </button>
                            : (!Rated && !ChangeRating) || (Rated && ChangeRating)
                                ? <button
                                    className={`${AllowRate <= 30 ? "EditRating " : "ReviewButton AllowedRating"} `}
                                    onClick={() => {
                                        if (AllowRate >= 30) { RateCourseEvent(); setChangeRating(!ChangeRating) }
                                    }}>Submit
                                </button>
                                : null
                    }


                    <div className={`RatingLabelContainer 
                    ${((!EnrolledCourses || (Rated && !ChangeRating)) || AllowRate <= 29) ? 'EditRating' : null}
                    
                    `}>
                        {
                            [...Array(5)].map((star, i) => {
                                return <label key={i}>
                                    <input type='radio'
                                        name='rating'
                                        value={i + 1}
                                        onClick={(e) => {
                                            if (!EnrolledCourses || AllowRate >= 29) {
                                                if (ChangeRating && Rated) {
                                                    setRating(e.target.value)
                                                    return
                                                } else if (!Rated) {
                                                    setRating(e.target.value)
                                                }
                                            }

                                        }}
                                    />
                                    <Star className={`star  
                                    ${(!EnrolledCourses || (Rated && !ChangeRating) || AllowRate <= 29) ? 'EditRating' : null}
                                    `}
                                        onMouseEnter={() => {
                                            if (AllowRate > 29 && !(i + 1 <= Rating)) {
                                                if (ChangeRating && Rated) {
                                                    setHoverVal(i + 1)
                                                    return
                                                } else if (!Rated) {
                                                    setHoverVal(i + 1)
                                                }
                                            }
                                        }}
                                        onMouseLeave={() => { setHoverVal(0) }}
                                        style={(i + 1 <= (HoverVal || Rating))
                                            ? SetColor
                                            : { color: 'grey', transition: '0.1s' }
                                        }
                                    />
                                </label>
                            })
                        }
                    </div>

                    <h5 className={`${!Rated ? "Fsize" : null}   Rating `}>{Rated ? `You rated this course ${Rating} of 5` : 'Rate this course'}</h5>
                </div>
                : null
            }
        </>

    )
}

export default Rating