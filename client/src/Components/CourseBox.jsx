import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './CourseBox.css'
import { MoreHoriz } from '@mui/icons-material/';
import { useDispatch, useSelector } from 'react-redux';
import { AddToWishList, RemoveFromWishList } from '../Actions/BuyA.js';
import { GetLocalStorage } from '../Helpers/LocalStorage';
import { GetCookie } from '../Helpers/Coookies';

const CourseBox = ({ value }) => {
  const { Completed, Category, ProductId, RunningCourse, Course, ProductName } = value;

  const [CourseWished, setCourseWished] = useState({
    Present: false,
    WishId: ""
  });

  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [ShowMore, setShowMore] = useState(false);

  const { WishList } = useSelector((state) => state.WishListReducer);

  const AddtoWishList = (WishedCourse, Remove) => {
    if (GetCookie("checkToken") && GetLocalStorage("User")?.User === 'Student') {
      if (Remove === true) {

        dispatch(RemoveFromWishList(WishedCourse));
      } else {

        dispatch(AddToWishList(WishedCourse));
      }
    }
    else {
      Navigate('/login', { state: { path: window.location.pathname } })
    }
  }

  useEffect(() => {
    if (WishList?.length === 0) {
      setCourseWished({ WishId: "", Present: false })
    }
    WishList?.forEach((value) => {

      if (value.WishedProduct === ProductId) {

        setCourseWished({ WishId: value.WishId, Present: true })
      }
    })
  }, [WishList, ProductId])


  return (
    <div className='CourseContainer' >
      {
        !GetLocalStorage("User") || GetLocalStorage("User")?.User === 'Student' ?
          <div className='More' onClick={() => { setShowMore(!ShowMore) }}>
            <MoreHoriz />
            <span className={`${ShowMore ? "ShowMore" : null} ShowMoreHide`}>

              {
                CourseWished?.Present === false ?
                  <button onClick={() => {
                    AddtoWishList(ProductId, false);
                    setShowMore(!ShowMore)
                  }}>Add to WishList</button>

                  : CourseWished?.Present === true ? <button onClick={() => {
                    AddtoWishList(CourseWished?.WishId, true);
                    setShowMore(!ShowMore)
                  }}>Remove from WishList</button>
                    : null
              }
            </span>
          </div>
          : null
      }
      <Link className='CourseLink' style={{ textDecoration: 'none' }} to={`/course/${ProductId}`}>
        <h2> {ProductName}</h2>
        <h3>License Type: <span className='unBold'> {Course.LicenseType.LicenseTypeName} </span></h3>
        <h3>Completed: <span className='unBold'> {Course.Completed} </span></h3>
        <h4>Running Courses: <span className='unBold'>{Course.RunningCourse} </span></h4>
      </Link >
    </div>
  )
}

export default CourseBox