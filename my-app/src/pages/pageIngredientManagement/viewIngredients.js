import { useParams } from "react-router-dom";
import BackButton from "../../components/backButton";
import { useGetIngredientsData } from "../query/useIngredientsData";
import { useGetIngredientsDocumentsData } from "../query/useIngredientsDocumentData";
import IngredientTables from "../tables/IngredientTables";

function ViewIngredients() {
  const { supplierId } = useParams();

  const id = supplierId.split("=")[1];

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
          delete:ingredient.id
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

      <IngredientTables data={ingredientData} />
    </>
  );
}

export default ViewIngredients;
