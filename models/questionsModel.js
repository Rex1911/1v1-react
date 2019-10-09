const mongoose = require('mongoose');

const questionsSchema = mongoose.Schema({
    question: {
        main: String,
        exampleOp: String,
    },
    title: String,
    testCasesAnswer: [String],
});

module.exports = mongoose.model("Question", questionsSchema);