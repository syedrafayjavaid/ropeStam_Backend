const express = require("express");
const router = express.Router();

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
 
} = require("../controllers/category");

router.route("/").get(getCategories).post(createCategory);
router
  .route("/:id")
  .get(getCategory)
  .delete(deleteCategory)
  .put(updateCategory);

module.exports = router;
