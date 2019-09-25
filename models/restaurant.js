var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RestaurantSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        minlength : 3
    },

    cuisine : {
        type : String,
        required : true,
        minlength : 3
    },

    reviews : [{
        type : Schema.Types.ObjectId,
        ref : "Review"
    }]

}, {timestamps : true});

var Restaurant = new mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;