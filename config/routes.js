var controller = require("../controllers/controller.js");
var path = require("path");

module.exports = function(app){
    app.get("/get_restaurants", controller.get_restaurants);
    app.get("/get_restaurant/:id", controller.get_one_restaurant);
    app.get("/get_reviews/:id", controller.get_reviews);
    app.post("/create_restaurant", controller.create_restaurant);
    app.post("/post_review/:id", controller.post_review);
    app.put("/update_restaurant/:id", controller.update_restaurant);
    app.delete("/delete_restaurant/:id", controller.delete_restaurant);
    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("../belt_exam_v2/public/dist/public/index.html"));
    });
}