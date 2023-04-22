import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const supplierUrl =
  "http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/suppliers/";

const addSupplier = (data) => {
  return fetch(supplierUrl, {
    method: "POST",
    body: JSON.stringify(data.supplier),
    headers: {
      "Content-Type": "application/json",
      Authorization: data.token,
    },
  }).then((res) => {
    return res.json();
  });
};

const addSupplierDocument = (data) => {
  const supplierId = data.supplier;
  const documents = new FormData();
  const token = data.token;
  const supplierDocumentUrl = `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/suppliers/${supplierId}/upload-document/`;
  if (data.documents.isoDocument) {
    documents.append("isoDocument", data.documents.isoDocument);
  }

  if (data.documents.haccpDocument) {
    documents.append("haccpDocument", data.documents.haccpDocument);
  }

  if (data.documents.gmpDocument) {
    documents.append("gmpDocument", data.documents.gmpDocument);
  }

  return axios.get(supplierDocumentUrl, {
    headers: {
      Authorization: token,
    },
  })
  .then(response => {
    // Document already exists, so do a PATCH request
    return axios.patch(supplierDocumentUrl, documents, {
      headers: {
        Authorization: token,
      },
    });
  })
  .catch(error => {
    // Document doesn't exist, so do a POST request
    return axios.post(supplierDocumentUrl, documents, {
      headers: {
        Authorization: token,
      },
    });
  });
};

const fetchSuppliersData = () => {
  return axios.get(supplierUrl);
};

export const useAddSupplierDocument = () => {
  const queryClient = useQueryClient();
  return useMutation(addSupplierDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries("documentData");
    },
    onError: () => {
      queryClient.invalidateQueries("documentData");
    }
  });
};

// addsupplierData, take data as the argument
export const useAddSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation(addSupplier, {
    onSuccess: () => {
      queryClient.invalidateQueries("suppliersData");
    },
  });
};

// fetch suplierData
export const useSuppliersData = () => {
  return useQuery("suppliersData", fetchSuppliersData);
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
