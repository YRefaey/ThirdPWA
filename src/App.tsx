import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminHome from "./AdminModule/AdminHome";
import AdminMonuments from "./AdminModule/Components/AdminMonuments/AdminMonuments";
import Cities from "./AdminModule/Components/Cities/Cities";
import Users from "./AdminModule/Components/Users/Users";
import "./App.css";
import Login from "./AuthModule/Components/Login/Login";
import Register from "./AuthModule/Components/Register/Register";
import ResetPassword from "./AuthModule/Components/ResetPassword/ResetPassword";
import SendResetPasswordCode from "./AuthModule/Components/SendResetPasswordCode/SendResetPasswordCode";
import AllMuseums from "./HomeModule/Components/AllMuseums/AllMuseums";
import Booking from "./HomeModule/Components/Booking/Booking";
import Home from "./HomeModule/Home";
import InspectorHome from "./InspectorHome/InspectorHome";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import InspectorLayout from "./Layouts/InspectorLayout/InspectorLayout";
import MasterLayout from "./Layouts/MasterLayout/MasterLayout";
import UserLayout from "./Layouts/UserLayout/UserLayout";
import VisitorLayout from "./Layouts/VisitorLayout/VisitorLayout";
import AdminProtectedRoute from "./ProtectedRoutes/AdminProtectedRoute";
import InspectorProtectedRoute from "./ProtectedRoutes/InspectorProtectedRoute";
import UserProtectedRoute from "./ProtectedRoutes/UserProtectedRoute";
import { login } from "./Redux/AuthSlice/AuthSlice";
import { setCities } from "./Redux/CitySlice/CitySlice";
import { setmonuments } from "./Redux/MonumentsSlice/MonumentsSlice";
import NotFound from "./SharedModules/Components/NotFound/NotFound";
import SpecificMuseum from "./SpecificMuseumModule/SpecificMuseum";
import { getAllCities } from "./Utls/getData";
import ValidateTicket from "./ValidateTicket/ValidateTicket";

function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    getAllCities("city",(res) => {
      return dispatch(setCities(res));
    });
    getAllCities("destinations",(res) => {
      return dispatch(setmonuments(res));
    });
    dispatch(login());
  }, []);

  const router = createBrowserRouter([
    {
      path: "/auth",
      errorElement:<NotFound/>,
      element: <AuthLayout />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "send-code", element: <SendResetPasswordCode /> },
      ],
    },
    {
      path: "/",
      element: <VisitorLayout/>,
      errorElement:<NotFound/>,
      children: [
        {
          index: true,
          errorElement: <NotFound/>,
          element: <Home/>,
        },
        { path: "/museums/", element: <AllMuseums /> },
        { path: "/museums/:cityId", element: <AllMuseums /> },
        { path: "/museums/:cityId/:destination/:destinationId", element: <SpecificMuseum /> },
      ],
    },
    {
      path: "/dashboard",
      errorElement:<NotFound/>,
      element: (
        <AdminProtectedRoute>
          <MasterLayout />
        </AdminProtectedRoute>
      ),
      children: [
        {
          index: true,
          errorElement: <NotFound />,
          element: <AdminHome />,
        },
        { path: "users", element: <Users /> },
        { path: "adminmonuments", element: <AdminMonuments /> },
        { path: "cities", element: <Cities /> },
      ],
    },
    {
      path: "/home",
      errorElement:<NotFound/>,
      element: (
        <UserProtectedRoute>
          <UserLayout />
        </UserProtectedRoute>
      ),
      children: [
        {
          index: true,
          errorElement: <NotFound />,
          element: <AdminHome />,
        },
        { path: "booking", element: <Booking /> },
      ],
    },
    {
      path: "/inspector",
      errorElement:<NotFound/>,
      element: (
        <InspectorProtectedRoute>
          <InspectorLayout />
        </InspectorProtectedRoute>
      ),
      children: [
        {
          index: true,
          errorElement: <NotFound />,
          element: <InspectorHome />,
        },{
          path:":token",element:<ValidateTicket/>
        }
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
