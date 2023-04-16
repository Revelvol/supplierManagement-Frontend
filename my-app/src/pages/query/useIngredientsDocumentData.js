import axios from "axios";
import { useQueryClient, useQuery, useMutation } from "react-query";

const fetchIngredientsDocumentData = ({ queryKey }) => {
  const ingredientId = queryKey[1];
  const url = `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/ingredients/${ingredientId}/upload-document/`;
  return axios.get(url);
};

export const useGetIngredientsDocumentData = (ingredientId) => {
  /* usequery hook get document ingredient data 
  with the coresponding supplier */
  const queryClient = useQueryClient();
  const queryKey = ["ingredientDocuments", ingredientId];
  const queryFn = fetchIngredientsDocumentData;
  return useQuery(queryKey, queryFn, {
    initialData: () => {
      const documents = queryClient
        .getQueriesData(["ingredientDocuments", ingredientId])
        ?.data.find();

      if (documents) {
        return {
          data: document,
        };
      } else {
        return undefined;
      }
    },
  });
};
