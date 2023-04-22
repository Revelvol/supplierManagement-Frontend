import { useGetFunctionsData } from "../query/useFunctionsData";
import { useGetUnitsData } from "../query/useUnitsData";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { INGREDIENT_SCHEMA } from "../../validations/ingredientValidation";
import { useAuthHeader } from "react-auth-kit";
import { usePatchIngredientsDocumentData } from "../query/useIngredientsDocumentData";
import {
  usePutIngredientData,
  useGetIngredientData,
} from "../query/useIngredientsData";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import { useState } from "react";

function EditIngredientForm() {
  const params = useParams();
  const ingredientId = params.ingredientId;
  const supplierId = params.supplierId.split("=")[1];
  const queryClient = useQueryClient();
  const token = useAuthHeader();
  const [editDocument, setEditDocument] = useState({
    isoDocument: false,
    gmoDocument: false,
    kosherDocument: false,
    halalDocument: false,
    msdsDocument: false,
    tdsDocument: false,
    coaDocument: false,
    allergenDocument: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(INGREDIENT_SCHEMA),
  });

  const {
    isLoading: functionsIsLoading,
    error: functionsError,
    data: functionsData,
  } = useGetFunctionsData();

  const {
    isLoading: unitsIsLoading,
    error: unitsError,
    data: unitsData,
  } = useGetUnitsData();

  const {
    isLoading: ingredientIsLoading,
    data: ingredientData,
    error: ingredientError,
  } = useGetIngredientData(ingredientId);

  const document = {
    data: queryClient.getQueryData([
      "ingredientDocumentData",
      parseInt(ingredientId),
    ]),
  };

  const functionsOption = functionsData?.data;
  const unitsOption = unitsData?.data;

  const {
    mutate: putIngredient,
    isLoading: putIngredientIsLoading,
    error: putIngredientError,
  } = usePutIngredientData();

  const {
    mutate: patchIngredientDocument,
    isLoading: patchIngredientIsLoading,
    error: patchIngredientError,
  } = usePatchIngredientsDocumentData();

  const onSubmit = (data) => {
    // add ingredrient and retreive its ingredient id
    console.log(data);
  };

  const pdfInputLabel = (name) => {
   /*  conditional jsx to render edit  
   button if there is document link yet  */
    return document.data[name] !== null ? (
      <>
        <label htmlFor={name}>{name}</label>
        <a href={document.data[name]} target="_blank" rel="noopener noreferrer">
          <FaFilePdf />
        </a>
        {!editDocument[name] ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              setEditDocument({
                ...editDocument,
                [name]: !editDocument[name],
              });
            }}
          >
            {" "}
            Edit{" "}
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              setEditDocument({
                ...editDocument,
                [name]: !editDocument[name],
              });
            }}
          >
            {" "}
            Cancel{" "}
          </button>
        )}

        <div style={{ display: editDocument[name] ? "block" : "none" }}>
          <input type="file" {...register(name)} accept="application/pdf" />
          {errors[name] && <span>{errors[name].message}</span>}
        </div>
      </>
    ) : (
      <div>
        <label htmlFor={name}>{name}</label>
        <input type="file" {...register(name)} accept="application/pdf" />
        {errors[name] && <span>{errors[name].message}</span>}
      </div>
    );
  };

  if (
    functionsIsLoading ||
    unitsIsLoading ||
    putIngredientIsLoading ||
    patchIngredientIsLoading ||
    ingredientIsLoading
  ) {
    return <div>Loading...</div>;
  }

  if (
    functionsError ||
    unitsError ||
    putIngredientError ||
    patchIngredientError ||
    ingredientError
  ) {
    return <div>Error</div>;
  }
  // register the supplier and token value to the form data set
  register("supplier", { value: supplierId });
  register("token", { value: token() });

  return (
    <div>
      Edit Ingredient
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Ingredient Name" />
        {errors.name && <span>{errors.name.message}</span>}
        <br></br>
        <input {...register("price")} placeholder="Price($)" />
        {errors.price && <span>{errors.price.message}</span>}
        <br></br>
        <input {...register("quantity")} placeholder="Quantity" />

        <select {...register("unit")} placeholder="unit">
          {unitsOption.map((option) => (
            <option key={option.id} value={JSON.stringify(option)}>
              {option.abbreviation}
            </option>
          ))}
        </select>
        {errors.quantity && <span>{errors.quantity.message}</span>}
        <br></br>
        {errors.unit && <span>{errors.unit.message}</span>}
        <select {...register("function")} placeholder="function">
          {functionsOption.map((option) => (
            <option key={option.id} value={JSON.stringify(option)}>
              {option.name}
            </option>
          ))}
        </select>
        <br></br>
        {errors.function && <span>{errors.function.message}</span>}
        <select {...register("is_used")} defaultValue="">
          <option value="true">used</option>
          <option value="false">not used </option>
        </select>
        <br></br>
        {errors.is_used && <span>{errors.is_used.message}</span>}
        <br></br>
        {pdfInputLabel("isoDocument")}
        {pdfInputLabel("gmoDocument")}
        {pdfInputLabel("kosherDocument")}
        {pdfInputLabel("halalDocument")}
        {pdfInputLabel("msdsDocument")}
        {pdfInputLabel("tdsDocument")}
        {pdfInputLabel("coaDocument")}
        {pdfInputLabel("allergenDocument")}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditIngredientForm;
