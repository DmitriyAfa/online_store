import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";

export const NavBar = observer(() => {
  const { user } = useContext(Context);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
          КупиДевайс
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button variant={"outline-light"}>Админ-панель</Button>
            <Button variant={"outline-light"} className="ml-2">
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              onClick={() => user.setIsAuth(true)}
              variant={"outline-light"}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});
