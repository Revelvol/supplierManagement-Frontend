import axios from "axios";
import { useQueries, useMutation } from "react-query";
import { useQueryClient } from "react-query";

const fetchIngredientsDocumentData = async ({ queryKey }) => {
  const ingredientId = queryKey[1];
  const url = `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/ingredients/${ingredientId}/upload-document/`;
  const response = await axios.get(url);

  return response.data;
};

const addIngredientDocumentData = ({data, id}) => {
  const payload = {
    isoDocument: data.isoDocument,
    gmoDocument: data.gmoDocument,
    kosherDocument: data.kosherDocument,
    halalDocument: data.halalDocument,
    msdsDocument: data.msdsDocument,
    tdsDocument: data.tdsDocument,
    coaDocument: data.coaDocument,
    allergenDocument: data.allergenDocument,
  };

  const url = `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/ingredients/${id}/upload-document/`;
  return axios.post(url, payload, {
    headers: {
      Authorization: data.token,
      "Content-Type": "application/json",
    },
  });
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

export const useAddIngredientsDocumentData = () => {
  /* usequery hook to add ingredient document data */
  const queryClient = useQueryClient();
  // MIGHT BE EEORR HGERE gitgdd .d 
  return useMutation(addIngredientDocumentData, {
    onSuccess: () => {
      queryClient.invalidateQueries("ingredientsDocumentData");
    }
  });
};
