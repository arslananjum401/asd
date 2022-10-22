import db from '../../Conn/connection.js';
import { ComparePassword } from '../../Middlewares/PasswordVerification.js';
import { GenerateToken } from '../../Middlewares/GenerateToken.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { request } from 'https';
import { Op } from 'sequelize';
import { CheckUUID } from '../../Helpers/CheckUUID.js';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const { Institute, LicenseTypes, Notification, User,SubLicenseTypes, VehicleTypes, InstituteUser,  } = db;


export const ModifyInstituteReqObj = (InstituteRequest) => {
    InstituteRequest = InstituteRequest.dataValues
    let InstituteUserType = InstituteRequest.InstituteUser.dataValues.InstituteUserType
    let User = InstituteRequest.InstituteUser.dataValues.User.dataValues
    delete InstituteRequest.InstituteUser
    User.InstituteUserType = InstituteUserType
    InstituteRequest.User = User
    return InstituteRequest
}
export const InstituteRequest = async (req, res) => {
    try {

        let RequestedInstitutes = await Institute.findAll({
            where: {
                ApplicationStatus: "Pending",
            },
            order: [['createdAt', 'DESC'],],
            attributes: { exclude: ["createdAt"] },
            include: {
                model: InstituteUser,
                attributes: ["InstituteUserType"],
                include: { model: User, attributes: { exclude: ["Password", "createdAt"] } }
            }
        })


        if (RequestedInstitutes.length === 0) {
            return res.status(200).json(RequestedInstitutes);
        }

        RequestedInstitutes = RequestedInstitutes.map((value) => ModifyInstituteReqObj(value))

        return res.status(200).json(RequestedInstitutes);
    } catch (errors) {

        console.log(`error occured while creating newInstitute ${errors}`);

        return res.status(500).json({ messsage: errors });

    }
}

export const InstituteReqRes = async (req, res) => {
    try {
        if (req.body.ApplicationStatus === "Accepted") {

            req.body.InstituteStatus = "Working";
            const ResToReqofInstitute = await Institute.update(req.body, {
                where: {
                    ApplicationStatus: 'Pending',
                    InstituteId: req.body.InstituteId
                }
            });
            if (ResToReqofInstitute.length === 0) {
                return res.status(200).json('The request is already accepted');
            }
        }


        if (req.body.ApplicationStatus === "Rejected") {

            req.body.InstituteStatus = "not Working";
            const ResToReqofInstitute = await Institute.update(
                {
                    ApplicationStatus: req.body.ApplicationStatus,
                    InstituteStatus: req.body.InstituteStatus
                },
                {
                    where: {
                        ApplicationStatus: 'Pending',
                        InstituteId: req.body.InstituteId
                    }
                })
        }

        let ResponsedInstitute = await Institute.findOne({
            where: {
                ApplicationStatus: 'Accepted',
                InstituteId: req.body.InstituteId
            },
            attributes: { exclude: ["createdAt"] },
            include: {
                model: InstituteUser,
                attributes: ["InstituteUserType"],
                include: { model: User, attributes: { exclude: ["Password", "createdAt"] } }
            }
        })

        ResponsedInstitute = ModifyInstituteReqObj(ResponsedInstitute);

        if (req.body.NotificationsId !== undefined) {
            const noti = await Notification.update(
                {
                    MarkAsRead: true
                },
                {
                    where: {
                        NotificationId: req.body.NotificationsId
                    }
                })
        }
        return res.status(200).json(ResponsedInstitute);
    } catch (errors) {

        console.log(`error occured while creating newInstitute ${errors}`);
        return res.status(500).json({ messsage: errors });
    }
}








export const CreateLicenseType = async (req, res) => {
    req.body.Active = true
    try {

        const FindLicenseType = await LicenseTypes.findOne({
            where: {
                LicenseTypeName: req.body.LicenseTypeName
            }
        })


        if (FindLicenseType) {
            return res.status(409).json({ message: "LicenseType name already exist. Choose a different name" });
        }


        const NewLicenseType = await LicenseTypes.create(req.body);
        res.status(200).json(NewLicenseType);
    } catch (error) {
        console.log(`error occurred while Creating LicenseType: ${error}`);
        return res.status(500).json({ error: error.message });
    }
}
export const UpdateLicenseType = async (req, res) => {
    try {

        const NewLicenseType = await LicenseTypes.update(req.body, {
            where: {
                LicenseTypeId: req.body.LicenseTypeId
            }
        });
        res.status(200).json(NewLicenseType);
    } catch (error) {
        console.log(`error occurred while Updating LicenseType: ${error}`);
        return res.status(500).json({ error: error.message });
    }
}
export const DeleteLicenseType = async (req, res) => {
    req.body.Active = false;
    try {
        console.log("deleted")
        const DeleteLicenseType = await LicenseTypes.update(req.body, {
            where: {
                LicenseTypeId: req.body.LicenseTypeId
            },

        });
        res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
        console.log(`error occurred while Deleting LicenseType: ${error}`);
        return res.status(500).json({ error: error.message });
    }
}

