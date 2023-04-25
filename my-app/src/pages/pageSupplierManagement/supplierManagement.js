import SupplierTables from "../tables/supplierTables";
import { useState } from "react";
import React from "react";
import AddSupplierForm from "../forms/addSupplierForm";
import {
  useDocumentQueries,
  useSuppliersData,
} from "../query/useSuppliersData";
import { Title } from "../../components/style";


function SupplierManagement() {
  const [hideAddSupplier, setHideAddSupplier] = useState(true);

  const handleUnhideAddSupplier = () => {
    setHideAddSupplier(!hideAddSupplier);
  };

  const {
    isLoading: supplierLoading,
    error: supplierError,
    data: supplierData,
  } = useSuppliersData();

  // do multiple usequery to each item in the supplier data based on its supplier id
  const documentQueries = useDocumentQueries(supplierData);

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
        delete:supplier.id
      };
    } catch (error) {
      // error is expected
    }
  });

  if (supplierLoading || documentQueries.some((query) => query.isLoading))
    return "Loading...";

  if (supplierError || documentQueries.some((query) => query.isError))
    return "An error has occurred: " + supplierError.message;

  return (
    <div className="suplier-management-container">
      <Title className="text-center"> Supplier Management</Title>
          <SupplierTables data={suppliersWithDocumentData} />
     
    </div>
  );
}

export default SupplierManagement;
