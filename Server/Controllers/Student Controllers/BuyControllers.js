import db from "../../Conn/connection.js"

const { Bought, BoughtCourse, BoughtBook, InstituteCoursePackage, Course, Product, Book, CProductToInstitute } = db

export const BuyProducts = async (req, res) => {
    try {

        const CreateBought = await Bought.create({ UserFK: req.UserId, TotalPrice: req.body.TotalPrice });
        let BuyProduct
        if (req.body.ProductType === "Course") {
            BuyProduct = await BoughtCourse.create({ CoursePackageFK: req.body.CoursePackageId, BoughtFK: CreateBought.BoughtId })
        }
        if (req.body.ProductType === "Book") {
            BuyProduct = await BoughtBook.create({ BookFK: req.body.BookFK, BoughtFK: CreateBought.BoughtId })
        }

        const GetMyBuyings = await Bought.findOne({
            where: { BoughtId: CreateBought.BoughtId },

            include: [
                {
                    model: BoughtCourse,
                    required: false,
                    include: {
                        model: InstituteCoursePackage,
                        // include: {
                        //     model: CProductToInstitute,
                        //     include: {
                        //         model: Product,
                        //         include: {
                        //             model: Course
                        //         }
                        //     }
                        // }
                    }
                },
                {
                    model: BoughtBook,
                    include: {
                        model: Book
                    }
                }

            ]
        })


        const cProductToInstitute = await GetMyBuyings.BoughtCourse.CoursePackage.getCProductToInstitute()
        cProductToInstitute
        const product = await cProductToInstitute.getProduct();
        const course = await product.getCourse();
        cProductToInstitute.dataValues.Product = product;
        cProductToInstitute.dataValues.Product.dataValues.course = course;

        GetMyBuyings.dataValues.BoughtCourse.dataValues.CoursePackage.dataValues.CProductToInstitute = cProductToInstitute

        res.status(200).json(GetMyBuyings)
    } catch (error) {
        console.log(`Error occurred while buying products: ${error}`)
        res.status(500).json(error)
    }
}