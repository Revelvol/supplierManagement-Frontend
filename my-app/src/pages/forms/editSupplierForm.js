import { useSupplierData } from "../query/useSupplierData";
import { useForm } from "react-hook-form";
import { useAuthHeader } from "react-auth-kit";

function EditSupplierForm(props) {
  const token = useAuthHeader();
  const supplierId = props.supplierId;
  const { data: supplier } = useSupplierData(supplierId);

  console.log(supplier)

  const onSubmit = (data) =>  console.log(supplier);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label> Name </label>
      <input defaultValue={``} {...register("name")} />
      <br></br>
      <label> Phone </label>
      <input defaultValue="test" {...register("phone")} />
      <br></br>
      <label> Phone </label>
      <input defaultValue="test" {...register("location")} />
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
