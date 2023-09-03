import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = (props) => {
  return (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
        <a
          href="#"
          onClick={() => {
            props.deleteExercise(props.exercise._id);
          }}
        >
          delete
        </a>
      </td>
    </tr>
  );
};

const ExerciseList = () => {
  const [exercises, setExercise] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5500/exercises/")
      .then((response) => {
        setExercise(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const exerciseList = () => {
    return exercises.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  };

  const deleteExercise = (id) => {
    axios.delete("http://localhost:5500/exercises/" + id).then((response) => {
      console.log(response.data);
    });

    setExercise(
      exercises.filter((el) => el._id !== id),
    );
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
};

export default ExerciseList;
