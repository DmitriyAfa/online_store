import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import { Card, Row } from "react-bootstrap";

export const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row>
      {device.brands.map((brand) => {
        return (
          <Card
            key={brand.id}
            style={{ cursor: "pointer" }}
            onClick={() => device.setSelectedBrand(brand)}
            border={brand.id === device.selectedBrand.id ? "danger" : "light"}
            className="p-3"
          >
            {brand.name}
          </Card>
        );
      })}
    </Row>
  );
});
