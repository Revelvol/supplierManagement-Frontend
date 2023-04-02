import {
  useSupplierData,
  useSupplierDocumentData,
} from "../query/useSupplierData";
import { useForm } from "react-hook-form";
import { useAuthHeader } from "react-auth-kit";
import { FaFilePdf } from "react-icons/fa";
import { useState } from "react";
import supplierSchema from "../../validations/supplierValidation";
import { usePutSupplierData } from "../query/useSupplierData";
import supplierDocumentSchema from "../../validations/supplierDocumentValidation";

function EditSupplierForm(props) {
  const [showIso, setShowIso] = useState(false);
  const [showGmp, setShowGmp] = useState(false);
  const [showHaccp, setShowHaccp] = useState(false);
  const [error, setError] = useState("");
  const token = useAuthHeader();
  const supplierId = props.supplierId;
  const {
    mutate: editSupplier,
    data: updatedSupplierData,
    isLoading: editSupplierIsLoading,
    isError: editSupplierIsError,
    error: editSupplierError,
  } = usePutSupplierData(supplierId);

  const handleGmpChange = () => {
    setShowGmp(true);
  };
  const handleIsoChange = () => {
    setShowIso(true);
  };

  const handleHaccpChange = () => {
    setShowHaccp(true);
  };

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
  } = useSupplierDocumentData(supplierId);

  const onSubmit = async (data) => {
    const supplierPayload = {
      name: data.name,
      phone: data.phone,
      location: data.location,
    };
    // validate the supplierPayload
    try {
      await supplierSchema.validate(supplierPayload);
      //  if the supplier schema is validated, patch the data into the new one
      editSupplier({
        token: token(),
        supplierId: supplierId,
        payload: supplierPayload,
      });
      try {
        // validate the document payload 
        const documentPayload = {};
        if (data.isoDocument && data.isoDocument[0]) {
          documentPayload.isoDocument = data.isoDocument[0];
        }
        if (data.gmpDocument && data.gmpDocument[0]) {
          documentPayload.gmpDocument = data.gmpDocument[0];
        }
        if (data.haccpDocument && data.haccpDocument[0]) {
          documentPayload.haccpDocument = data.haccpDocument[0];
        }
        await supplierDocumentSchema.validate(documentPayload);

      } catch (validationError) {
        setError(validationError.errors);
      }
    } catch (validationError) {
      setError(validationError.errors);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // docment will loading because of the api issue
  if (supplierIsLoading || documentIsLoading || editSupplierIsLoading) {
    return "Is Loading... ";
  }
  if (supplierIsError) {
    return `Something Went Wrong, please refresh the page ${supplierError}`;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error !== "" && <div className="alert alert-danger">{error}</div>}
      <label> Name </label>
      <input defaultValue={`${supplier.data.name}`} {...register("name")} />
      <br></br>
      <label> Phone </label>
      <input defaultValue={`${supplier.data.phone}`} {...register("phone")} />
      <br></br>
      <label> Phone </label>
      <input
        defaultValue={`${supplier.data.location}`}
        {...register("location")}
      />
      <br></br>

      <label htmlFor="isoDocument">isoDocument</label>
      {document && document.data.isoDocument ? (
        <>
          <a
            href={document.data.isoDocument}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFilePdf />
          </a>
          {!showIso ? <button onClick={handleIsoChange}> Edit </button> : ""}
          <div style={{ display: showIso ? "block" : "none" }}>
            <input
              type="file"
              {...register("IsoDocument")}
              accept="application/pdf"
            />
          </div>
        </>
      ) : (
        <input
          type="file"
          {...register("isoDocument")}
          accept="application/pdf"
        />
      )}

      <br></br>
      <label htmlFor="gmpDocument">gmpDocument</label>
      {document && document.data.gmpDocument ? (
        <>
          <a
            href={document.data.gmpDocument}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFilePdf />
          </a>
          {!showGmp ? <button onClick={handleGmpChange}> Edit </button> : ""}
          <div style={{ display: showGmp ? "block" : "none" }}>
            <input
              type="file"
              {...register("gmpDocument")}
              accept="application/pdf"
            />
          </div>
        </>
      ) : (
        <input
          type="file"
          {...register("gmpDocument")}
          accept="application/pdf"
        />
      )}

      <br></br>
      <label htmlFor="haccpDocument">haccpDocument</label>
      {document && document.data.haccpDocument ? (
        <>
          <a
            href={document.data.haccpDocument}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFilePdf />
          </a>
          {!showHaccp ? (
            <button onClick={handleHaccpChange}> Edit </button>
          ) : (
            ""
          )}
          <div style={{ display: showHaccp ? "block" : "none" }}>
            <input
              type="file"
              {...register("haccpDocument")}
              accept="application/pdf"
            />
          </div>
        </>
      ) : (
        <input
          type="file"
          {...register("haccpDocument")}
          accept="application/pdf"
        />
      )}

      <br></br>

      <input type="submit" />
    </form>
  );
}

export default EditSupplierForm;