const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please add Category name"],
        unique: true,
        trim: true,
        maxlength: [50, "Name can not be more than 50 characters"],
    },
    model: {
        type: Number,
        required: [true, "Please add  a model"],
    },
    make: {
        type: String,
        required: [true, "Please add  a Company Name"],
        trim: true,
        maxlength: [100, "Makek's name can not be more than 100 characters"],
    },
    registrationNo: {
        type: String,
        required: [true, "Please add  a Registration Number"],
        trim: true,
        maxlength: [50, "Registration No can not be more than 50 characters"],
    },
    // engineNo: {
    //     type: String,
    //     required: [true, "Please add  a engine Number"],
    //     trim: true,
    //     maxlength: [50, "Engine No can not be more than 50 characters"],
    // },
    // chassisNo: {
    //     type: String,
    //     required: [true, "Please add  a Chassis Number"],
    //     trim: true,
    //     maxlength: [50, "Chassis No can not be more than 50 characters"],
    // },
    // EngineCylinders: {
    //     type: Number,
    //     required: [true, "Please add  a Chassis Number"],
    // },
    horsePower: {
        type: Number,
        required: [true, "Please add  a horse power"],
    },
    seatingCapacity: {
        type: Number,
        required: [true, "Please add  a seating capacity of car"],
    },
    transmissionType: {
        type: String,
        trim: true,
        required: [true, "Please add  a transmission type of car"],
        enum: ["manual", "automatic"],
        maxlength: [50, "Transmission Type can not be more than 50 characters"],
    },
    // tyresSize: {
    //     type: Number,
    //     trim: true,
    //     required: [true, "Please add  a tyres size of car"],
    // },
    createdBy: {
        type: String,
    },
    modifiedBy: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Car", carSchema);
