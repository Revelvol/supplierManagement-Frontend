// get supplier data
// display supplier as clickable buttuon
// get ingredients data based on the supplier ID
// display the ingredients data based on those supplier

// edit the ingredients of the displayed data,
// add ingredient promtp to the displayed supplier
// add supplier also can be shown here
import { useSuppliersData } from "./query/useSuppliersData";
import { useGetIngredientsData } from "./query/useIngredientsData";
import { useState, useMemo } from "react";
import IngredientTables from "./tables/IngredientTables";

function IngredientManagement() {
  const [errorMessage, setErrorMessage] = useState("");
  const [ingredientTable, setIngredientTable] = useState(<div> </div>);

  const columns = useMemo(
    () => [
      {
        Header: "Ingredient Name",
        accessor: "name",
      },
      {
        Header: "Price ($)",
        accessor: "price",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Unit",
        accessor: "unit",
        Cell: ({ value }) => <span>{value.abbreviation}</span>,
      },
      {
        Header: "Function",
        accessor: "function",
        Cell: ({ value }) => <span>{value.name}</span>
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
    console.log(ingredientData[0] === null);
    // if null render nothing
    if (ingredientData[0] === null) {
      setIngredientTable("There is no ingredient, add ingredient!!!");
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
