export const CourseEnrollmentModel = async (sequelize, DataTypes, CourseModel, UserModel, ProductModel) => {
    const CourseEnrollment = await sequelize.define('CourseEnrollment', {
        EnrollmentId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        EnrolledCourse: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: CourseModel,
                key: 'CoursePK'
            }
        },
        EnrolledProduct: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: ProductModel,
                key: 'ProductId'
            }
        },
        StudentId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: UserModel,
                key: 'UserId'
            }
        },
        EnrollmentPeriod: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        EnrollmentDescription: {
            type: DataTypes.STRING(2134),
        },
        EnrollmentStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        Bought: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        CourseRating: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        Rated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        Completion: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        CompletionMark: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        RunningMarked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: false,
        }
    )
    return CourseEnrollment;
}