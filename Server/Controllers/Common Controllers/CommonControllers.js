import { Op } from 'sequelize';
import db from '../../Conn/connection.js';
import crypto from 'crypto';
import { getResetPasswordToken, sendEmail } from '../../Middlewares/ResetPassword.js';
import { ComparePassword } from '../../Middlewares/PasswordVerification.js';
import { GetNotifications } from '../../Helpers/GetNotifications.js';
import { ArrangeCourseObject, ModifyCartObject } from '../../Helpers/ChangeObject.js';
import { Paginate } from '../../Helpers/Paginate.js';


const { Course, Institute, User: UserModel, StudentInterest, Notification, Book, Product, LicenseTypes, Cart, SubLicenseTypes, VehicleTypes, UserResetPassword, InstituteUser } = db;

export const CheckInstituteUser = async (CheckInstitute, UserId) => {
    if (CheckInstitute.User === "Institute") {
        const InstituteData = await InstituteUser.findOne({
            where: { Institute_UserFK: UserId },
            attributes: ["InstituteUserType"],
            include: { model: Institute, attributes: { exclude: ['createdAt'] }, }
        })

        if (!InstituteData) {
            return false;
        }
        CheckInstitute = { ...CheckInstitute, InstituteUserType: InstituteData.dataValues.InstituteUserType, Institute: InstituteData.dataValues.Institute }

        return CheckInstitute
    }
    return CheckInstitute
}

/*
VehicleType
SubLicenseType
LicenseType
CourseName
*/
export const SearchCourse = async (req, res) => {
    let models = []
    let where = {};
    if (req.query.ProductName !== "''" || req.query.ProductName !== undefined && req.query.ProductName !== '') {
        let Query = {
            where: {
                ProductName: {
                    [Op.iLike]: `%${req.query.ProductName}`
                },
                BookId: null
            },
            attributes: { exclude: ["BookId"] },
            include: {
                model: Course,
                required: true,

            }
        }
        Object.assign(where, Query)
    }

    if (req.query.LicenseType !== "''" && req.query.LicenseType !== undefined && req.query.LicenseType !== '') {
        let x = {
            model: LicenseTypes,
            required: true,
            LicenseTypeName: {
                [Op.iLike]: `${req.query.LicenseType}`
            }
        }

        models[models.length] = x;

        let Query = {
            include: models
        }
        Object.assign(where.include, Query);
    }

    if (req.query.SubLicenseType !== "''" && req.query.SubLicenseType !== undefined && req.query.SubLicenseType !== '') {

        if (req.query.LicenseType) {
            let Query = {
                include: {
                    model: SubLicenseTypes,
                    required: true,
                    SubLicenseTypeName: {
                        [Op.iLike]: `%${req.query.SubLicenseType}`
                    }
                }
            }
            Object.assign(where.include.include, Query)
        } else {
            models[models.length] = {
                model: LicenseTypes,
                include: {
                    model: SubLicenseTypes,
                    required: true,
                    SubLicenseTypeName: {
                        [Op.iLike]: `%${req.params.SubLicenseType}`
                    }
                }
            }

            let Query = {
                include: models
            }
            Object.assign(where.include, Query)
        }

    }

    if (req.query.VehicleType !== "''" && req.query.VehicleType !== undefined && req.query.VehicleType !== '') {
        models[models.length] = {
            model: VehicleTypes,
            where: { VehicleTypeName: { [Op.iLike]: `%${req.query.VehicleType}` } },
            required: true
        }

        let Query = {
            include: models
        }
        Object.assign(where.include, Query)
    }
    try {
        let GetCourse = await Product.findAll({ ...where, ...Paginate(req.body) });
        GetCourse = GetCourse.map(value => ArrangeCourseObject(value))
        res.status(200).json(GetCourse);
    } catch (error) {
        console.log(`error occurred while Searching course : ${error}`);
        res.status(500).json(error);
    }

}


export const LogOutUser = async (req, res) => {
    try {
        res.status(200)
            .clearCookie('token')
            .clearCookie('checkToken')
            .json({ message: 'Logout successfully' })
            .end();
    } catch (error) {
        console.log(`error occurred while Logging out user: ${error}`);
        res.status(500).json(error);
    }
}

export const GetInstituteList = async (req, res) => {
    try {
        const Institutes = await Institute.findAll({
            where: {
                InstituteStatus: "Working",
                ApplicationStatus: "Accepted"
            }
        });
        res.status(200).json(Institutes)
    } catch (error) {
        console.log(`error occurred while Getting InstituteList: ${error}`);
        res.status(500).json(error);
    }
}
export const GetAllCourses = async (req, res) => {

    try {
        const CourseGot = await Product.findAll({

            ...Paginate(req.body),
            include: [
                // {
                // model: Institute,
                // attributes: ["InstituteName"],
                //     required: true,
                // },
                {

                    model: Course,
                    required: true,
                    where: { Status: "Viewable" },
                    include: [

                        {
                            model: LicenseTypes,
                            attributes: ["LicenseTypeName", "LicenseTypeId"],
                            required: true,
                        },
                        {
                            model: VehicleTypes,
                            attributes: ["VehicleTypeName", "VehicleTypeId"],
                            required: true,
                        },
                    ]
                }]

        })
        const ViewCourses = CourseGot.map((value) => ArrangeCourseObject(value));
        // console.log(ViewCourses)
        res.status(200).json(ViewCourses);
    } catch (error) {
        console.log(`error occured while getting all Courses ${error}`);
        return res.status(500).json(error);
    }

}




