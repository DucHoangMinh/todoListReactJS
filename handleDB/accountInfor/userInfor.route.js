const express = require('express');
const userInforModel = require('./userInfor.model');
const userInforRoute = express.Router();

// Define show API route
userInforRoute.get('/', function (req, res) {
    userInforModel
        .find({})
        .lean()
        .then((userinfor) => res.json(userinfor));
});

// Defined save route
userInforRoute.route('/add').post(function (req, res) {
    let userInfor = new userInforModel(req.body);
    userInfor
        .save()
        .then((userInfor) => {
            res.status(200).json({ person: 'person in added successfully' });
        })
        .catch((err) => {
            res.status(400).send('unable to save to database');
        });
});
//Trả về tên người dùng
userInforRoute.get('/get/:slug', function (req, res) {
    userInforModel
        .find({ email: req.params.slug })
        .lean()
        .then((userdate) => res.json(userdate));
});
module.exports = userInforRoute;
