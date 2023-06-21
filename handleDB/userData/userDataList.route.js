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
userDataRoute.get('/detail/:slug', function (req, res) {
    userDataListModel
        .findOne({ slug: req.params.slug })
        .lean()
        .then((detailData) => res.json(detailData))
        .catch();
});
//Xử lý đưa về trạng thái đã hoàn thành
userDataRoute.put('/update/finish/:slug', function (req, res) {
    userDataListModel
        .updateOne({ slug: req.params.slug }, { finish: true })
        .then()
        .catch((err) => console.log(err));
});
//Xử lý update nhiệm vụ
userDataRoute.get('/update/:slug', function (req, res) {
    userDataListModel
        .updateOne(
            { slug: req.params.slug },
            {
                name: req.body.name,
                description: req.body.description,
                taskType: req.body.taskType,
                expireDay: req.body.expireDay,
                note: req.body.note,
            },
        )
        .then()
        .catch((error) => console.log(error));
});
//Xử lý xóa nhiệm vụ
userDataRoute.get('/delete/:slug', function (req, res) {
    userDataListModel
        .deleteOne({ slug: req.params.slug })
        .then()
        .catch((err) => console.log(err));
});
module.exports = userDataRoute;
