import axios from "axios";
import { useQueryClient, useQuery } from "react-query";

const fetchIngredientsData = () => {
  return axios.get(
    "http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/ingredients/"
  );
};
const fetchIngredientsDataSupplier = ({ queryKey }) => {
  const supplierId = queryKey[1];
  return axios.get(
    `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/ingredients/?supplier_id=${supplierId}`
  );
};

export const useGetIngredientsData = (supplierId = null) => {
  // useQuery hook to get all the ingredients
  // if the supplierID is passed, it can get all the ingredients based on the supplier ID
  const queryKey = supplierId
    ? ["ingredientsData", supplierId]
    : "ingredientsData";
  const queryFn = supplierId
    ? fetchIngredientsDataSupplier
    : fetchIngredientsData;
  return useQuery(queryKey, queryFn);
};
