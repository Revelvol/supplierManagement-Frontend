// get supplier data
// display supplier as clickable buttuon
// get ingredients data based on the supplier ID
// display the ingredients data based on those supplier

// edit the ingredients of the displayed data,
// add ingredient promtp to the displayed supplier
// add supplier also can be shown here
import { useSuppliersData } from "./query/useSuppliersData";
import { useGetIngredientsData } from "./query/useIngredientsData";
import { useState } from "react";

function IngredientManagement() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    isLoading: supplierIsLoading,
    error: supplierError,
    data: supplierData,
  } = useSuppliersData();

  if (supplierIsLoading) {
    return "is loading .... ";
  }

  if (supplierError) {
    return (
      <div className="alert alert-danger" role="alert">
        {supplierError.message}
      </div>
    );
  }

  return (
    <div>
      Ingredients Management
      <ul>
        {supplierData?.data.map((supplier) => {
          return (
            <li key={supplier.id}>
               
              <div
                className="open-supplier-ingredient"
                style={{ cursor: "pointer", fontWeight: "bold" }}
              >
                {supplier.name}
              </div>
              <br></br>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default IngredientManagement;
