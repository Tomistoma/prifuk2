const mongoose = require("mongoose");
const objectAssign = require("object-assign");
const memberSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
    },
    surname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    membership: { //active, passive, leader
        type: String,
        required: true,
    },
    musicTaste: {
        type: String,
    },
    telNumber: {
        type: String,
    },
    section: {
        type: String,
        required: true,
        lowercase: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    publicationAuth: {
        type: Boolean,
        required: true,
    },
    startOfStudies: {
        type: Date,
    },
    })

    module.exports = mongoose.model('members', memberSchema );