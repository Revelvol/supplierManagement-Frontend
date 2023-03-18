import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function SupplierForm() {
  const [page, setPage] = useState(1);
  const { register, handleSubmit } = useForm();

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {page === 1 && (
        <div>
          <label htmlFor="name">Name</label> 
          <input {...register("name")} />
          <br></br>
          <label htmlFor="phone">Phone</label>
          <input {...register("phone")} />   
          <br></br>
          <label htmlFor="location">Location</label>
          <input {...register("location")} /> 
          <button onClick={nextPage}>Next</button>
        </div>
      )}
      {page === 2 && (
        <div>
          <label htmlFor="isoDocument">isoDocument</label>
          <input {...register("isoDocument")} />
          <br></br>
          <label htmlFor="gmpDocument">gmpDocument</label>
          <input {...register("gmpDocument")} />
          <br></br>
          <label htmlFor="haccpDocument">haccpDocument</label>
          <input {...register("haccpDocument")} />
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

export default SupplierForm