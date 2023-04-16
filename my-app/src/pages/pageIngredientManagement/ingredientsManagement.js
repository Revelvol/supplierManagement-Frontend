import { useSuppliersData } from "../query/useSuppliersData";
import { useGetIngredientsData } from "../query/useIngredientsData";
import { useState, useMemo } from "react";
import IngredientTables from "../tables/IngredientTables";
import { ColumnFilter, isUsedFilter } from "../tables/Filter/columnFilter";
import AddIngredientForm from "../forms/addIngredientForm";
import { Link } from "react-router-dom";
import { FaFilePdf, FaEdit } from "react-icons/fa";

function IngredientManagement() {
  const [ingredientTable, setIngredientTable] = useState(<div> </div>);

  // ada bug di filtering yang object dan is used
  const columns = useMemo(
    () => [
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
      // {
      //   Header: "Edit",
      //   accessor: "id",
      //   Cell: ({ value }) => {
      //     return (
      //       <div>
      //         <Link to={`/ingredient-management/edit/${value}`}>
      //           <FaEdit style={{ marginRight: "0.5rem" }} />
      //         </Link>
      //       </div>
      //     );
      //   },
      //   Filter: ColumnFilter,
      //   disableFilters: true,
      // },
      {
        Header: "Documents",
        columns: [
          { Header: "ISO", Filter: ColumnFilter, disableFilters: true },
          { Header: "GMO", Filter: ColumnFilter, disableFilters: true },
          { Header: "Kosher", Filter: ColumnFilter, disableFilters: true },
          { Header: "Halal", Filter: ColumnFilter, disableFilters: true },
          { Header: "MSDS", Filter: ColumnFilter, disableFilters: true },
          { Header: "COA", Filter: ColumnFilter, disableFilters: true },
          { Header: "Allergen", Filter: ColumnFilter, disableFilters: true },
        ],
      },
    ],
    []
  );

  const {
    isLoading: suppliersIsLoading,
    error: suppliersError,
    data: suppliersData,
  } = useSuppliersData();

  const {
    isLoading: ingredientsIsLoading,
    error: ingredientsError,
    data: ingredientsData,
  } = useGetIngredientsData();
  


  if (suppliersIsLoading || ingredientsIsLoading) {
    return "is loading .... ";
  }

  if (suppliersError || ingredientsError) {
    return (
      <div className="alert alert-danger" role="alert">
        {suppliersError.message}
        {ingredientsError.message}
      </div>
    );
  }

  const handleSupplierClick = (event) => {
    /* filter the supplier click here from ingredients that has been selected, 
    can be server filtered or di filter client,
    this will filter yang udh difetch ingridients all */
    const supplierId = event.target.parentNode.id;
    const ingredientData = ingredientsData.data.map((ingredient) => {
      if (ingredient.supplier === parseInt(supplierId)) {
        return ingredient;
      } else {
        return null;
      }
    });
    // if null render nothing
    if (ingredientData[0] === null) {
      setIngredientTable(
        <>
          <span>There is no ingredient, add ingredient!!!</span>
          <AddIngredientForm />
        </>
      );
    } else {
      setIngredientTable(
        <IngredientTables columns={columns} data={ingredientData} />
      );
    }
  };

  return (
    <div>
      <ul>
        {suppliersData?.data.map((supplier) => {
          return (
            <li id={supplier.id} key={supplier.id}>
              <div
                className="open-supplier-ingredient"
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={handleSupplierClick}
              >
                {supplier.name}
              </div>
              <br></br>
            </li>
          );
        })}
      </ul>
      <div className="ingredientTable">{ingredientTable}</div>
    </div>
  );
}

export default IngredientManagement;
