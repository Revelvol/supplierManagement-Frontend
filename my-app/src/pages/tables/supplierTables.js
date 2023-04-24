import { useTable, useGlobalFilter } from "react-table";
import styled from "styled-components";
import { FaFilePdf, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { GlobalFilter } from "./Filter/globalFilter";
import { TableStyles } from "../../components/style";



function SupplierTables({ data }) {
  const columns = useMemo(
    () => [
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
      {
        Header: "document",
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
        Header: "edit",
        accessor: "edit",
        Cell: ({ value }) => (
          <Link to={`/supplier-management/edit/${value}`}>
            <FaEdit />
          </Link>
        ),
      },
    ],
    []
  );

  data = useMemo(() => data, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const { globalFilter } = state;

  return (
    <>
      <div className="global-filter-container">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <TableStyles>
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
            {rows.map((row, i) => {
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
    </>
  );
}

export default SupplierTables;
