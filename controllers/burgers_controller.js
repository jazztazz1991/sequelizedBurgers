var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var db = require("../models");

router.get('/', function(req, res) {
	db.Burger.findAll({}).then(function(data){ 
		res.render("index",{burger: data});
    });
});

router.post("/burgers/insertOne", function(req, res) {
    var updateBurger = req.body;
	db.Burger.create({
		burger_name: updateBurger.burger_name,
		devoured: false
	}).then(function(data){
        res.redirect("/");
    });
});

router.put("/burgers/updateOne/:id", function(req, res) {
    var newBurger = req.body;
    console.log("================================" + req.params.id);
	db.Burger.update(
    {
		devoured: newBurger.devoured
	},
    {
		where: {id: req.params.id}
	}).then(function(data){
        res.redirect("/");
    });
});

router.route("/api").get(function(req,res){
	db.Burger.findAll({}).then(function(data){ 
		res.json(data)
    });
});
// Export routes for server.js to use.
module.exports = router;