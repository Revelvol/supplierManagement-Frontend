import { useSupplierData } from "../query/useSupplierData";
import { useForm } from "react-hook-form";
import { useAuthHeader } from "react-auth-kit";
import { FaFilePdf } from "react-icons/fa";
import { useState } from "react";
import supplierSchema from "../../validations/supplierValidation";
import {
  usePutSupplierData,
  usePatchSupplierDocumentData,
} from "../query/useSupplierData";
import supplierDocumentSchema from "../../validations/supplierDocumentValidation";
import BackButton from "../../components/backButton";

import { useQueryClient } from "react-query";
import { useSuppliersData } from "../query/useSuppliersData";
import { FormContainer, InputField, InputLabel } from "../../components/style";

function EditSupplierForm(props) {
  const queryClient = useQueryClient();
  useSuppliersData();
  const [showIso, setShowIso] = useState(false);
  const [showGmp, setShowGmp] = useState(false);
  const [showHaccp, setShowHaccp] = useState(false);
  const [error, setError] = useState("");
  const token = useAuthHeader();
  const supplierId = props.supplierId;
  const supplier = props.supplier;
  const {
    mutate: editSupplier,
    isLoading: editSupplierIsLoading,
    isSuccess: editSupplierIsSuccess,
  } = usePutSupplierData(supplierId);

  const {
    mutate: editSupplierDocument,
    isLoading: editSupplierDocumentIsLoading,
  } = usePatchSupplierDocumentData(supplierId);

  const handleGmpChange = () => {
    setShowGmp(true);
  };
  const handleIsoChange = () => {
    setShowIso(true);
  };

  const handleHaccpChange = () => {
    setShowHaccp(true);
  };

  const document = {
    data: queryClient.getQueryData(["documentData", parseInt(supplierId)]),
  };

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
        editSupplierDocument({
          token: token(),
          supplierId: supplierId,
          payload: documentPayload,
        });
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

  if (editSupplierIsSuccess) {
    // navigate to the table if the mutation sucess
    return (
      <div>
        <BackButton />
        sucess
      </div>
    );
  }
  // docment will loading because of the api issue
  if (editSupplierIsLoading || editSupplierDocumentIsLoading) {
    return "Is Loading... ";
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      {error !== "" && <div className="alert alert-danger">{error}</div>}
      <InputLabel> Name </InputLabel>
      <InputField
        defaultValue={`${supplier.data.name}`}
        {...register("name")}
      />
      <InputLabel> Phone </InputLabel>
      <InputField
        defaultValue={`${supplier.data.phone}`}
        {...register("phone")}
      />
      <InputLabel> Phone </InputLabel>
      <InputField
        defaultValue={`${supplier.data.location}`}
        {...register("location")}
      />

      <InputLabel htmlFor="isoDocument">isoDocument</InputLabel>
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
          <div style={{ display: showGmp ? "block" : "none" }}>
            <InputField
              type="file"
              {...register("IsoDocument")}
              accept="application/pdf"
            />
          </div>
        </>
      ) : (
        <InputField
          type="file"
          {...register("isoDocument")}
          accept="application/pdf"
        />
      )}

      <InputLabel htmlFor="gmpDocument">gmpDocument</InputLabel>
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
      <InputLabel htmlFor="haccpDocument">haccpDocument</InputLabel>
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

      <input className="" type="submit" />
    </FormContainer>
  );
}

export default EditSupplierForm;
