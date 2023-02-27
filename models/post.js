const mongoose = require("mongoose");
const objectAssign = require("object-assign");
const postSchema = new mongoose.Schema({
   
    caption: {
        type: String,
        required: true,
    },
    contentShort:{
        type: String,
        required: true,
    },
    content: {
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
    },
    imageURL:{
        type: String,
        required: true,
    }
    })

    module.exports = mongoose.model('posts', postSchema );