import { useContext, useState } from "react";
import { Modal, Button, Form, Dropdown, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
export const CreateDevice = ({ show, onHide }) => {
  const { device } = useContext(Context);
  const [info, setInfo] = useState([]);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>Выберите тип</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => {
                return <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>;
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>Выберите бренд</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => {
                return (
                  <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            className="mt-3"
            placeholder="Введие название устройства"
          />
          <Form.Control
            className="mt-3"
            placeholder="Введие стоимость устройства"
            type="number"
          />
          <Form.Control className="mt-3" type="file" />
          <hr />
          <Button onClick={addInfo} variant="outline-dark">
            {" "}
            Добавить новое свойство
          </Button>
          {info.map((i) => {
            return (
              <Row className="mt-4" key={i.number}>
                <Col md={4}>
                  <Form.Control placeholder="Введите название свойства"></Form.Control>
                </Col>
                <Col md={4}>
                  <Form.Control placeholder="Введите описание свойства"></Form.Control>
                </Col>
                <Col md={4}>
                  <Button
                    onClick={() => removeInfo(i.number)}
                    variable={"outline-danger"}
                  >
                    Удалить
                  </Button>
                </Col>
              </Row>
            );
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variable={"outline-danger"} onClick={onHide}>
          Закрыть
        </Button>
        <Button variable={"outline-success"} onClick={onHide}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
