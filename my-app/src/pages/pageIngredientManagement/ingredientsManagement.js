import { useState } from "react";
import { useSuppliersData } from "../query/useSuppliersData";
import { Link } from "react-router-dom";
import { GlobalFilterStyles, Title } from "../../components/style";

function IngredientManagement() {
  const {
    isLoading: suppliersIsLoading,
    error: suppliersError,
    data: suppliersData,
  } = useSuppliersData();
  const [filter, setFilter] = useState("");

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

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <Title className="text-center">Ingredient Management</Title>
      <GlobalFilterStyles>
        <span>
          Search : {""}
          <input onChange={handleChange} />
        </span>
      </GlobalFilterStyles>
      <div className="supplier-list">
        {suppliersData?.data
          .filter((supplier) => {
            return supplier.name.toLowerCase().includes(filter.toLowerCase());
          })
          .map((supplier) => {
            return (
              <div id={supplier.id} key={supplier.id} className="supplier-box">
                <Link to={`/ingredient-management/supplier=${supplier.id}`}>
                  {supplier.name}
                </Link>
              </div>
            );
          })}
      </div>
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
