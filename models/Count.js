const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countSchema = new Schema({
    choice: { type: String, required: true },
    countVal: { type: Number, required: true, default: 0 }
});

const Count = mongoose.model('Count', countSchema);

/*
var obj = [
    { choice: "c", countVal: 0 },
    { choice: "c++", countVal: 0 },
    { choice: "java", countVal: 0 },
    { choice: "python", countVal: 0 }
];

Count.insertMany(obj, (err, res) => {
    if(err) {
        throw err;
    }
})
*/

module.exports = Count;