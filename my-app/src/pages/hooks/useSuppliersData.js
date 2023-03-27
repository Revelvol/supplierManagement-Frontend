import { useMutation, useQueries, useQuery } from "react-query";
import axios from "axios";

const supplierUrl =
  "http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/suppliers/";

const addSupplier = (data) => {
  return fetch(supplierUrl, {
    method: "POST",
    body: JSON.stringify(data.data),
    headers: {
      "Content-Type": "application/json",
      Authorization: data.token,
    },
  });
};


const fetchSupplierData = () => {
  return axios.get(supplierUrl);
};

// addsupplierData, take data as the argument
export const useAddSupplierData = () => {
  return useMutation(addSupplier);
};

// fetch suplierData
export const useSupplierData = () => {
  return useQuery("suppliersData", fetchSupplierData);
};

// take suplier data as an argument and fetch the coresponding document
// might wanna look into react hook data transformation to return a corect format 
export const useDocumentQueries = (supplierData) => {
  return useQueries(
    supplierData?.data.map((supplier) => ({
      queryKey: ["documentData", supplier.id],
      queryFn: () =>
        fetch(
          `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/suppliers/${supplier.id}/upload-document/`
        ).then((res) => {
          if (!res.ok) {
            return {
              supplier: supplier.id,
              isoDocument: null,
              gmpDocument: null,
              haccpDocument: null,
            };
          }
          return res.json();
        }),
    })) || []
  );
};
