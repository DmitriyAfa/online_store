import { Button, Container, Form, Card, Row, Col } from "react-bootstrap";
import { BrandBar } from "../components/BrandBar";
import { DeviceList } from "../components/DeviceList";
import { TypeBar } from "../components/TypeBar";

export const Shop = () => {
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
};
