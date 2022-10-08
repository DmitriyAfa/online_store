import { Switch, Route, Redirect } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { SHOP_ROUTE } from "../utils/consts";
export const AppRouter = () => {
  const isAuth = true;
  return (
    <Switch>
      {isAuth === true &&
        authRoutes.map(({ path, Component }) => {
          return <Route key={path} path={path} component={Component} exact />;
        })}
      {publicRoutes.map(({ path, Component }) => {
        return <Route key={path} path={path} component={Component} exact />;
      })}
      <Redirect to={SHOP_ROUTE} />
    </Switch>
  );
};
