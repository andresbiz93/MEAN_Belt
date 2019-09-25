var Restaurant = require("../models/restaurant.js");
var Review = require("../models/review.js");

module.exports = {
    get_restaurants : function(req, res){
        Restaurant.find({})
        .then(all_restaurants => {
            res.json(all_restaurants);
        })
        .catch(err => {
            res.json(err);
        });
    },

    get_one_restaurant : function(req, res){
        Restaurant.findById(req.params.id)
        .then(restaurant => {
            res.json(restaurant);
        })
        .catch(err => {
            res.json(err);
        });
    },

    create_restaurant : function(req, res){
        Restaurant.find({name : req.body.name})
        .then(restaurants => {
            if(restaurants.length > 0){
                var error = {errors : {duplicate : "DUPE"}};
                res.json(error);
            }
            else{
                var new_restaurant = new Restaurant();
                new_restaurant.name = req.body.name;
                new_restaurant.cuisine = req.body.cuisine;
                new_restaurant.save()
                .then(saved_restaurant => {
                    res.json(saved_restaurant);
                })
                .catch(err => {
                    res.json(err);
                });
            }
        })
        .catch(err => {
            res.json(err);
        });
    },

    update_restaurant : function(req, res){
        console.log("ENTERED UPDATE_RESTAURANT", "ID", req.params.id, "BODY", req.body);
        Restaurant.findById(req.params.id)
        .then(restaurant => {
            restaurant.name = req.body.name;
            restaurant.cuisine = req.body.cuisine;
            restaurant.save()
            .then(saved_restaurant => {
                console.log("SUCCESS");
                res.json(saved_restaurant);
            })
            .catch(err => {
                console.log("FAIL");
                res.json(err);
            })
        })
        .catch(err => {
            res.json(err);
        })
    },

    get_reviews : function(req, res){
        console.log("FINDING REVIEWS FOR", req.params.id);
        Review.find({restaurant_id : req.params.id}).sort({stars : -1})
        .then(reviews => {
            console.log("FOUND REVIEWS", reviews);
            res.json(reviews);
        })
        .catch(err => {
            console.log("REVIEW FIND ERR", err);
            res.json(err);
        });
    },

    post_review : function(req, res){
        console.log("POSTING REVIEW TO", req.params.id, "REVIEW: ", req.body);
        var new_review = new Review();
        new_review.author = req.body.author;
        new_review.stars = parseInt(req.body.stars);
        new_review.content = req.body.content;
        new_review.restaurant_id = req.body.restaurant_id;
        new_review.save()
        .then(saved_review => {
            Restaurant.findById(new_review.restaurant_id)
            .then(restaurant => {
                restaurant.reviews.push(saved_review);
                restaurant.save()
                .then(saved_restaurant => {
                    res.json(saved_restaurant);
                })
                .catch(err => {
                    res.json(err);
                });
            })
            .catch(err => {
                res.json(err);
            });
        })
        .catch(err => {
            res.json(err);
        })
    },

    delete_restaurant : function(req, res){
        console.log("DELETING", req.params.id);
        Restaurant.deleteOne({_id : req.params.id})
        .then(deleted => {
            res.json(deleted);
        })
        .catch(err => {
            res.json(err);
        });
    }
}