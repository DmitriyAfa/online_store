import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createType } from "../../http/deviceApi";
export const CreateType = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const addType = () => {
    createType({ name: value }).then((data) => {
      setValue("");
      onHide();
    });
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите название типа"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variable={"outline-danger"} onClick={onHide}>
          Закрыть
        </Button>
        <Button variable={"outline-success"} onClick={addType}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
