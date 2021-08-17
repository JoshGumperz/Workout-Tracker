const router = require('express').Router();
const mongojs = require("mongojs");
const { Workout } = require("../../models/Workout");

// Get all workouts in ascending order
router.get('/', async (req, res) => {
    // Use $addFields to get the total duration for the workout https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields
    Workout.aggregate([
        { $addFields: { totalDuration: { $sum: "$exercises.duration" } } },
        { $sort: { day: 1 } }
    ],
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                res.json(data);
            }
        });
});

// Add an exercise to a workout
router.put('/:id', async (req, res) => {
    Workout.updateOne({ "_id": mongojs.ObjectId(req.params.id) },
        { $push: { "exercises": req.body } }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                res.json(data);
            }
        })
});

// Add a new workout
router.post('/', async (req, res) => {
    Workout.insertMany([{}], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.json(data[0]);
        }
    })
}
);


module.exports = router;