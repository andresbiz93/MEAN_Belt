var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReviewSchema = new mongoose.Schema({

    author : {
        type : String,
        required: true,
        minlength : 3,
    },

    content : {
        type : String,
        required : true,
        minlength : 3
    },

    stars : {
        type : Number,
        required : true,
        min : 1,
        max : 5
    },

    restaurant_id : { 
        type : Schema.Types.ObjectId,
        ref : "Restaurant"
    }

}, {timestamps : true});

var Review = new mongoose.model("Review", ReviewSchema);

module.exports = Review;

