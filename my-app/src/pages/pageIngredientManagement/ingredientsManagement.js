import { useSuppliersData } from "../query/useSuppliersData";
import { useGetIngredientsData } from "../query/useIngredientsData";
import { useState, useMemo } from "react";
import IngredientTables from "../tables/IngredientTables";
import AddIngredientForm from "../forms/addIngredientForm";
import { useGetIngredientsDocumentsData } from "../query/useIngredientsDocumentData";
import { Link } from "react-router-dom";

function IngredientManagement() {
  const [ingredientTable, setIngredientTable] = useState(<div> </div>);
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

  const documentQueries = useGetIngredientsDocumentsData(ingredientsData);

  const ingredientsWithDocumentData = ingredientsData?.data.map(
    /* map ingredient with document data */
    (ingredient) => {
      try {
        const documents = documentQueries.find(
          (query) => parseInt(query.data.ingredient) === parseInt(ingredient.id)
        ).data;
        const mergedData = {
          ...ingredient,
          ...documents,
        };

        delete mergedData.ingredient;
        return mergedData;
      } catch (err) {
        // error happen here
      }
    }
  );

  if (
    suppliersIsLoading ||
    ingredientsIsLoading ||
    documentQueries.some((query) => query.isLoading)
  ) {
    return "is loading .... ";
  }

  if (
    suppliersError ||
    ingredientsError ||
    documentQueries.some((query) => query.error)
  ) {
    let alertMessage = "";
    if (suppliersError) {
      alertMessage += suppliersError.message + " ";
    }
    if (ingredientsError) {
      alertMessage += ingredientsError.message + " ";
    }
    documentQueries.forEach((query) => {
      if (query.error) {
        alertMessage += query.error.message + " ";
      }
    });
    return (
      <div className="alert alert-danger" role="alert">
        {alertMessage}
      </div>
    );
  }

  const handleSupplierClick = (event) => {
    /* set the displayed table of ingredient 
    based on the supplier clicked*/
    const supplierId = event.target.parentNode.id;
    const ingredientData = ingredientsWithDocumentData.filter((ingredient) => {
      if (ingredient.supplier === parseInt(supplierId)) {
        return ingredient;
      } else {
        return null;
      }
    });

    if (ingredientData.length === 0) {
      setIngredientTable(
        <>
          <span>There is no ingredient, add ingredient!!!</span>
          <AddIngredientForm supplierId={supplierId} />
        </>
      );
    } else {
      setIngredientTable(
        <>
          <AddIngredientForm supplierId={supplierId} />
          <IngredientTables data={ingredientData} />
        </>
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
              >
                <Link to={`/ingredient-management/supplier=${supplier.id}`}>
                  {supplier.name}{" "}
                </Link>
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
