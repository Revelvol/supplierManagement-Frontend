import { useParams } from "react-router-dom";
import EditSupplierForm from "../forms/editSupplierForm";

import { Title } from "../../components/style";
import { useSupplierData } from "../query/useSupplierData";

function EditSupplier() {
  // implement query by id here

  const { supplierId } = useParams();

  const { isLoading, error, data } = useSupplierData(supplierId);
  if (isLoading) {
    return "isLoading";
  }
  if (error) {
    return "error ";
  }
  const supplierName = data?.data.name;
  return (
    <div>
      <Title> Edit Supplier : {supplierName}</Title>
      <EditSupplierForm supplierId={supplierId} supplier={data} />
    </div>
  );
}

export default EditSupplier;
