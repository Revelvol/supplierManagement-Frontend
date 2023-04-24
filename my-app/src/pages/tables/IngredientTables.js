import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { useMemo } from "react";
import { GlobalFilter } from "./Filter/globalFilter";
import { FaFilePdf, FaEdit } from "react-icons/fa";
import { ColumnFilter, isUsedFilter } from "../tables/Filter/columnFilter";
import { Link, useLocation } from "react-router-dom";
import { GlobalFilterStyles, PaginationStyles, TableStyles } from "../../components/style";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddIngredientForm from "../forms/addIngredientForm";

function IngredientTables({ data }) {
  const { supplierId } = useParams();
  const id = supplierId.split("=")[1];
  const location = useLocation();
  const ingredientData = data;
  const [showAdd, setShowAdd] = useState(false);
  const column = useMemo(
    () => [
      {
        Header:"info",
        columns:[{
          Header: "Ingredient Name",
          accessor: "name",
          Filter: ColumnFilter,
        },
        {
          Header: "Price ($)",
          accessor: "price",
          Filter: ColumnFilter,
        },
        {
          Header: "Quantity",
          accessor: "quantity",
          Filter: ColumnFilter,
        },
        {
          Header: "Unit",
          accessor: "unit",
          Cell: ({ value }) => {
            return value.abbreviation;
          },
          Filter: ColumnFilter,
          filter: (row, columnIds, filterValue) => {
            return row.filter((row) =>
              row.values.unit.abbreviation.includes(filterValue)
            );
          },
        },
        {
          Header: "Function",
          accessor: "function",
          Cell: ({ value }) => {
            return value.name;
          },
          Filter: ColumnFilter,
          filter: (row, columnIds, filterValue) => {
            return row.filter((row) =>
              row.values.function.name.includes(filterValue)
            );
          },
        },
        {
          Header: "Is Used",
          accessor: "is_used",
          Cell: ({ value }) =>
            value ? (
              <div className="d-flex align-items-center justify-content-center h-100 bg-success">
                <span className="text-center text-white">Used</span>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100 bg-danger">
                <span className="text-center text-white">Not Used </span>
              </div>
            ),
          Filter: isUsedFilter,
        },]
      },
      
      {
        Header: "Edit",
        accessor: "id",
        Cell: ({ value }) => {
          return (
            <div>
              <Link to={`${location.pathname}/edit/${value}`}>
                <FaEdit style={{ marginRight: "0.5rem" }} />
              </Link>
            </div>
          );
        },
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "Documents",
        columns: [
          {
            Header: "ISO",
            Filter: ColumnFilter,
            disableFilters: true,
            accessor: "isoDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
          {
            Header: "GMO",
            Filter: ColumnFilter,
            disableFilters: true,
            accessor: "gmoDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
          {
            Header: "Kosher",
            Filter: ColumnFilter,
            disableFilters: true,
            accessor: "kosherDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
          {
            Header: "Halal",
            Filter: ColumnFilter,
            disableFilters: true,
            accessor: "halalDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
          {
            Header: "MSDS",
            Filter: ColumnFilter,
            disableFilters: true,
            accessor: "msdsDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
          {
            Header: "COA",
            Filter: ColumnFilter,
            disableFilters: true,
            accessor: "coaDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
          {
            Header: "Allergen",
            Filter: ColumnFilter,
            disableFilters: true,
            accessor: "allergenDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
          {
            Header: "TDS",
            Filter: ColumnFilter,
            disableFilters: true,
            accessor: "tdsDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
        ],
      },
    ],
    []
  );
  const tableInstance = useTable(
    {
      columns: column,
      data: ingredientData,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
    // useRowSelect,

    // row selection function
    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [
    //     {
    //       id: "selection",
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <Checkbox {...getToggleAllRowsSelectedProps()} />
    //       ),
    //       Cell: ({ row }) => (
    //         <div>
    //           <Checkbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ]);
    // }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPrevousPage,
    prepareRow,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    // selectedFlatRows,
    setGlobalFilter,
  } = tableInstance;

  const { pageIndex, globalFilter, pageSize } = state;
  return (
    <div className="row">
      
      <div className="add-ingredient col-6">
        {showAdd ? (
          <button className="btn btn-danger" onClick={() => setShowAdd(false)}>Close</button>
        ) : (
          <button
            onClick={() => {
              setShowAdd(true);
            }}
            class="btn btn-info"
          >
            Add Ingredient
          </button>
        )}
        {showAdd && (
          <AddIngredientForm supplierId={id} />
        )}
      </div>
      <GlobalFilterStyles className="global-filter-container col-6">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </GlobalFilterStyles>
      <TableStyles className="col-12">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {/* column sort  */}
                    <span {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                    {/* column filter */}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </ TableStyles>
      <PaginationStyles className="col-12">
          {/* allow user to goto certain page */}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page :{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: "50px" }}
            />
          </span>
          {/* Allow user to set page size  */}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          {/* allow user to navigate page  */}
          <button onClick={() => gotoPage(0)} disabled={!canPrevousPage}>
            {"<<"}{" "}
          </button>
          <button onClick={() => previousPage()} disabled={!canPrevousPage}>
            {" "}
            Previous{" "}
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {" "}
            Next{" "}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}{" "}
          </button>
        </PaginationStyles>
    </div>
  );
}

export default IngredientTables;
