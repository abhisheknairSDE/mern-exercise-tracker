import React, { Fragment } from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/navbar/navbar';
import Home from './components/homePage/home';

const router = createBrowserRouter([
  {path: '/', element : <Home />},
  {path: '/edit/:id', element: <Home />},
  {path: '/create', element: <Home />}
]);

function App() {

  const ExerciseList = [];

  return (
    <Fragment>
      <Navbar />
      <RouterProvider router={router} />
    </Fragment>
  );  
}

export default App;
