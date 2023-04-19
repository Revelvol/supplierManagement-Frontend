import axios from "axios";
import { useQueries, useMutation } from "react-query";
import { useQueryClient } from "react-query";

const fetchIngredientsDocumentData = async ({ queryKey }) => {
  const ingredientId = queryKey[1];
  const url = `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/ingredients/${ingredientId}/upload-document/`;
  const response = await axios.get(url);

  return response.data;
};

function buildFormData( data) {
  const documentTypes = [
    "isoDocument",
    "gmoDocument",
    "kosherDocument",
    "halalDocument",
    "msdsDocument",
    "tdsDocument",
    "coaDocument",
    "allergenDocument",
  ];

  const formData = new FormData();


  documentTypes.forEach((documentType) => {
    
    if (data[documentType][0]) {
      formData.append(documentType, data[documentType][0]);
    }
  });
  return formData;
}

const addIngredientDocumentData = ({ data, id }) => {
  const formData = buildFormData(data);
  const url = `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/ingredients/${id}/upload-document/`;
  return axios.post(url, formData, {
    headers: {
      Authorization: data.token,
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
  return useMutation(addIngredientDocumentData, {
    onSuccess: () => {
      queryClient.invalidateQueries("ingredientsDocumentData");
    },
  });
};
