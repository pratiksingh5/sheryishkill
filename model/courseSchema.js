const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    subscribe: [{type: mongoose.Schema.Types.ObjectId, ref: 'course'}]
}, {timestamps: true});

module.exports = mongoose.model('course', courseSchema);