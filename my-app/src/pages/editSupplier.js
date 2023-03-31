import { useParams } from "react-router-dom";
import EditSupplierForm from "./forms/editSupplierForm";

function EditSupplier() {
  // implement query by id here
  const { supplierId } = useParams();

  return (
    <div>
        <h1> edit supplier </h1>
      <EditSupplierForm supplierId={supplierId} />
    </div>
  );
}

export default EditSupplier;
