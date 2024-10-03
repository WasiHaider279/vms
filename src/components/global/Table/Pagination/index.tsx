import { useQueryString } from "@/hooks/useQueryString";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

const Pagination = ({ payload }: any) => {
  const { page, limit, total } = payload;
  const searchParams = useQueryString();

  const handleChangePage = (newPage: any) => {
    searchParams.set({ name: "page", value: newPage.toString() });
  };

  const handleChangeRowsPerPage = (event: any) => {
    const limit = event.target.value.toString();

    searchParams.set([
      {
        name: "limit",
        value: limit,
      },
      {
        name: "page",
        value: page,
      },
    ]);
  };

  return (
    <div className="flex p-4 gap-4 items-center justify-between w-full">
      <span>
        {(page - 1) * limit + 1}-{Math.min(page * limit, total)} of {total}
      </span>
      <div className="flex items-center gap-2">
        <label htmlFor="limit">Rows per page:</label>
        <select
          id="limit"
          value={limit}
          onChange={handleChangeRowsPerPage}
          className="border rounded p-1 w-20"
        >
          <option value={9999}>All</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
        <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            <button disabled={page === 1} onClick={() => handleChangePage(1)}>
              <FaAngleDoubleLeft className="h-5 w-5 text-gray-500" />
            </button>

            <button
              disabled={page === 1}
              onClick={() => handleChangePage(page - 1)}
            >
              <FaAngleLeft className="h-5 w-5 text-gray-500" />
            </button>

            <button
              disabled={page === Math.ceil(total / limit)}
              onClick={() => handleChangePage(page + 1)}
            >
              <FaAngleRight className="h-5 w-5 text-gray-500" />
            </button>

            <button
              disabled={page === Math.ceil(total / limit)}
              onClick={() => handleChangePage(total / limit)}
            >
              <FaAngleDoubleRight className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
