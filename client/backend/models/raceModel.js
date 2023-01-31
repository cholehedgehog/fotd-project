const mongoose = require('mongoose')

const Schema = mongoose.Schema
const raceSchema = new Schema({
    raceName: {
        type: String,
        required: true
    },
    kind: {
        type: String,
        required: true
    },
    boon: {
        type: String,
        required: false
    },
    curse: {
        type: String,
        required: false
    }
}, { timestamps: true})

module.exports = mongoose.model('Race', raceSchema)

