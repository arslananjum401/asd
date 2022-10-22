import db from "../../Conn/connection.js"

const { Course, Product, CProductToInstitute, Institute, InstituteCoursePackage: CoursePackages } = db
export const ViewCourses = async (req, res) => {
    try {

        const InstituteCourse = await Product.findOne({
            where: { ProductId: req.params.ProductId },
            attributes: { exclude: ["createdAt", "CourseId"] },
            include: [
                {
                    model: CProductToInstitute,
                    attributes: ["ShortDescription", "LongDescription", "Possible_FAQs"],
                    include: [
                        {
                            model: Institute,
                            required: true,
                            attributes: ["InstituteName", "Country", "State", "City"]
                        },
                        {
                            model: CoursePackages,
                            required: true,
                            attributes: { exclude: ["cPI_Id", "createdAt", "Status"] }
                        }
                    ]
                },
                {
                    model: Course,
                    required: true,
                    attributes: { exclude: ["CourseProductId", "Cancel", "Status", "createdAt"] }
                }
            ]
        }
        )
        res.status(200).json(InstituteCourse)
    } catch (error) {

    }
}