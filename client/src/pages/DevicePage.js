import { useContext, useEffect, useState } from "react";
import { Col, Card, Image, Container, Row, Button } from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceApi";
import { CreateRating } from "../components/CreateRating/CreateRating";
import { Context } from "../index";
import { calculationRate } from "../helpers/functions";
import { fetchDeviceRatings, fetchUserRating } from "../http/ratingApi";
import { observer } from "mobx-react-lite";

export const DevicePage = observer(() => {
  const [refresh, setRefresh] = useState(false);
  const [deviceState, setDevice] = useState({ info: [] });
  const [count, setCount] = useState(0);
  const [rate, setRate] = useState(0);
  const [myRate, setMyRate] = useState(0);
  const { id } = useParams();
  const { user } = useContext(Context);
  const userId = user.user.id;

  const refr = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));

    fetchUserRating(userId, id)
      .then((data) => {
        setMyRate(data[0].rate);
      })
      .catch((e) => console.log(e));

    fetchDeviceRatings(id).then(({ count, rows }) => {
      const amount = rows.reduce((agg, item) => {
        return (agg += item.rate);
      }, 0);
      setCount(count);
      setRate(calculationRate(amount, count));
    });
  }, []);

  useEffect(() => {
    fetchUserRating(userId, id)
      .then((data) => {
        setMyRate(data[0].rate);
      })
      .catch((e) => console.log(e));

    fetchDeviceRatings(id).then(({ count, rows }) => {
      const amount = rows.reduce((agg, item) => {
        return (agg += item.rate);
      }, 0);
      setCount(count);
      setRate(calculationRate(amount, count));
    });
  }, [refresh]);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + deviceState.img}
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{deviceState.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {`${rate} / ${count}`}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            {user.isAuth && myRate > 0 ? (
              <p>Ваша оценка {myRate} </p>
            ) : user.isAuth && myRate <= 0 ? (
              <CreateRating onClick={refr} userId={userId} deviceId={id} />
            ) : null}
            <h3>От: {deviceState.price} руб.</h3>
            <Button variant={"outline-dark"}>Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {deviceState.info.map((inf, index) => {
          return (
            <Row
              key={inf.id}
              style={{
                background: index % 2 === 0 ? "lightgray" : "transparent",
                padding: 10,
              }}
            >
              {inf.title}: {inf.description}
            </Row>
          );
        })}
      </Row>
    </Container>
  );
});
