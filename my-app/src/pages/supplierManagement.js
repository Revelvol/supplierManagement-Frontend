// import react table here
import { useQuery, useQueries } from "react-query";
import SupplierTables from "./tables/supplierTables";
import React from "react";

const supplierUrl =
  "http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/suppliers/";

function SupplierManagement() {
  const columns = React.useMemo(
    () => [
      // {
      //   Header: 'No',
      //   accessor: 'id'
      // },
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "document",
        columns: [
          {
            Header: "ISO",
            accessor: "isoDocument",
          },
          {
            Header: "GMP",
            accessor: "gmpDocument",
          },
          {
            Header: "HACCP",
            accessor: "haccpDocument",
          },
        ],
      },
    ],
    []
  );
  const {
    isLoading: supplierLoading,
    error: supplierError,
    data: supplierData,
  } = useQuery("supplierData", () =>
    fetch(supplierUrl).then((res) => res.json())
  );

  const documentQueries = useQueries(
    supplierData?.map((supplier) => ({
      queryKey: ["documentsData", supplier.id],
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

  console.log(documentQueries);
  documentQueries.forEach((response) => {
    console.log(response.data);
  });

  // map the document data with the correct supplier data
  const suppliersWithDocumentData = supplierData?.map((supplier) => {
    try {
      const documents = documentQueries.find(
        (query) => query.data.supplier === supplier.id
      ).data;

      return {
        ...supplier,
        isoDocument: documents?.isoDocument || null,
        gmpDocument: documents?.gmpDocument || null,
        haccpDocument: documents?.haccpDocument || null,
      };
    } catch (error) {}
  });

  console.log(suppliersWithDocumentData);

  if (supplierLoading || documentQueries.some((query) => query.isLoading))
    return "Loading...";

  if (supplierError) return "An error has occurred: " + supplierError.message;

  return (
    <div>
      supplier Management
      <SupplierTables columns={columns} data={supplierData} />
    </div>
  );
}

export default SupplierManagement;
