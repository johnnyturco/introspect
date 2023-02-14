import { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { userLoaded } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={() => {
        return userLoaded === true ? (
          (children as React.ReactNode)
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

export default ProtectedRoute;
