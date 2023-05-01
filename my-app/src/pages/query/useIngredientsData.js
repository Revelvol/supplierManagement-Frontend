import axios from "axios";
import { useQueryClient, useQuery, useMutation } from "react-query";

const fetchIngredientsData = () => {
  /* Fetch all ingredients data  */
  return axios.get(
    "https://www.revelvolsuppliermanagement.online/api/ingredients/"
  );
};

const fetchIngredientData = ({ queryKey }) => {
  const id = queryKey[1];
  return axios.get(
    `https://www.revelvolsuppliermanagement.online/api/ingredients/${id}/`
  );
};

const putIngredientData = ({ data, id }) => {
  /* axios request to put ingredient data */
  const payload = {
    supplier: data.supplier,
    name: data.name,
    price: data.price,
    quantity: data.quantity,
    is_used: data.is_used,
    function: JSON.parse(data.function),
    unit: JSON.parse(data.unit),
  };
  return axios.put(
    `https://www.revelvolsuppliermanagement.online/api/ingredients/${id}/`,
    payload,
    {
      headers: {
        Authorization: data.token,
        "Content-Type": "application/json",
      },
    }
  );
};
const deleteIngredientData = ({ token, id }) => {
  /* axios request to delete ingredient data */
  return axios.delete(
    `https://www.revelvolsuppliermanagement.online/api/ingredients/${id}/`,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );
};
const addIngredientData = ({ data }) => {
  /* axios request to add ingredient data */
  const payload = {
    supplier: data.supplier,
    name: data.name,
    price: data.price,
    quantity: data.quantity,
    is_used: data.is_used,
    function: JSON.parse(data.function),
    unit: JSON.parse(data.unit),
  };
  return axios.post(
    "https://www.revelvolsuppliermanagement.online/api/ingredients/",
    payload,
    {
      headers: {
        Authorization: data.token,
        "Content-Type": "application/json",
      },
    }
  );
};

export const useGetIngredientsData = () => {
  /* usequeryhook to get all ingredients */
  const queryKey = "ingredientsData";
  const queryFn = fetchIngredientsData;
  return useQuery(queryKey, queryFn);
};

export const useGetIngredientData = (ingredientId) => {
  /* usequeryhook to get individual ingredients */
  const queryClient = useQueryClient();
  const queryKey = ["ingredientData", parseInt(ingredientId)];
  const queryFn = fetchIngredientData;
  return useQuery(queryKey, queryFn, {
    initialData: () => {
      const ingredient = queryClient
        .getQueriesData("ingredientsData")
        ?.data?.find((ingredient) => ingredient.id === parseInt(ingredientId));
      if (ingredient) {
        return {
          data: ingredient,
        };
      } else {
        return undefined;
      }
    },
  });
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

// i think you have to invalidate the individual query too 
export const usePutIngredientData = () => {
  /* useQuery hook to put existing ingredient */
  const queryClient = useQueryClient();
  return useMutation(putIngredientData, {
    onSuccess: () => {
      queryClient.invalidateQueries("ingredientsData");
    },
  });
};

export const useDeleteIngredientData = () => {
  /* useQuery hook to put existing ingredient */
  const queryClient = useQueryClient();
  return useMutation(deleteIngredientData, {
    onSuccess: () => {
      queryClient.invalidateQueries("ingredientsData");
    },
  });
};
