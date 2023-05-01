//  use the usequery hook to fetch the individual data of the usequery
import { useQueryClient, useQuery, useMutation } from "react-query";
import axios from "axios";

const fetchSupplierData = ({ queryKey }) => {
  const supplierId = queryKey[1];
  return axios.get(
    `https://www.revelvolsuppliermanagement.online/api/suppliers/${supplierId}/`
  );
};

const fetchSupplierDocumentData = ({ queryKey }) => {
  const supplierId = queryKey[1];
  return axios.get(
    `https://www.revelvolsuppliermanagement.online/api/suppliers/${supplierId}/upload-document/`
  );
};

const deleteSupplierData = (data) => {
  const supplierId = data.supplierId;
  return axios.delete(
    `https://www.revelvolsuppliermanagement.online/api/suppliers/${supplierId}/`,

    {
      headers: {
        Authorization: data.token,
      },
    }
  );
};

const putSupplierData = (data) => {
  const supplierId = data.supplierId;
  return axios.put(
    `https://www.revelvolsuppliermanagement.online/api/suppliers/${supplierId}/`,
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
    `https://www.revelvolsuppliermanagement.online/api/suppliers/${supplierId}/upload-document/`,
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
      queryClient.invalidateQueries(["suppliersData"]);
      queryClient.invalidateQueries(["supplierData", parseInt(supplierId)]);
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

export const useDeleteSupplierData = (supplierId) => {
  /* usequery hook to delete supplier data  */
  const queryClient = useQueryClient();
  return useMutation(deleteSupplierData, {
    onSuccess: () => {
      queryClient.invalidateQueries(["suppliersData"]);
      queryClient.removeQueries(["supplierData", parseInt(supplierId)]);
    },
  });
};
