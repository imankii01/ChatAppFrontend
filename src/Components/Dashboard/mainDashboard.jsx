import React from "react";
import ProtecTedHeader from "../Header/protectedHeader";
import { Outlet } from "react-router-dom";

const MainDashboard = () => {
  return (
    <div className="min-h-full header-width">
      <ProtecTedHeader />

      <Outlet />
    </div>
  );
};

export default MainDashboard;
