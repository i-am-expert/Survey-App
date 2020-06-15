const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const optionSchema = new Schema({
    email: { type: String, required: true },
    choice: { type: String, required: true }
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;