import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useRoutes } from "react-router-dom";

import { getUserDetailsAction } from "./redux/actions/common";
import Apply from "./component/Apply";
import Home from "./component/Home";
import PageNotFound from "./component/404Page/Index";
import Message from "./component/Message/Message";

export const Auth = ({ LoggedIn }) => {
  const [isRouteLoading, setIsRouteLoading] = useState(true);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => {
    const data = state.getUserDetailsReducer?.data || [];
    return data;
  });

  const handleRouting = (data) => {
    setIsRouteLoading(false);
    if (data?.status === "Signup") {
      navigate("/apply");
    }
  };

  useEffect(() => {
    if (LoggedIn) {
      if (!userDetails) {
        dispatch(getUserDetailsAction(localStorage.getItem("user_id")));
      } else {
        handleRouting(userDetails);
      }
    }
  }, [LoggedIn]);

  return (
    <>
      {LoggedIn && isRouteLoading && (
        <div className="loader">
          <TailSpin ariaLabel="Loading..." color="#00BFFF" />
        </div>
      )}
      {LoggedIn && <PrivateRoutes />}
      {!LoggedIn && <PublicRoutes />}
    </>
  );
};
export const PrivateRoutes = () => {
  return useRoutes([
    {
      path: "apply",
      sensitive: true,
      element: <Apply />,
    },
    {
      path: "message",
      sensitive: true,
      element: <Message />,
    },
    { path: "*", sensitive: true, element: <PageNotFound status={404} /> },
  ]);
};
export const PublicRoutes = () => {
  return useRoutes([
    {
      path: "",
      sensitive: true,
      element: <Home />,
    },
    { path: "*", sensitive: true, element: <PageNotFound status={404} /> },
  ]);
};
