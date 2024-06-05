import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      console.log("workout is deleted", json);
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg) :</strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps :</strong>
        {workout.reps}
      </p>
      {workout.createdAt.substring(0, 10)}
      <span>
        <FontAwesomeIcon onClick={handleClick} icon={faTrash} />
      </span>
    </div>
  );
};

export default WorkoutDetails;
