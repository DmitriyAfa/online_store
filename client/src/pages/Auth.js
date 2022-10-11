import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Button, Container, Form, Card, Row } from "react-bootstrap";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { Context } from "../index";
import { login, registration } from "../http/userApi";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";

export const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useHistory();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(user);
      history.push(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className={"p-5"}>
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="Введите Ваш email..."
          />
          <Form.Control
            className="mt-3"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="Введите Ваш пароль..."
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                Нет аккаунта ?{" "}
                <NavLink to={REGISTRATION_ROUTE}> Зарегестрируйся!</NavLink>
              </div>
            ) : (
              <div>
                Есть аккаунт ? <NavLink to={LOGIN_ROUTE}> Войдите!</NavLink>
              </div>
            )}
            <Button variant={"outline-success"} onClick={click}>
              {isLogin ? "Войти" : "Зарегестрироваться"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});
