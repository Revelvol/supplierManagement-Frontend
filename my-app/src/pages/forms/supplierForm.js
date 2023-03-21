import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import supplierSchema from "../../validations/supplierValidation";

function SupplierForm() {
  const [page, setPage] = useState(1);
  let { register, handleSubmit } = useForm();

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top of page on page change
  }, [page]);

  const onSubmit = (data) => {
    console.log(data);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const validateSupplierData = async (data) => {
    // can use validate method to catch error 
    const supplierData = data;
    const isValid = await supplierSchema.isValid(supplierData);
    if (isValid) {
      nextPage();
    } else {
      alert("Please fill with the correct format");
      document.getElementsByName("name")[0].value = "";
      document.getElementsByName("phone")[0].value = "";
      document.getElementsByName("location")[0].value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {page === 1 && (
        <div>
          <label htmlFor="name">Name</label>
          <input {...register("name")} placeholder="example" required />
          <br></br>
          <label htmlFor="phone">Phone</label>
          <input {...register("phone")} placeholder="+62123456789" />
          <br></br>
          <label htmlFor="location">Location</label>
          <input
            {...register("location")}
            placeholder="City,Country"
            required
          />
          <button onClick={handleSubmit(validateSupplierData)}>Next</button>
        </div>
      )}
      {page === 2 && (
        <div>
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
          <button onClick={prevPage}>Back</button>
          <button onClick={nextPage}>Next</button>
        </div>
      )}
      {page === 3 && (
        <div>
          <label htmlFor="email">Email</label>
          <input {...register("email")} />
          <button onClick={prevPage}>Back</button>
          <button type="submit">Submit</button>
        </div>
      )}
    </form>
  );
}

export default SupplierForm;
