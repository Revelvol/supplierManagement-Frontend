import { useGetFunctionsData } from "../query/useFunctionsData";
import { useGetUnitsData } from "../query/useUnitsData";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { INGREDIENT_SCHEMA } from "../../validations/ingredientValidation";
import { useAuthHeader } from "react-auth-kit";
import { useAddIngredientData } from "../query/useIngredientsData";
import { useAddIngredientsDocumentData } from "../query/useIngredientsDocumentData";

function AddIngredientForm({ supplierId }) {
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
    reset,
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
    mutate: addIngredient,
    isLoading: addIngredientIsLoading,
    error: addIngredientError,
  } = useAddIngredientData();

  const {
    mutate: addIngredientDocument,
    isLoading: addIngredientDocumentIsLoading,
    error: addIngredientDocumentError,
  } = useAddIngredientsDocumentData();

  const functionsOption = functionsData?.data
  const unitsOption = unitsData?.data

  const onSubmit = (data) => {
    // add ingredrient and retreive its ingredient id
    addIngredient(
      { data: data },
      {
        onSuccess: (res) => {
          const ingredientId = res.data.id
          // add ingredient document ERRROR 
          addIngredientDocument({data:data, id:ingredientId}, {
            onSuccess: (res) => {console.log(res.data)}
          })
        },
      }
    );

  };

  if (
    functionsIsLoading ||
    unitsIsLoading ||
    addIngredientDocumentIsLoading ||
    addIngredientIsLoading
  ) {
    return <div>Loading...</div>;
  }

  if (functionsError || unitsError || addIngredientDocumentError) {
    return <div>Error</div>;
  }
  register("supplier", { value: supplierId });
  register("token", { value: token() });
  // register("id", )
  return (
    <div>
      Add Ingredient
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

export default AddIngredientForm;
