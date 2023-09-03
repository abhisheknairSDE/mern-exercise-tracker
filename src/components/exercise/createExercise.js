import { useEffect, useRef, useState } from "react";

import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialState = {
  username: "",
  description: "",
  duration: "",
  date: new Date(),
  users: [],
};

const CreateExercise = () => {
  const [state, setState] = useState(initialState);
  const myRef = useRef();

  const onChangeDescription = (event) => {
    setState((prevState) => ({
      ...prevState,
      description: event.target.value,
    }));
  };

  const onChangeUsername = (event) => {
    setState((prevState) => ({
      ...prevState,
      username: event.target.value,
    }));
  };
  const onChangeDuration = (event) => {
    setState((prevState) => ({
      ...prevState,
      duration: event.target.value,
    }));
  };

  const onChangeDate = (date) => {
    setState((prevState) => ({
      ...prevState,
      date: date,
    }));
  };

  useEffect(() => {
    axios.get("http://localhost:5500/users/").then((response) => {
      if (response.data.length > 0) {
        setState((prevState) => ({
          ...prevState,
          users: response.data.map((user) => user.username),
          username: response.data[0].username,
        }));
      }
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: state.date,
      users: [],
    };

    axios
      .post("http://localhost:5500/exercises/add", exercise)
      .then((res) => console.log(res.data));

    console.log(exercise);
    window.location.href = "/";
  };

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            ref={myRef}
            required
            className="form-control"
            value={state.username}
            onChange={onChangeUsername}
          >
            {state.users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={state.description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={state.duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={state.date} onChange={onChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;
