import React, { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import { Row, Col } from "react-bootstrap";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const HomePage = () => {
  const {workouts, dispatch} = useWorkoutsContext(null);

  useEffect(() => {
    const fetchworkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    fetchworkouts();
  }, []);

  return (
    <Row>
      <div className="home">
        <Col md={"8"}>
          <div className="workouts">
            {workouts &&
              workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
              ))}
          </div>
        </Col>
        <Col>
          <WorkoutForm />
        </Col>
      </div>
    </Row>
  );
};

export default HomePage;
