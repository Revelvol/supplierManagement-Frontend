import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import styled from "styled-components";
import { useMemo } from "react";
import { GlobalFilter } from "./Filter/globalFilter";
import { Checkbox } from "./checkbox/checkbox";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function IngredientTables({ columns, data }) {
  const ingredientData = useMemo(() => data, []);
  const tableInstance = useTable(
    {
      columns: columns,
      data: ingredientData,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <div>
              <Checkbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
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
    setGlobalFilter,
    selectedFlatRows,
  } = tableInstance;

  const { pageIndex, globalFilter, pageSize } = state;
  // pop the function and unit data karena itu another object within object
  return (
    <div>
      {/* global filter */}
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <Styles>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {/* column sort */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                    {/* column filter */}
                    <div onClick={(e) => e.stopPropagation()}>
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
        <div>
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
        </div>
      </Styles>
    </div>
  );
}

export default IngredientTables;
