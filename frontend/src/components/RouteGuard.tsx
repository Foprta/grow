import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/authService";

const RouteGuard: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const token = authService.getJWT();

  if (!token || !children) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;