export const GetAllLicenseTypes = async (req, res) => {
    try {

        const AllCatgories = await LicenseTypes.findAll({
            where: {
                Active: true,
            },
            attributes: ["LicenseTypeName", "LicenseTypeId"],
            include: [{
                model: SubLicenseTypes,

                attributes: ["SubLicenseTypeName", "SubLicenseTypeId"]
            }]
        });

        res.status(200).json(AllCatgories);
    } catch (error) {
        console.log(`error occurred while getting All LicenseTypes: ${error}`);
        return res.status(500).json({ error: error.message });
    }
}

export const LicenseTypeInfo = async (req, res) => {
    try {
        console.log(req.params.LicenseTypeId)
        const SLicenseTypeInfo = await LicenseTypes.findOne({
            where: { LicenseTypeId: req.params.LicenseTypeId },
            attributes: ["LicenseTypeId", "LicenseTypeName"],
            include: [{ model: SubLicenseTypes, attributes: ["SubLicenseTypeName", "SubLicenseTypeId"] }]
        })
        res.status(200).json(SLicenseTypeInfo);
    } catch (error) {
        console.log(`error occurred while getting Single LicenseType: ${error}`);
        return res.status(500).json({ error: error.message });
    }
}

export const CreateSubLicenseType = async (req, res) => {
    try {
        const ModifyParentLicenseType = await LicenseTypes.update({ SubLicenseType: true }, {
            where: {
                LicenseTypeId: req.body.LicenseTypeId
            }
        })
        req.body.ParentLicenseTypeId = req.body.LicenseTypeId
        const NewSubLicenseType = await SubLicenseTypes.create(req.body);
        res.status(200).json(NewSubLicenseType);
    } catch (error) {
        console.log(`error occurred while creating SubLicenseType: ${error}`);
        return res.status(500).json({ error: error.message });
    }
}
export const UpdateSubLicenseType = async (req, res) => {
    try {
        const UpdateLicenseType = await SubLicenseTypes.update(req.body, {
            where: { SubLicenseTypeId: req.body.SubLicenseTypeId }
        })
        const GetUpdatedLicenseType = await SubLicenseTypes.findOne({ where: { SubLicenseTypeId: req.body.SubLicenseTypeId } });

        res.status(200).json(GetUpdatedLicenseType);
    } catch (error) {
        console.log(`error occurred while Update SubLicenseType: ${error}`);
        return res.status(500).json({ error: error.message });
    }
}
export const DeleteSubLicenseType = async (req, res) => {
    try {
        req.body.Active = false
        const DeleteLicenseType = await SubLicenseTypes.update(req.body, {
            where: { SubLicenseTypeId: req.body.SubLicenseTypeId },
        });
        res.status(200).json({ message: "SubLicenseType deleted successfully" })
    } catch (error) {
        console.log(`error occurred while Deleting SubLicenseType: ${error}`);
        return res.status(500).json({ error: error.message });
    }
}

export const GetParentLicenseType = async (req, res) => {
    try {
        const GetParent = await SubLicenseTypes.findOne({
            where: { SubLicenseTypeId: req.body.SubLicenseTypeId },
            include: {
                model: LicenseTypes,
                include: { model: SubLicenseTypes }
            }
        })
        res.status(200).json(GetParent)
    } catch (error) {
        console.log(`error occurred while getting Parent of SubLicenseType: ${error}`);
        return res.status(500).json({ error: error.message });
    }
}

