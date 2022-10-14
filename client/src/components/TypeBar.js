import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "..";
import { ListGroup } from "react-bootstrap";

export const TypeBar = observer(() => {
  const { device } = useContext(Context);
  const [isAll, setIsAll] = useState(true);

  const selectType = (type) => {
    device.setSelectedType(type);
    setIsAll(false);
  };

  const selectAllTypes = () => {
    device.setSelectedType(device.types);
    setIsAll(true);
  };

  return (
    <ListGroup>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        active={isAll}
        onClick={() => selectAllTypes()}
      >
        All
      </ListGroup.Item>
      {device.types.map((type) => {
        return (
          <ListGroup.Item
            style={{ cursor: "pointer" }}
            active={type.id === device.selectedType.id && !isAll}
            onClick={() => selectType(type)}
            key={type.id}
          >
            {type.name}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
});
