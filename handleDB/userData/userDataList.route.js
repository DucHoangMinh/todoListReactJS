const express = require('express');
const userDataRoute = express.Router();

const userDataListModel = require('./userDataList.model');

userDataRoute.get('/', function (req, res) {
    res.send('Đây là trang chủ của tôi');
});
userDataRoute.route('/add').post(function (req, res) {
    let newTask = new userDataListModel(req.body);
    newTask
        .save()
        .then((userInfor) => {
            res.status(200).json({ add: 'save to database succesfully' });
        })
        .catch((err) => {
            res.status(400).send('unable to save to database');
        });
});

userDataRoute.get('/tasklist/:slug', function (req, res) {
    userDataListModel
        .find({ owner: req.params.slug })
        .lean()
        .then((userdatalist) => res.json(userdatalist))
        .catch((err) => console.log('error : ' + err));
});

module.exports = userDataRoute;