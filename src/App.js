import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery";
import Popper from "popper.js";
import "./App.css";
import Home from "./components/home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouteLayout from "./routelayouts/RouteLayout";
import LoginStudents from "./components/studentlogin/LoginStudents";
import SignUpStudents from "./components/studentsignup/SignUpStudents.js";
import Wardens from "./components/wardens/Wardens";
import StudentPage from "./components/studentpage/StudentPage";
import Payments from "./components/payments/Payments";
import Bonafides from "./components/bonafides/Bonafides"
//import Bonafides from "./components/bonafides/Bonafides";
import About from "./components/about/About";
import Complaints from "./components/complaints/Complaints";
import { useState } from "react";
function App() {
  let [state, setState] = useState(true);
  let router = createBrowserRouter([
    {
      path: "/",
      element: <RouteLayout state={state} setState={setState} />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signIn",
          element: <LoginStudents setState={setState} />,
        },
        {
          path: "/signUp",
          element: <SignUpStudents />,
        },
        {
          path: "/wardens",
          element: <Wardens />,
        },
        {
          path: "/student/:id",
          element: <StudentPage />,
          children: [
            {
              path: "/student/:id/payments",
              element: <Payments />,
            },
            {
              path: "/student/:id/bonafide",
              element: <Bonafides />,
            },
            {
              path: "/student/:id/complaints",
              element: <Complaints />,
            },
            {
              path: "/student/:id/",
              element: <About />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
