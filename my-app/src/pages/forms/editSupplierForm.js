import { useSupplierData, useSupplierDocumentData } from "../query/useSupplierData";
import { useForm } from "react-hook-form";
import { useAuthHeader } from "react-auth-kit";

function EditSupplierForm(props) {
  const token = useAuthHeader();
  const supplierId = props.supplierId;
  const {
    data: supplier,
    isLoading: supplierIsLoading,
    isError: supplierIsError,
    error: supplierError,
  } = useSupplierData(supplierId);
  const {
    data: document,
    isLoading: documentIsLoading,
    isError: documentIsError,
    error: documentError,
  } = useSupplierDocumentData(supplierId)
  console.log(document)

  const onSubmit = (data) => console.log(supplier);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (supplierIsLoading) {
    return "Is Loading... ";
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label> Name </label>
      <input value={`${supplier.data.name}`} {...register("name")} />
      <br></br>
      <label> Phone </label>
      <input value={`${supplier.data.phone}`} {...register("phone")} />
      <br></br>
      <label> Phone </label>
      <input value={`${supplier.data.location}`} {...register("location")} />
      <br></br>

      <label htmlFor="isoDocument">isoDocument</label>
      <input
        type="file"
        {...register("isoDocument")}
        accept="application/pdf"
      />

      <br></br>
      <label htmlFor="gmpDocument">gmpDocument</label>
      <input
        type="file"
        {...register("gmpDocument")}
        accept="application/pdf"
      />
      <br></br>
      <label htmlFor="haccpDocument">haccpDocument</label>
      <input
        type="file"
        {...register("haccpDocument")}
        accept="application/pdf"
      />

      <br></br>

      <input type="submit" />
    </form>
  );
}

export default EditSupplierForm;
