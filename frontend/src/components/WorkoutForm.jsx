import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import {
  Col,
  Container,
  Row,
  Button,
  Card,
  ListGroup,
  Form,
} from "react-bootstrap";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [fieldError, setFieldError] = useState({
    title: false,
    load: false,
    reps: false,
  });

  const { dispatch } = useWorkoutsContext();

  const submitHandler = async (e) => {
    e.preventDefault();
    const workouts = { title, load, reps };

    const emptyfields = {
      title: !title,
      load: !load,
      reps: !reps,
    };
    if (emptyfields.title || emptyfields.load || emptyfields.reps) {
      setError("some fields are empty");
      setFieldError(emptyfields);
      return;
    }
    setFieldError({ title: false, reps: false, load: false });

    const response = await fetch("/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workouts),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    } else {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      console.log("new workout added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        {" "}
        <Row className="justify-content-md-center">
          <h3>Add a new Workout</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title" className="my-3">
              <Form.Label>Title : </Form.Label>
              <Form.Control
                style={{ border: fieldError.title ? "2px solid #ee4e4e" : "" }}
                type="title"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="title" className="my-3">
              <Form.Label>Load : </Form.Label>
              <Form.Control
                style={{ border: fieldError.load ? "2px solid #ee4e4e" : "" }}
                type="load"
                placeholder="Load"
                value={load}
                onChange={(e) => setLoad(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="reps" className="my-3">
              <Form.Label>Reps : </Form.Label>
              <Form.Control
                style={{ border: fieldError.reps ? "2px solid #ee4e4e" : "" }}
                className="emptyfield"
                type="reps"
                placeholder="reps"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="my-3">
              Add
            </Button>
            {error && <div className="error-text">{error}</div>}
          </Form>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default WorkoutForm;
