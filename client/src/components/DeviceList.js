import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import { Card, Row } from "react-bootstrap";
import { DeviceItem } from "./DeviceItem";

export const DeviceList = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row className="d-flex">
      {device.devices.map((device) => {
        return <DeviceItem key={device.id} device={device} />;
      })}
    </Row>
  );
});
