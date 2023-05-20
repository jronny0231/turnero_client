import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth.hooks";

export const UnAuthedComponent = ({ children }: any): JSX.Element => {
  const { user } = useAuth();
  console.log({user})
  if (user) {
    // user is authenticated
    return <Navigate to="/" />;
  }

  return (
    <>{children}</>
  );
};

export const AuthedComponent = ({ children }: any): JSX.Element => {
  const { user } = useAuth();

  if (user === null) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return (
    <>{children}</>
  );
};