const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
mongoose.plugin(slug);
let userDataList = new Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        owner: {
            type: String,
        },
        expireDay: {
            type: Date,
        },
        taskType: {
            type: String,
        },
        note: {
            type: String,
        },
        finish: {
            type: Boolean,
            default: false,
        },
        photoURL: {
            type: String,
            default: '',
        },
        //Tự động tạo slug
        slug: {
            type: String,
            slug: ['name', 'owner'],
            unique: true,
        },
    },
    {
        collection: 'userDataList',
    },
);
module.exports = mongoose.model('userDataList', userDataList);
