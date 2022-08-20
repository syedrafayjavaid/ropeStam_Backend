const Category = require("../models/Category");


const getCategories = async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories,
    });
}

const getCategory = async (req, res) => {

    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(204).json({
            success: false,
            error: `Category not found with id of ${req.params.id}`
        })
    }
    res.status(200).json({
        success: true,
        data: category,
    });

}

const createCategory = async (req, res) => {


    try {


        console.log("incoming req body has", req.body);


        const category = await Category.create(req.body);
        res.status(200).json({
            success: true,
            data: category
        })

    } catch (error) {

        res.status(404).json({
            success: false,
            error: error.message,
            errorCode: error.code
        }

        )
    }


}

const updateCategory = async (req, res) => {


    try {
        const data = req.body;
        const category = await Category.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
        if (!category) {
            res.status(404).json({
                success: false,
                error: `Category not found with id of ${req.params.id}`
            })
        }

        res.status(200).json({
            success: true,
            data: category,
        });


    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message,
            errorCode: error.code
        }

        )

    }






}

const deleteCategory = async (req, res) => {

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
        res.status(204).json({
            success: false,
            error: `Category not found with id of ${req.params.id}`
        })
    }
    res.status(200).json({
        success: true,
        msg: `Category deleted with the id${req.params.id}`,
    });

}


module.exports = { getCategory, getCategories, createCategory, updateCategory, deleteCategory }