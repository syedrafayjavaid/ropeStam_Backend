const Car = require("../models/Car");


const getCars = async (req, res) => {

    const cars = await Car.aggregate([

        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category"
            }
        }

    ]);
    res.status(200).json({
        success: true,
        count: cars.length,
        data: cars,
    });
}

const getCar = async (req, res) => {

    const car = await Car.findById(req.params.id);
    if (!car) {
        res.status(404).json({
            success: false,
            error: `Car not found with the id of ${req.params.id}`
        })
    }
    res.status(200).json({
        success: true,
        data: car,
    });

}

const createCar = async (req, res) => {


    try {

        const car = await Car.create(req.body);
        res.status(200).json({
            success: true,
            data: car
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

const updateCar = async (req, res) => {

    const data = req.body;
    const car = await Car.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!car) {
        res.status(404).json({
            success: false,
            error: `Car not found with the id of ${req.params.id}`
        })
    }

    res.status(200).json({
        success: true,
        data: car,
    });


}

const deleteCar = async (req, res) => {

    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
        res.status(404).json({
            success: false,
            error: `Car not found with the id of ${req.params.id}`
        })
    }
    res.status(200).json({
        success: true,
        msg: `Car deleted with the id${req.params.id}`,
    });

}


module.exports = { getCar, getCars, createCar, updateCar, deleteCar }