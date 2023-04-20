//  use the usequery hook to fetch the individual data of the usequery
import { useQueryClient, useQuery, useMutation } from "react-query";
import axios from "axios";

const fetchSupplierData = ({ queryKey }) => {
  const supplierId = queryKey[1];
  return axios.get(
    `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/suppliers/${supplierId}/`
  );
};

const fetchSupplierDocumentData = ({ queryKey }) => {
  const supplierId = queryKey[1];
  return axios.get(
    `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/suppliers/${supplierId}/upload-document/`
  );
};

const putSupplierData = (data) => {
  const supplierId = data.supplierId;
  return axios.put(
    `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/suppliers/${supplierId}/`,
    data.payload,
    {
      headers: {
        Authorization: data.token,
      },
    }
  );
};

const patchDocumentData = (data) => {
  const documents = new FormData();
  if (data.payload.isoDocument) {
    
    documents.append("isoDocument", data.payload.isoDocument);
  }

  if (data.payload.haccpDocument) {
    documents.append("haccpDocument", data.payload.haccpDocument);
  }

  if (data.payload.gmpDocument) {
    documents.append("gmpDocument", data.payload.gmpDocument);
  }

  const supplierId = data.supplierId;
  return axios.patch(
    `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/suppliers/${supplierId}/upload-document/`,
    documents,

    {
      headers: {
        Authorization: data.token,
      },
    }
  );
};

export const useSupplierData = (supplierId) => {
  /*  because the data is already fetch in the main,
   it is better to just do background fetch and serve already existed data */
  const queryClient = useQueryClient();
  return useQuery(["supplierData", parseInt(supplierId)], fetchSupplierData, {
    initialData: () => {
      const supplier = queryClient
        .getQueryData("suppliers")
        ?.data?.find((supplier) => supplier.id === parseInt(supplierId));

      if (supplier) {
        return {
          data: supplier,
        };
      } else {
        return undefined;
      }
    },
  });
};

export const usePutSupplierData = (supplierId) => {
  const queryClient = useQueryClient();
  return useMutation(putSupplierData, {
    onSuccess: () => {
      queryClient.invalidateQueries("suppliersData");
      queryClient.invalidateQueries(["supplierData", supplierId]);
    },
  });
};

export const usePatchSupplierDocumentData = (supplierId) => {
  const queryClient = useQueryClient();
  return useMutation(patchDocumentData, {
    onSuccess: () => {
      queryClient.invalidateQueries(["documentData", parseInt(supplierId)]);
    },
  });
};

export const useSupplierDocumentData = (supplierId) => {
  /* same as above get the dcument data from the cache, 
  or when it is not avairble */
  const queryClient = useQueryClient();

  return useQuery(["documentData", supplierId], fetchSupplierDocumentData, {
    initialData: () => {
      const document = queryClient
        .getQueryData(["documentData", parseInt(supplierId)])
        ?.data.find();
      if (document) {
        return {
          data: document,
        };
      } else {
        return undefined;
      }
    },
  });
};