export const CreateVehicleType = async (req, res) => {
    try {
        const CheckVehicleType = await VehicleTypes.findOne({ where: { VehicleTypeName: req.body.VehicleTypeName } })
        if (CheckVehicleType) {
            return res.status(401).json({ message: "Vehicle type already exists" })
        }
        const NewVehicleType = await VehicleTypes.create(req.body);
        res.status(200).json(NewVehicleType)
    } catch (error) {
        console.log(`error occurred while creating Vehicle type: ${error}`);
        return res.status(500).json({ error: error.message });
    }
}
export const UpdateVehicleType = async (req, res) => {
    try {
        const UpdatedVehicleType = await VehicleTypes.update(req.body, { where: { VehicleTypeId: req.body.VehicleTypeId } });
        const GetUpdatedVehicleType = await VehicleTypes.findOne({ where: { VehicleTypeId: req.body.VehicleTypeId } });
        res.status(200).json(GetUpdatedVehicleType)
    } catch (error) {
        console.log(`error occurred while Updating Vehicle type: ${error}`);
        return res.status(500).json({ error: error.message });
    }
}

export const DeleteVehicleType = async (req, res) => {
    try {
        req.body.Active = false;
        const DeletedVehicleType = await VehicleTypes.update(req.body, { where: { VehicleTypeId: req.body.VehicleTypeId } });
        res.status(200).json({ message: "Vehicle type deleted successfully" })
    } catch (error) {
        console.log(`error occurred while deleting Vehicle type: ${error}`);
        return res.status(500).json({ error: error.message });
    }
}
export const GetAllVehicleTypes = async (req, res) => {
    try {
        const GetVehicleTypes = await VehicleTypes.findAll();
        res.status(200).json(GetVehicleTypes);
    } catch (error) {
        console.log(`error occurred while getting All Vehicle types: ${error}`);
        return res.status(500).json({ error: error.message });
    }
}
export const AcceptedRequests = async (req, res) => {
    try {
        let AcceptedInstitutes = await Institute.findAll({
            where: {
                ApplicationStatus: 'Accepted'
            },
            order: [['createdAt', 'DESC'],],
            attributes: { exclude: ["createdAt"] },
            include: {
                model: InstituteUser,
                attributes: ["InstituteUserType"],
                include: { model: User, attributes: { exclude: ["Password", "createdAt"] } }
            }
        });
        AcceptedInstitutes = AcceptedInstitutes.map(value => ModifyInstituteReqObj(value))

        res.status(200).json(AcceptedInstitutes);

    } catch (error) {
        console.log(`error occurred while Getting Accepted requests: ${error}`);
        return res.status(500).json({ error: error.message });
    }
}


export const RejectedRequests = async (req, res) => {
    try {
        let RejectedInstitutes = await Institute.findAll({
            where: {
                ApplicationStatus: 'Rejected'
            },
            order: [['createdAt', 'DESC']],
            attributes: { exclude: ["createdAt"] },
            include: {
                model: InstituteUser,
                attributes: ["InstituteUserType"],
                include: { model: User, attributes: { exclude: ["Password", "createdAt"] } }
            }
        });
        if (RejectedInstitutes.length <= 0) {
            return res.status(200).json({ message: "No Institute Found" })
        }
        RejectedInstitutes = RejectedInstitutes.map(value => ModifyInstituteReqObj(value));

        res.status(200).json(RejectedInstitutes);
    } catch (error) {
        console.log(`error occurred while Getting Accepted requests: ${error}`);
        return res.status(500).json({ error: error.message });
    }
}


export const DownloadDocument = (req, res) => {
    try {

        req.query.url = req.query.url.replaceAll('"', '')
        console.log(req.query.url)
        const FilePath = path.join(__dirname, `../../${req.query.url}`)
        console.log(path.join(__dirname, `../../${req.query.url}`))
        res.set({ 'Content-Type': 'image/png' });
        res.status(200).sendFile(FilePath);
    } catch (error) {
        console.log(`Error occured while downloading ${error}`)
        return res.status(500).json({ error: error.message });
    }
}












































export const getAllInstitutes = async (req, res) => {
    try {
        const AllInstitutes = await Institute.findAll({
            order: [
                ['createdAt', 'DESC'],
            ],
        })
        res.status(200).json(AllInstitutes)
    } catch (error) {
        console.log(error);
    }
}
export const getInstitute = async (req, res) => {
    try {
        const AllInstitutes = await Institute.findOne({
            where: {
                InstituteUserId: req.params.InstituteUserId
            }
        })
        res.status(200).json(AllInstitutes)
    } catch (error) {
        console.log(error);
    }
}

