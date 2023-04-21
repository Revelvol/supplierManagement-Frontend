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
import { FaFilePdf, FaEdit } from "react-icons/fa";
import { ColumnFilter, isUsedFilter } from "../tables/Filter/columnFilter";
import { Link } from "react-router-dom";


const COLUMNS = [
    {
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
    },
    {
      Header: "Edit",
      accessor: "id",
      Cell: ({ value }) => {
        return (
          <div>
            <Link to={`/ingredient-management/edit/${value}`}>
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
  ]

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

function IngredientTables({data }) {
  const ingredientData = data
  const column = useMemo(() => COLUMNS, []);
  const tableInstance = useTable(
    {
      columns: column,
      data: ingredientData,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
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
  
  const { pageIndex, globalFilter,  pageSize } = state;
  return (
    <div>
      <div className="global-filter-container">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <Styles>
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
