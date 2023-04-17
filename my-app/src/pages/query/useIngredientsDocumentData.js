import axios from "axios";
import { useQueries } from "react-query";

const fetchIngredientsDocumentData = async ({ queryKey }) => {
  const ingredientId = queryKey[1];
  const url = `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/ingredients/${ingredientId}/upload-document/`;
  const response = await axios.get(url);

  return response.data;


};

export const useGetIngredientsDocumentsData = (ingredientData) => {
  /* usequery hook get document ingredient data 
  with the coresponding ingredient data  */

  return useQueries(
    ingredientData?.data.map((ingredient) => ({
      queryKey: ["ingredientDocumentData", ingredient.id],
      queryFn: fetchIngredientsDocumentData,
    })) || []
  );
};
