import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { PrivateRoutes, PublicRoutes, VerificationRoutes } from "../../routes";
import { getuserDetailsAction } from "../../redux/actions/user";
import { getAccessToken } from "./tokenProvider";

const Auth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [data, setData] = useState(null);
  const [isAuth, setIsAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUserReducer = useSelector((state) => state.loginUserReducer);

  const signupUserReducer = useSelector((state) => state.signupUserReducer);

  const authToken = getAccessToken();
  useEffect(() => {
    if (authToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [authToken, isAuth]);

  const getUserDetailReducer = useSelector(
    (state) => state.getUserDetailReducer
  );
  const {
    data: userDetailsData,
    loading: userDetailsLoading,
    error: userDetailsError,
  } = getUserDetailReducer;

  useEffect(() => {
    if (!userDetailsLoading && !userDetailsError && userDetailsData) {
      setData(userDetailsData);
      setUserType(userDetailsData?.user_type);
    } else {
      console.warn("Error getting user details: ", userDetailsError);
    }
  }, [userDetailsData, userDetailsLoading, userDetailsError]);

  useEffect(() => {
    const { data, status, error, loading } = loginUserReducer;
    setLoading(loading);

    if (!loading && !error && data) {
      setIsAuth(data?.user_id);
      if (authToken !== "") navigate("/dashboard/prpfile");
    } else {
      console.warn("Error getting login data: ", error);
    }
  }, [dispatch, loginUserReducer]);

  useEffect(() => {
    const { data, status, error, loading } = signupUserReducer;
    setLoading(loading);

    if (!loading && !error && data) {
      setIsAuth(data?.user_id);
    } else {
      console.warn("Error getting login data: ", error);
    }
  }, [dispatch, signupUserReducer]);

  useEffect(() => {
    const handleRouting = (data) => {
      if (data?.user_type) {
        setUserType(data?.user_type);
        const targetLocation =
          data?.status === "signup"
            ? "/registration"
            : userType === "guest"
            ? "/waiting"
            : "/dashboard/chat";
        navigate(targetLocation);
      }
    };

    if ((loggedIn || isAuth) && !data) {
      const userData = {
        user_id: localStorage.getItem("REACT_USER_ID"),
      };

      dispatch(getuserDetailsAction(userData));
    } else {
      handleRouting(data);
    }
  }, [loggedIn, isAuth, userType]);

  return (
    <>
      {loading ||
        (userDetailsLoading && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
            }}
          >
            <TailSpin ariaLabel="Loading..." color="#005c53" />
          </div>
        ))}
      {!loading && !userDetailsLoading && (
        <>
          {loggedIn && (
            <>
              {userType !== "guest" && userType === "master" && (
                <PrivateRoutes />
              )}
              {userType === "guest" && <VerificationRoutes />}
            </>
          )}
          {!loggedIn && <PublicRoutes />}
        </>
      )}
    </>
  );
};

export default Auth;
