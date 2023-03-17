const mongoose = require("mongoose");
const objectAssign = require("object-assign");
const ideaSchema = new mongoose.Schema({
   
    ideaName: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    needs: {
        type: String,
    },
    memberId: {
        type: String,
        required: true,
        lowercase: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    helpers: {
        type: [String],
    },
    approval: {
        type: Boolean,
    }
    })

    module.exports = mongoose.model('ideas', ideaSchema );