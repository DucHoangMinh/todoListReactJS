const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Define collection and schema for Business
let userInfor = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
}, {
    collection: 'userInfor'
});

module.exports = mongoose.model('userInfor', userInfor);