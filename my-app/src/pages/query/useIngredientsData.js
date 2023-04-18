import axios from "axios";
import { useQueryClient, useQuery, useMutation } from "react-query";

const fetchIngredientsData = () => {
  /* Fetch all ingredients data  */
  return axios.get(
    "http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/ingredients/"
  );
};


const addIngredientData = (data) => {
  const payload = {
    supplier: data.supplier,
    name: data.name,
    price: data.price,
    quantity: data.quantity,
    is_used: data.is_used,
    function: data.function, 
    unit: data.unit, 
  }
  return axios.post(
    "http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/ingredients/", payload, {
      headers: {
        Authorization: data.token,
        "Content-Type": "application/json",
      }
    }
  );
};

export const useGetIngredientsData = () => {
  /* usequeryhook to get all ingredients */
  const queryKey = "ingredientsData";
  const queryFn = fetchIngredientsData;
  return useQuery(queryKey, queryFn);
};

export const useAddIngredientData = () => {
  /* usequery hook to add ingredients  */
  const queryClient = useQueryClient();

  return useMutation(addIngredientData, {
    onSuccess: () => {
      queryClient.invalidateQueries("ingredientsData");
    },
  });
};
