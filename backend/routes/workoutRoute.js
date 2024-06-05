const express = require("express");
const Workout = require("../models/workoutModel");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const router = express.Router();
router.get("/", getWorkouts);
router.get("/:id", getWorkout);

router.post("/", createWorkout);
router.delete("/:id", deleteWorkout);
router.patch("/", updateWorkout);

module.exports = router;
