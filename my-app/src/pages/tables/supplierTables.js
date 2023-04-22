import { useTable, useSortBy } from "react-table";
import styled from "styled-components";
import { FaFilePdf, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMemo } from "react";

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
/* 
MIGHT ALSO LOOK INTO PAGINATED QUERIES FOR PAGE, tapi kayaknya mesti configure di backend juga
ASLO USE THE KEEP PREVIOUS DATA TO TRUE BIAR GA LOADING TERUS */
function SupplierTables({ columns, data }) {

  data = useMemo(()=> data, [])
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps() } key={i}>
                {row.cells.map((cell) => {
                  if (
                    (cell.column.id === "isoDocument" ||
                      cell.column.id === "gmpDocument" ||
                      cell.column.id === "haccpDocument") &&
                    cell.value
                  ) {
                    // Render the isoDocument as a hyperlink
                    return (
                      <td {...cell.getCellProps()}>
                        <a
                          href={cell.value}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaFilePdf />
                        </a>
                      </td>
                    );
                    // MIGHT WANT TO LOOK INTO REACT QUERY BY ID TO REFRACTOR THIS
                  } else if (cell.column.id === "edit") {
                    return (
                      <td>
                        <Link to={`/supplier-management/edit/${cell.value}`}>
                          <FaEdit />
                        </Link>
                      </td>
                    );
                  } else {
                    // Render other cells as plain text
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
}

export default SupplierTables;
