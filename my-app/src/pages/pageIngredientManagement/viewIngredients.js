import { useParams } from "react-router-dom";
import BackButton from "../../components/backButton";
import { useGetIngredientsData } from "../query/useIngredientsData";
import { useGetIngredientsDocumentsData } from "../query/useIngredientsDocumentData";
import IngredientTables from "../tables/IngredientTables";
import AddIngredientForm from "../forms/addIngredientForm";
import { useState } from "react";

function ViewIngredients() {
  const { supplierId } = useParams();
  const [showAdd, setShowAdd ] = useState(false)
  const id = supplierId.split("=")[1];
  const {
    isLoading: ingredientsIsLoading,
    error: ingredientsError,
    data: ingredientsData,
  } = useGetIngredientsData();

  const documentQueries = useGetIngredientsDocumentsData(ingredientsData);
  const handleSubmit = () => {
    setShowAdd(false);
  }
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
  const ingredientData = ingredientsWithDocumentData?.filter((ingredient) => {
    if (ingredient?.supplier === parseInt(id)) {
      return ingredient;
    } else {
      return null;
    }
  });

  if (ingredientsIsLoading || documentQueries.some((query) => query.isLoading))
    return <div>Loading...</div>;
  if (ingredientsError || documentQueries.some((query) => query.error))
    return <div>Error: {ingredientsError}</div>;

  return (
    <>
      <BackButton />
      <div className="add-ingredient">
        {showAdd ? <button onClick={() => setShowAdd(false)}>Cancel</button> : <button onClick={() => {setShowAdd(true)}}>Add Ingredient</button>}
        {showAdd && <AddIngredientForm supplierId={id} setShow={handleSubmit} />}
      </div>
      <IngredientTables data={ingredientData} />
    </>
  );
}

export default ViewIngredients;
