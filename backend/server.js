require("dotenv").config();

const express = require("express");
const workoutRoutes = require("./routes/workoutRoute");
const mongoose = require("mongoose");

// express app
const app = express();

app.use(express.json());
app.use("/api/workouts", workoutRoutes);

//connect to database
 mongoose
  .connect(process.env.MONGODB_URL)
  .then(
    app.listen(process.env.PORT, () => {
      console.log("listening in port 4001");
    })
  )
  .catch((err) => {
    console.log(err.message);
  });
