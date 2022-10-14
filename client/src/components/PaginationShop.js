import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import { Pagination } from "react-bootstrap";

export const PaginationShop = observer(() => {
  const { device } = useContext(Context);
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = [];
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }
  return (
    <Pagination className="mt-5">
      {pages.map((page) => {
        return (
          <Pagination.Item
            onClick={() => device.setPage(page)}
            key={page}
            active={device.page === page}
          >
            {page}
          </Pagination.Item>
        );
      })}
    </Pagination>
  );
});
