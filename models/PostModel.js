const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: 'public'
    },
    desc: {
        type: String,
        require: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('post', PostSchema);