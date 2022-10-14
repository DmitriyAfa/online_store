import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "..";
import { Card, Row } from "react-bootstrap";

export const BrandBar = observer(() => {
  const { device } = useContext(Context);
  const [isAll, setIsAll] = useState(true);

  const selectBrand = (brand) => {
    device.setSelectedBrand(brand);
    setIsAll(false);
  };

  const selectAllBrands = () => {
    device.setSelectedBrand(device.brands);
    setIsAll(true);
  };

  return (
    <Row>
      <Card
        style={{ cursor: "pointer" }}
        onClick={() => selectAllBrands()}
        border={isAll ? "danger" : "light"}
        className="p-3"
      >
        All
      </Card>
      {device.brands.map((brand) => {
        return (
          <Card
            key={brand.id}
            style={{ cursor: "pointer" }}
            onClick={() => selectBrand(brand)}
            border={
              brand.id === device.selectedBrand.id && !isAll
                ? "danger"
                : "light"
            }
            className="p-3"
          >
            {brand.name}
          </Card>
        );
      })}
    </Row>
  );
});
