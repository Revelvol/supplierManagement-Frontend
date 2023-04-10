import { useTable, useSortBy, useGlobalFilter } from "react-table";
import styled from "styled-components";
import { useMemo } from "react";
import { GlobalFilter } from "./globalFilter";


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
    useGlobalFilter,
    useSortBy,
  
 
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } =
    tableInstance;


  // pop the function and unit data karena itu another object within object
  return (
      <div>
        <GlobalFilter filter={state.globalFilter} setFilter={setGlobalFilter} />
        <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {" "}
                  {column.render("Header")}{" "}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>{" "}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
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
      </Styles>
      </div>
    
  );
}

export default IngredientTables;
