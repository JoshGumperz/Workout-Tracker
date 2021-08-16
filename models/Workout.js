const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: String,
    name: String,
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
    distance: Number
});

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now,
        required: true
    },
    exercises: [ExerciseSchema]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;