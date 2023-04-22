import axios from "axios";
import { useQueries, useMutation } from "react-query";
import { useQueryClient } from "react-query";

const fetchIngredientsDocumentData = async ({ queryKey }) => {
  const ingredientId = queryKey[1];
  const url = `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/ingredients/${ingredientId}/upload-document/`;
  const response = await axios.get(url);

  return response.data;
};

function buildFormData(data) {
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
  /* axios request to add document data */
  const formData = buildFormData(data);
  const url = `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/ingredients/${id}/upload-document/`;
  return axios.put(url, formData, {
    headers: {
      Authorization: data.token,
    },
  });

};

//   return axios
//     .get(url, {
//       headers: {
//         Authorization: data.token,
//       },
//     })
//     .then((response) => {
//       // Document already exists, so do a PATCH request
//       return axios.put(url, formData, {
//         headers: {
//           Authorization: data.token,
//         },
//       });
//     })
//     .catch((error) => {
//       // Document doesn't exist, so do a POST request
//       return axios.post(url, formData, {
//         headers: {
//           Authorization: data.token,
//         },
//       });
//     });
// };

const patchIngredientsDocumentData = ({ data, id }) => {
  /* axios request to patch ingredient document Data  */
  const formData = buildFormData(data);
  const url = `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/ingredients/${id}/upload-document/`;
  return axios.patch(url, formData, {
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
    onSettled: () => {
      queryClient.invalidateQueries((queryKey) => {
        return (
          queryKey[0] === "ingredientsDocumentData" &&
          typeof queryKey[1] === "number"
        );
      });
    },
  });
};

export const usePatchIngredientsDocumentData = (ingredientId) => {
  /* use query hook to patch ingredient document data  */
  const queryClient = useQueryClient();
  return useMutation(patchIngredientsDocumentData, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "ingredientDocumentData",
        parseInt(ingredientId),
      ]);
    },
  });
};
