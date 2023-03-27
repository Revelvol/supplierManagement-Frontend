// import react table here

import SupplierTables from "./tables/supplierTables";
import React from "react";
import SupplierForm from "./forms/supplierForm";
import { useDocumentQueries, useSupplierData } from "./hooks/useSuppliersData";

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
      {
        Header: "edit",
        accessor: "edit",
      },
    ],
    []
  );
  // fetch suplier data  (working fine )
  const {
    isLoading: supplierLoading,
    error: supplierError,
    data: supplierData,
  } = useSupplierData()

  // do multiple usequery to each item in the supplier data based on its supplier id
  const documentQueries = useDocumentQueries(supplierData)

  // map the document data with the correct supplier data
  const suppliersWithDocumentData = supplierData?.data.map((supplier) => {
    try {
      const documents = documentQueries.find(
        (query) => query.data.supplier === supplier.id
      ).data;

      return {
        ...supplier,
        isoDocument: documents?.isoDocument || null,
        gmpDocument: documents?.gmpDocument || null,
        haccpDocument: documents?.haccpDocument || null,
        edit: supplier.id,
      };
    } catch (error) {
      // error is expected 
    }
  });

  if (
    supplierLoading ||
    documentQueries.some((query) => query.isLoading) 
  )
    return "Loading...";

  if (supplierError|| documentQueries.some((query) => query.isError)) return "An error has occurred: " + supplierError.message;

  return (
    <div>
      supplier Management
      <br></br>
      <SupplierForm />
      <SupplierTables columns={columns} data={suppliersWithDocumentData} />
    </div>
  );
}

export default SupplierManagement;