export const GetUserData = async (req, res) => {
    let UserRealtedData

    try {
        if (req.User.User === 'Student') {

            UserRealtedData = await StudentInterest.findOne({
                where: {
                    StudentId: req.UserId,
                }
            })

        }

        req.User = await CheckInstituteUser(req.User, req.UserId);

        let UserNotifications = await GetNotifications(Notification, req.User, req.UserId);
        const GetCart = await Cart.findAll({
            where: { AddedById: req.UserId },
            include: {
                required: true,
                model: Product,
                include: [
                    { model: Course, },
                    { model: Book, }
                ]
            },
        });


        const Modified = GetCart?.map((value) => {
            value = ModifyCartObject(value)
            return value
        })

        res.status(200).json({ data: req.User, Interest: UserRealtedData?.dataValues, Notifications: UserNotifications, ProductsInCart: Modified })
    } catch (error) {
        console.log(`error occurred while Getting User data: ${error}`);
        return res.status(500).json(error);
    }
}



export const GetPopularbooks = async (req, res) => {
    try {
        const Getbooks = await Book.findAll({
            where: {
                order: [
                    ['Popularity', 'ASC'],
                ],
            }
        })
    } catch (error) {
        console.log(`error occured while Getting popular books ${error}`);
        return res.status(500).json(error);
    }
}



export const ResetPassword = async (req, res) => {

    try {

        let ResetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
        const FoundUser = await UserModel.findOne({
            include: [{
                model: UserResetPassword,
                where: {
                    ResetPasswordToken: ResetPasswordToken
                },
                required: true
            }],

        })

        if (!FoundUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token or expired"
            })
        }
        const DestrtoyToken = await UserResetPassword.destroy({ where: { UserFK: FoundUser.UserId } })
        console.log(DestrtoyToken)
        res.status(200).json({ message: "Password Changed Successfully" })

    } catch (error) {
        console.log(`error occured while resetting password ${error}`);
        return res.status(500).json(error);
    }
}

export const ForgotPassword = async (req, res) => {

    try {
        const FindUser = await UserModel.findOne({
            where: {
                Email: req.body.Email
            }
        });
        if (!FindUser) {
            return res.status(404).json({
                success: false,
                message: "Email not found"
            });
        }

        const ResetToken = await getResetPasswordToken(FindUser, UserResetPassword);
        let resestUrl = `${req.protocol}://localhost:3000/forgot/reset/password/${ResetToken}`


        if (process.env.NODE_ENV !== 'production') {
            resestUrl = `${req.protocol}://${req.get('host')}/forgot/reset/password/reset/${ResetToken}`
        }

        const message = `Reset your password by clicking on the link below: ${resestUrl}`;

        try {
            await sendEmail({
                email: FindUser.Email,
                subject: "Reset Password",
                message
            })

            res.status(200).json({
                success: true,
                message: "Link for reset password is sent to the email"
            })
        } catch (error) {
            console.log(`error occured sending email ${error}`);
        }


    } catch (error) {
        console.log(`error occured while running forgot password ${error}`);
        return res.status(500).json(error);

    }

}

export const ChangePassword = async (req, res) => {
    try {
        let CheckEmail = await UserModel.findOne({
            where: {
                UserId: req.UserId
            }
        });
        const CheckPassword = await ComparePassword(req.body.OldPassword, CheckEmail.Password);

        if (!CheckPassword) {
            return res.status(401).json({ message: "Old Password is wrong" });
        }

        await UserModel.update({
            Password: req.body.Password
        }, {
            where: {
                UserId: req.UserId
            }
        });

        CheckEmail = await UserModel.findOne({
            where: {
                UserId: req.UserId
            }
        });
        delete CheckEmail.dataValues.Password;
        res.status(201).json(CheckEmail)
    } catch (error) {
        console.log(`error occured while Changing password ${error}`);
        return res.status(500).json(error);
    }
}

export const EditProfile = async (req, res) => {
    try {
        const UpdateUser = await UserModel.update({ Email: req.body.Email },
            {
                where: {
                    UserId: req.UserId
                }
            })

        const GetUser = await UserModel.findOne({
            where: {
                UserId: req.UserId
            }
        })
        res.status(200).json(GetUser.dataValues)
    } catch (error) {
        console.log(`error occured while Editing Profile: ${error}`);
        return res.status(500).json(error);
    }
}