const express = require("express");
const router = express.Router();

const {
    getCars,
    getCar,
    createCar,
    updateCar,
    deleteCar,

} = require("../controllers/car");

router.route("/").get(getCars).post(createCar);
router
    .route("/:id")
    .get(getCar)
    .delete(deleteCar)
    .put(updateCar);

module.exports = router;
