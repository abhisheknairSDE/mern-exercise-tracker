import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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

const EditExercise = () => {
  const [state, setState] = useState(initialState);
  const myRef = useRef();
  const { id } = useParams();

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
    axios
      .get("http://localhost:5500/exercises/" + id)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        }));
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:5500/users/")
      .then((response) => {
        if (response.data.length > 0) {
          setState((prevState) => ({
            ...prevState,
            users: response.data.map((user) => user.username),
            username: response.data[0].username,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
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

    axios.post('http://localhost:5500/exercises/update/' + id, exercise)
      .then(res => console.log(res.data));

    console.log(exercise);
    window.location.href = "/";
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref={myRef}
              required
              className="form-control"
              value={state.username}
              onChange={onChangeUsername}>
              {
                state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
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
            <DatePicker
              selected={state.date}
              onChange={onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
