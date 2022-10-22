import { observer } from "mobx-react-lite";
import { Col, Card, Image } from "react-bootstrap";
import star from "../assets/star.png";
import { useHistory } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import { calculationRate } from "../helpers/functions";
import { fetchDeviceRatings } from "../http/ratingApi";

export const DeviceItem = observer(({ device }) => {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [rate, setRate] = useState(0);
  const store = useContext(Context);
  const deviceStore = store.device;
  const { brands } = deviceStore;

  useEffect(() => {
    for (let i = 0; i < brands.length; i++) {
      if (brands[i].id === device.brandId) {
        setName(brands[i].name);
        break;
      }
    }
    fetchDeviceRatings(device.id).then(({ count, rows }) => {
      const amount = rows.reduce((agg, item) => {
        return (agg += item.rate);
      }, 0);
      setCount(count);
      setRate(calculationRate(amount, count));
    });
  }, []);
  const history = useHistory();
  return (
    <Col
      md={3}
      className={"mt-3"}
      onClick={() => history.push(DEVICE_ROUTE + "/" + device.id)}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border="light">
        <Image
          width={150}
          height={150}
          src={process.env.REACT_APP_API_URL + device.img}
        />
        <div className="text-black-50 d-flex justify-content-between align-items-center mt-2">
          <div>{name}</div>
          <div className="d-flex align-items-center">
            <div>
              {rate}/{count}
            </div>
            <Image width={18} height={18} src={star} />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
});
