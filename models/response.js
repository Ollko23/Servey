const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema({
    answer1: {
        type: String,
        require: true
    },
    answer2: {
        type: String,
        require: true
    },
    answer3: {
        type: String,
        require: true
    },
    answer4: {
        type: String,
        require: true
    },
    answer5: {
        type: String,
        require: true
    },
    answer6: {
        type: String,
        require: true
    },
    answer7: {
        type: String,
        require: true
    },
    answer8: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    }
})
module.exports = mongoose.model('Response', responseSchema)