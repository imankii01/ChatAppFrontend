import { useRoutes } from "react-router-dom";
import Login from "./Components/Login";
import PageNotFound from "./Components/PublicPage/PageNotFound";
import MainDashboard from "./Components/Dashboard/mainDashboard";
import Signup from "./Components/SignUp";
import Registration from "./Components/Registration";
import Profile from "./Components/Profile";
import VerificationErrorPage from "./Utils/VerificationPage";
import ForgetPassword from "./Components/PublicPage/ForgetPassword";
import HomePage from "./Components/Home/HomePage";

export const PublicRoutes = () => {
  return useRoutes([
    { path: "/", sensitive: true, element: <HomePage /> },
    { path: "reset-password", sensitive: true, element: <ForgetPassword /> },
    { path: "login", sensitive: true, element: <Login /> },
    { path: "signup", sensitive: true, element: <Signup /> },
    { path: "*", sensitive: true, element: <PageNotFound status={404} /> },
  ]);
};

export const VerificationRoutes = () => {
  return useRoutes([
    { path: "*", sensitive: true, element: <PageNotFound status={404} /> },
    { path: "waiting", sensitive: true, element: <VerificationErrorPage /> },
    { path: "registration", element: <Registration /> },
    {
      path: "dashboard",
      sensitive: true,
      element: <MainDashboard />,
      children: [{ path: "profile", element: <Profile /> }],
    },
  ]);
};
export const PrivateRoutes = () => {
  return useRoutes([
    { path: "registration", element: <Registration /> },
    { path: "*", sensitive: true, element: <PageNotFound status={404} /> },
    {
      path: "dashboard",
      sensitive: true,
      element: <MainDashboard />,
      children: [{ path: "profile", element: <Profile /> }],
    },
  ]);
};
