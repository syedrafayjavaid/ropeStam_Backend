const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add Category name"],
        unique: true,
        trim: true,
        maxlength: [50, "Name can not be more than 50 characters"],
    },
    createdBy: {
        type: String,
        trim: true,
        maxlength: [50, "Name can not be more than 50 characters"],
    },
    modifiedBy: {
        type: String,
        trim: true,
        maxlength: [50, "Name can not be more than 50 characters"],
    },
    craetedAt: {
        type: Date,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
    },
    photo: {
        type: String,
    },
});

module.exports = mongoose.model("Category", CategorySchema);
