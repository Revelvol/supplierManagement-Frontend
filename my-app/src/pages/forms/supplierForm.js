import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import supplierSchema from "../../validations/supplierValidation";
import supplierDocumentSchema from "../../validations/supplierDocumentValidation";
import { useAuthHeader } from "react-auth-kit";

const supplierUrl =
  "http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/suppliers/";

function SupplierForm() {
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const token = useAuthHeader();

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top of page on page change
  }, [page]);

  const onSubmit = async (data) => {
    const supplierDocumentData = {
      isoDocument: data.isoDocument[0],
      gmpDocument: data.gmpDocument[0],
      haccpDocument: data.haccpDocument[0],
    };
    console.log(supplierDocumentData);
    try {
      await supplierDocumentSchema.validate(supplierDocumentData);

      // post the suplier data
      const supplierData = {
        name: data.name,
        phone: data.phone,
        location: data.location,
      };

      const supplierResponse = await fetch(supplierUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token(),
        },
        body: JSON.stringify(supplierData),
      });

      if (supplierResponse.ok) {
        // if response is good post the suplier document with the supplier id
        const supplierResponseData = await supplierResponse.json();
        const supplierId = supplierResponseData.id;
        const supplierDocumentUrl = `http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/suppliers/${supplierId}/upload-document/`;
        console.log(supplierDocumentData);
        var documents = new FormData();
        if (data.isoDocument[0] !== "") {
          documents.append("isoDocument", data.isoDocument[0]);
        }
        if (data.haccpDocument[0] !== "") {
          documents.append("haccpDocument", data.haccpDocument[0]);
        }
        if (data.gmpDocument[0] !== "") {
          documents.append("gmpDocument", data.gmpDocument[0]);
        }
        const supplierDocumentResponse = await fetch(supplierDocumentUrl, {
          method: "POST",
          headers: {
            Authorization: token(),
          },
          body: documents,
        });
        
        if (!supplierDocumentResponse.ok){
          setError("Something Wrong With The file Upload, please upload again")
        }

      } else {
        setError(
          "Something When wrong with the supplier submision, please try Again"
        );
      }
      // if response is not good set error

      setPage(1);
      setError("");
      reset({});
    } catch (error) {
      setError(error.errors);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const validateSupplierData = async (data) => {
    // can use validate method to catch error
    const supplierData = {
      name: data.name,
      phone: data.phone,
      location: data.location,
    };
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
      {error !== "" && <div className="alert alert-danger">{error}</div>}

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
          <button type="submit">Submit</button>
        </div>
      )}
    </form>
  );
}

export default SupplierForm;
