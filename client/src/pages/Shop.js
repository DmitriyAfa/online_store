import { Button, Container, Form, Card, Row, Col } from "react-bootstrap";
import { BrandBar } from "../components/BrandBar";
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
          </Col>
        </Row>
      </Container>
    </div>
  );
};
