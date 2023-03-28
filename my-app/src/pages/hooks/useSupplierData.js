//  use the usequery hook to fetch the individual data of the usequery
import { useQueryClient, useQuery } from "react-query";
import axios from "axios";

const fetchSupplierData = ({ queryKey }) => {
  const supplierId = queryKey[1];
  return axios.get(
    `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/suppliers/${supplierId}/`
  );
};

export const useSupplierData = (supplierId) => {
  /*  because the data is already fetch in the main,
   it is better to just do background fetch and serve already existed data */
  const queryClient = useQueryClient();
  return useQuery(["supplierData", supplierId], fetchSupplierData, {
    initialData: () => {
      const supplier = queryClient
        .getQueryData("suppliers")
        ?.data?.find((supplier) => supplier.id === parseInt(supplierId));

      if (supplier) {
        return {
          data: supplier
        };
      } else {
        return undefined;
      }
    },
  });
};