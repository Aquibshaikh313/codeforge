const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    difficulty: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard'],
        lowercase:true
    },

    tags: {
        type: [String],
        default: []
    }
});



const Problem = mongoose.model('Problem',problemSchema);

module.exports = Problem;

// {
//   "title": "Two Sum",
//   "description": "Find two numbers that add up to target.",
//   "difficulty": "Easy",
//   "tags": ["array", "hashmap"]
// }
//basically this is the outcome we want