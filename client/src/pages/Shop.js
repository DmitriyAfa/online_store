import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Context } from "../index";
import { BrandBar } from "../components/BrandBar";
import { DeviceList } from "../components/DeviceList";
import { TypeBar } from "../components/TypeBar";
import {
  fetchBrands,
  fetchDevices,
  fetchRating,
  fetchTypes,
} from "../http/deviceApi";
import { PaginationShop } from "../components/PaginationShop";

export const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => {
      device.setTypes(data);
    });
    fetchBrands().then((data) => {
      device.setBrands(data);
    });
    fetchDevices(null, null, 1, 2).then(({ count, rows }) => {
      device.setDevices(rows);
      device.setTotalCount(count);
    });
    fetchRating().then((rating) => device.setRating(rating));
  }, []);

  useEffect(() => {
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      9
    ).then(({ count, rows }) => {
      device.setDevices(rows);
      device.setTotalCount(count);
    });
  }, [device.page, device.selectedType, device.selectedBrand]);

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
            <PaginationShop />
          </Col>
        </Row>
      </Container>
    </div>
  );
});
