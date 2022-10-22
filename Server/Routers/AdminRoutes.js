import express from "express";
import { InstituteRequest, InstituteReqRes, CreateLicenseType, UpdateLicenseType, DeleteLicenseType, GetAllLicenseTypes, AcceptedRequests, RejectedRequests, DownloadDocument, getAllInstitutes, getInstitute, CreateSubLicenseType, UpdateSubLicenseType, DeleteSubLicenseType, LicenseTypeInfo, CreateVehicleType, UpdateVehicleType, DeleteVehicleType, GetAllVehicleTypes, GetParentLicenseType } from '../Controllers/AdminControllers/AdminControllers.js';
import { CreateBook, DeleteBook, GetAllBooks, GetSingleBook, UpdateBook } from "../Controllers/AdminControllers/BookControllers.js";
import { AddCountry, AddCountrysLicenseTypes, DeleteContryFromList, DeleteCountryLicenseType, GetCountriesList, GetSCountryWLicenseTypeList, UpdateCountry } from "../Controllers/AdminControllers/CountryControllers.js";
import { DeleteCourse, GetAllCourses, GetCourse, NewCourse, UpdateCourse } from "../Controllers/AdminControllers/CoursesControllers.js";
import { AuthenticatedUser, AuthenticateUserType } from "../Middlewares/AuthenticateUser.js";
import { MulterMiddleware } from "../Middlewares/MulterMiddleware.js";
import { DataParser } from "../Middlewares/ParseData.js";

const AuthenticateAdminUser = (req, res, next) => {
    AuthenticateUserType(req, res, next, "Admin", "Admin");
}
const AuthenticateStaffUser = (req, res, next) => {
    AuthenticateUserType(req, res, next, "Admin", "Staff");
}
const AuthenticateInstructorUser = (req, res, next) => {
    AuthenticateUserType(req, res, next, "Admin", "Instructor");
}


const Aroutes = express.Router();
const MulterForAdmin = (req, res, next) => {
    let MulterVals = {};
    MulterVals.filepath = './Public/Book/CoverImage'
    MulterVals.UploadFields = [{ name: 'BookCover' }]

    MulterVals.filetypes = []
    MulterVals.filetypes[0] = "image/png"
    MulterVals.filetypes[1] = "image/jpg"
    MulterVals.filetypes[2] = "image/jpeg"
    MulterVals.filetypes[3] = "image/svg+xml"

    MulterMiddleware(req, res, next, MulterVals)
}
const MulterForCourseThumbnail = (req, res, next) => {
    let MulterVals = {};

    MulterVals.filepath = './Public/Course/Thumbnail'
    MulterVals.UploadFields = [{ name: 'CourseThumbnail' }];
    MulterVals.filetypes = []
    MulterVals.filetypes[0] = "image/png"
    MulterVals.filetypes[1] = "image/jpg"
    MulterVals.filetypes[2] = "image/jpeg"
    MulterVals.filetypes[3] = "image/svg+xml"
    MulterMiddleware(req, res, next, MulterVals)
}


// Course APIs
Aroutes
    .post('/course/create', AuthenticatedUser, AuthenticateAdminUser, MulterForCourseThumbnail, DataParser, NewCourse)//done
    .put('/course/update', AuthenticatedUser, AuthenticateAdminUser, MulterForCourseThumbnail, DataParser, UpdateCourse)//done
    .delete('/course', AuthenticatedUser, AuthenticateAdminUser, DeleteCourse)//done
    .get('/course/:ProductId', GetCourse)
    .get('/courses',
        // AuthenticatedUser, AuthenticateAdminUser,
        GetAllCourses);


//  Countries APIs
Aroutes
    .post('/country/add', AuthenticatedUser, AuthenticateAdminUser, AddCountry)
    .put('/country/update', AuthenticatedUser, AuthenticateAdminUser, UpdateCountry)
    .delete('/country/delete', AuthenticatedUser, AuthenticateAdminUser, DeleteContryFromList)
    .get('/countries', AuthenticatedUser, AuthenticateAdminUser, GetCountriesList)


Aroutes
    .post('/country/licenseType/add', AuthenticatedUser, AuthenticateAdminUser, AddCountrysLicenseTypes)
    .delete('/country/licenseType/delete', AuthenticatedUser, AuthenticateAdminUser, DeleteCountryLicenseType)
    .get('/country/:CountryPk',
        // AuthenticatedUser, AuthenticateAdminUser, 
        GetSCountryWLicenseTypeList)


// Institute APIs
Aroutes
    .get('/InstitutesRequest', AuthenticatedUser, AuthenticateAdminUser, InstituteRequest)//Checked
    .put('/InstitutesRequest/res', AuthenticatedUser, AuthenticateAdminUser, InstituteReqRes)//Checked
    .get('/InstitutesRequest/accepted', AuthenticatedUser, AuthenticateAdminUser, AcceptedRequests)//Checked
    .get('/InstitutesRequest/rejected', AuthenticatedUser, AuthenticateAdminUser, RejectedRequests)//Checked
    .get('/download', DownloadDocument)//Checked


Aroutes
    .get('/AllInstitutes', AuthenticatedUser, AuthenticateAdminUser, getAllInstitutes)//Checked
    .get('/Institute/:InstituteUserId', AuthenticatedUser, AuthenticateAdminUser, getInstitute)//Checked


//  LicenseType APIs
Aroutes
    .post('/LicenseType/create', AuthenticatedUser, AuthenticateAdminUser, CreateLicenseType)//Checked
    .put('/LicenseType/update', AuthenticatedUser, AuthenticateAdminUser, UpdateLicenseType)//Checked
    .delete('/LicenseType/delete', AuthenticatedUser, AuthenticateAdminUser, DeleteLicenseType)//Checked
    .get('/LicenseTypes', GetAllLicenseTypes)//Checked
    .get('/LicenseType/single/:LicenseTypeId', LicenseTypeInfo)

//  SubLicenseType APIs
Aroutes
    .post('/subLicenseType/create', AuthenticatedUser, AuthenticateAdminUser, CreateSubLicenseType)//Checked
    .put('/subLicenseType/update', AuthenticatedUser, AuthenticateAdminUser, UpdateSubLicenseType)//Checked
    .delete('/subLicenseType/delete', AuthenticatedUser, AuthenticateAdminUser, DeleteSubLicenseType)//Checked
    .get('/subLicenseType/parent', AuthenticatedUser, AuthenticateAdminUser, GetParentLicenseType)//Checked


//  VehicleType APIs
Aroutes
    .post('/VehicleType/create', AuthenticatedUser, AuthenticateAdminUser, CreateVehicleType)
    .put('/VehicleType/update', AuthenticatedUser, AuthenticateAdminUser, UpdateVehicleType)
    .delete('/VehicleType/delete', AuthenticatedUser, AuthenticateAdminUser, DeleteVehicleType)
    .get('/AllVehicleTypes', AuthenticatedUser, AuthenticateAdminUser, GetAllVehicleTypes)


// Book APIs
Aroutes
    .post('/Book/Create', AuthenticatedUser, AuthenticateAdminUser, MulterForAdmin, DataParser, CreateBook)//Checked
    .put('/Book/update/:ProductId', AuthenticatedUser, AuthenticateAdminUser, UpdateBook)//Checked
    .delete('/Book/delete/:ProductId', AuthenticatedUser, AuthenticateAdminUser, DeleteBook)//Checked
    .get('/Books', AuthenticatedUser, AuthenticateAdminUser, GetAllBooks)//Checked
    .get('/Book/:ProductId', AuthenticatedUser, AuthenticateAdminUser, GetSingleBook)//Checked


export default Aroutes;