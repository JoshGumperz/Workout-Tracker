const router = require('express').Router();
const mongojs = require("mongojs");
const { Workout } = require("../../models");

// /api/workouts get route
router.get('/', async (req, res) => {
    // calculate total workout duration
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

// Add a new exercise
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

// Get workouts for last 7 days
router.get('/range', async (req, res) => {
    Workout.aggregate([
        { $addFields: { totalDuration: { $sum: "$exercises.duration" } } },
        { $sort: { day: -1 } },
        { $limit: 7 },
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

module.exports = router;