import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Button, Container, Form, Card, Row, Col } from "react-bootstrap";
import { Context } from "../index";
import { BrandBar } from "../components/BrandBar";
import { DeviceList } from "../components/DeviceList";
import { TypeBar } from "../components/TypeBar";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceApi";

export const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => {
      device.setTypes(data);
    });
    fetchBrands().then((data) => {
      device.setBrands(data);
    });
    fetchDevices().then(({ count, rows }) => {
      device.setDevices(rows);
    });
  }, []);

  return (
    <div>
      <Container>
        <Row className="mt-2">
          <Col md={3}>
            <TypeBar />
          </Col>
          <Col md={9}>
            <BrandBar />
            <DeviceList />
          </Col>
        </Row>
      </Container>
    </div>
  );
});
