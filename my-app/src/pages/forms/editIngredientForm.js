import { useGetFunctionsData } from "../query/useFunctionsData";
import { useGetUnitsData } from "../query/useUnitsData";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { INGREDIENT_SCHEMA } from "../../validations/ingredientValidation";
import { useAuthHeader } from "react-auth-kit";
import { usePatchIngredientsDocumentData } from "../query/useIngredientsDocumentData";
import {
  usePutIngredientData,
  useGetIngredientData,
} from "../query/useIngredientsData";
import { useQueryClient } from "react-query";

function EditIngredientForm({ supplierId, ingredientId }) {
  const queryClient = useQueryClient();
  const token = useAuthHeader();
  const pdfInputLabel = (name) => {
    /* helper function to put document jsx label  */
    return (
      <div>
        <label htmlFor={name}>{name}</label>
        <input type="file" {...register(name)} accept="application/pdf" />
        {errors[name] && <span>{errors[name].message}</span>}
      </div>
    );
  };
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
    data: queryClient.getQueryData(["documentData", parseInt(ingredientId)]),
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
    console.log(data)
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
