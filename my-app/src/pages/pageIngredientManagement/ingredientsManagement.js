import { useMemo } from "react";
import { useSuppliersData } from "../query/useSuppliersData";
import { Link } from "react-router-dom";
import { useTable, useGlobalFilter } from "react-table";
import { GlobalFilter } from "../tables/Filter/globalFilter";

const COLUMN = [
  {
    Header: "supplier",
    acessor: "name",
  },
];

function IngredientManagement() {
  const {
    isLoading: suppliersIsLoading,
    error: suppliersError,
    isSuccess: suppliersIsSuccess,
    data: suppliersData,
  } = useSuppliersData();
  const columns = useMemo(() => COLUMN, []);


  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  // useTable({ columns: columns, data: suppliersData?.data}, useGlobalFilter);

  if (suppliersIsLoading) {
    return "is loading .... ";
  }

  if (suppliersError) {
    let alertMessage = "";
    if (suppliersError) {
      alertMessage += suppliersError.message + " ";
    }

    return (
      <div className="alert alert-danger" role="alert">
        {alertMessage}
      </div>
    );
  }


  return (
    <div>
      <ul>
        {suppliersData?.data.map((supplier) => {
          return (
            <li id={supplier.id} key={supplier.id}>
              <div
                className="open-supplier-ingredient"
                style={{ cursor: "pointer", fontWeight: "bold" }}
              >
                <Link to={`/ingredient-management/supplier=${supplier.id}`}>
                  {supplier.name}{" "}
                </Link>
              </div>

            </li>
          );
        })}
      </ul>
    </div>
  );

  // return (
  //   <div>
  //    <table {...getTableProps()}>
  //     <thead>
  //       {headerGroups.map(headerGroup => (
  //         <tr {...headerGroup.getHeaderGroupProps()}>
  //           {headerGroup.headers.map(column => (
  //             <th {...column.getHeaderProps()}>{column.render('Header')}</th>
  //           ))}
  //         </tr>
  //       ))}
  //     </thead>
  //     <tbody {...getTableBodyProps()}>
  //       {rows.map((row, i) => {
  //         prepareRow(row)
  //         return (
  //           <tr {...row.getRowProps()}>
  //             {row.cells.map(cell => {
  //               return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
  //             })}
  //           </tr>
  //         )
  //       })}
  //     </tbody>
  //   </table>
  //   </div>
  
}

export default IngredientManagement;
