import React, { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar/navbar";
import ExerciseList from "./components/exercise/exerciseList";
import CreateExercise from "./components/exercise/createExercise";
import EditExercise from "./components/exercise/editExercise";
import CreateUser from "./components/users/addUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "/", element: <ExerciseList /> },
      { path: "/edit/:id", element: <EditExercise /> },
      { path: "/create", element: <CreateExercise /> },
      { path: "/user", element: <CreateUser /> },
    ],
  }
]);

function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
