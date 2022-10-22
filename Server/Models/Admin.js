export const LicenseTypeModel = async (sequelize, Datatypes) => {
    const LicenseType = await sequelize.define('LicenseType', {
        LicenseTypeId: {
            type: Datatypes.UUID,
            defaultValue: Datatypes.UUIDV4,
            primaryKey: true
        },
        LicenseTypeName: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        SubLicenseType: {
            type: Datatypes.BOOLEAN,
            defaultValue: false,
        },
        Active: {
            type: Datatypes.BOOLEAN,
            defaultValue: true,
        }
    }

        , {
            timestamps: false,
            // createdAt: true,
            // updatedAt: false,
        })
    return LicenseType
}

export const SubLicenseTypeModel = async (sequelize, Datatypes, LicenseTypeModel) => {
    return await sequelize.define('SubLicenseType', {
        SubLicenseTypeId: {
            type: Datatypes.UUID,
            defaultValue: Datatypes.UUIDV4,
            primaryKey: true
        },
        ParentLicenseTypeId: {
            type: Datatypes.UUID,
            allowNull: false,
            references: {
                model: LicenseTypeModel,
                key: 'LicenseTypeId'
            }
        },
        SubLicenseTypeName: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        Active: {
            type: Datatypes.BOOLEAN,
            defaultValue: true,
        }
    }

        , {
            timestamps: false,
            // createdAt: true,
            // updatedAt: false,
        })
}


export const VehicleTypesModel = async (sequelize, DataTypes) => {
    return await sequelize.define('VehicleType', {
        VehicleTypeId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        VehicleTypeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Active: {
            type: DataTypes.BOOLEAN,
            defaulValue: true,
        }
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: false,
    })
}


export const CourseModel = async (sequelize, DataTypes, ProductModel, VehicleTypeModel, LicenseTypesModel, SubLicenseTypesModel) => {
    return await sequelize.define('Course', {
        CourseProductId: {
            type: DataTypes.UUID,
            // allowNull: false,
            references: {
                model: ProductModel,
                key: 'ProductId'
            }
        },
        CoursePK: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        Description: {
            type: DataTypes.STRING(2134),
            allowNull: false
        },
        CourseVehicleType: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: VehicleTypeModel,
                key: 'VehicleTypeId'
            },
        },
        CourseLicenseType: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: LicenseTypesModel,
                key: 'LicenseTypeId'
            },
        },
        CourseSubLicenseType: {
            type: DataTypes.UUID,
            references: {
                model: SubLicenseTypesModel,
                key: 'SubLicenseTypeId'
            },
        },
        CourseThumbnail: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        PossibleKeywords: {
            type: DataTypes.STRING,
            // allowNull: false
        },






        RunningCourse: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        Promotion: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        Completed: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        Schedule: {
            type: DataTypes.STRING,
            allowNull: false
        },

        Cancel: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        OverallRating: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        Status: {
            type: DataTypes.STRING,
            defaultValue: "Viewable"
        }

    },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: false,
        }
    )
}


export const CountryModel = async (sequelize, DataTypes) => {
    return await sequelize.define('Countrie', {
        CountryPk: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        CountryName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        CountryCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        CountryPhoneCode: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true,
        },
        Active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }

    },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: false,
        })
}

export const CountryLicenseTypeModel = async (sequelize, DataTypes) => {
    return await sequelize.define('CountryLicenseType', {

    },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: false,
            freezeTableName: true
        }
    )
}

export const bookModel = async (sequelize, Datatypes, UserModel, ProductModel) => {
    const Ebook = await sequelize.define('Book', {
        BookId: {
            type: Datatypes.UUID,
            defaultValue: Datatypes.UUIDV4,
            primaryKey: true
        },
        ProductFK: {
            type: Datatypes.UUID,
            allowNull: false,
            references: {
                model: ProductModel,
                key: 'ProductId'
            }

        },
        AurhotName: {
            type: Datatypes.STRING,
            allowNull: false
        },

        AboutBook: {
            type: Datatypes.STRING,
            allowNull: false
        },
        BookCover: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        E_Book: {
            type: Datatypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        HardBook: {
            type: Datatypes.BOOLEAN,
            allowNull: false,
        },
        CreatedBy: {
            type: Datatypes.UUID,
            allowNull: false,
            references: {
                model: UserModel,
                key: 'UserId'
            }
        },
        Price: {
            type: Datatypes.FLOAT,
            allowNull: false
        },
        Copies: {
            type: Datatypes.INTEGER,
            allowNull: false
        },


    },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: false,
        })
    return Ebook
}



export const BookReputationInfo = async (sequelize, Datatypes, BookModel) => {
    return await sequelize.define('BookReputationInfo', {
        BookFK: {
            type: Datatypes.UUID,
            allowNull: false,
            references: {
                model: BookModel,
                key: "BookId"
            }
        },
        Popularity: {
            type: Datatypes.FLOAT,
            defaulValue: 0
        },
        BookRating: {
            type: Datatypes.FLOAT,
            defaultValue: 0
        }
    },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: false,
            freezeTableName: false
        })
}