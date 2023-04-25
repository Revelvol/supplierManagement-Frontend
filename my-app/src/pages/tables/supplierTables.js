import { useTable, useGlobalFilter, usePagination } from "react-table";
import { FaFilePdf, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { GlobalFilter } from "./Filter/globalFilter";
import {
  GlobalFilterStyles,
  PaginationStyles,
  TableStyles,
  Title,
} from "../../components/style";
import { useState } from "react";
import AddSupplierForm from "../forms/addSupplierForm";
import { useDeleteSupplierData } from "../query/useSupplierData";
import { useAuthHeader } from "react-auth-kit";

function SupplierTables({ data }) {
  const token = useAuthHeader()
  const { mutate: deleteSupplier, isLoading: deleteSupplierIsLoading } = useDeleteSupplierData()
  const columns = useMemo(
    () => [
      {
        Header: "Info",
        columns: [
          {
            Header: "Name",
            accessor: "name", // accessor is the "key" in the data
          },
          {
            Header: "Location",
            accessor: "location",
          },
          {
            Header: "Phone",
            accessor: "phone",
          },
        ],
      },
      {
        Header: "Documents",
        columns: [
          {
            Header: "ISO",
            accessor: "isoDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
          {
            Header: "GMP",
            accessor: "gmpDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
          {
            Header: "HACCP",
            accessor: "haccpDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
        ],
      },
      {
        Header: "Utility",
        columns: [
          {
            Header: "Edit",
            accessor: "edit",
            Cell: ({ value }) => (
              <Link to={`/supplier-management/edit/${value}`}>
                <FaEdit />
              </Link>
            ),
          },
          {
            Header: "Delete",
            accessor: "delete",
            Cell: ({ value }) => (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  deleteSupplier({
                    supplierId:value, 
                    token : token()
                  })
                }}
              >
                <FaTrash />
              </button>
            ),
          },
        ],
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    // global filter
    setGlobalFilter,
    // pagination
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
      },
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;
  const [hideAddSupplier, setHideAddSupplier] = useState(true);
  const handleUnhideAddSupplier = () => {
    setHideAddSupplier(!hideAddSupplier);
  };

  if (deleteSupplierIsLoading) {
    return "is Loading "
  }
  return (
    <>
      <div className="row justify-center">
        {hideAddSupplier === true ? (
          <div className="col-6">
            <button className="btn btn-info " onClick={handleUnhideAddSupplier}>
              Add Supplier{" "}
            </button>{" "}
          </div>
        ) : (
          <div className="col-6">
            <button
              className="btn btn-danger"
              onClick={handleUnhideAddSupplier}
            >
              Close{" "}
            </button>{" "}
            <Title>Add Supplier </Title>
            <AddSupplierForm />
          </div>
        )}
        <GlobalFilterStyles className="global-filter-container col-6 ">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </GlobalFilterStyles>
        <TableStyles className="col-12">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={i}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableStyles>

        <PaginationStyles className="col-12">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[2, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </PaginationStyles>
      </div>
    </>
  );
}

export default SupplierTables;
