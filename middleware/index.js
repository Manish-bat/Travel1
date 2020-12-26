var Vehicle = require("../models/vehicle");
var Detail = require("../models/detail");

var middlewareObj = {};

middlewareObj.checkVehicleOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Vehicle.findById(req.params.id, function(err, foundVehicle){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundVehicle.author.id.equals(req.user._id) || req.user.isAdmin) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkDetailOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Detail.findById(req.params.detail_id, function(err, foundDetail){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundDetail.author.id.equals(req.user._id) || req.user.isAdmin) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;