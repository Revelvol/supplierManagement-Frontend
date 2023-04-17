import { useGetFunctionsData } from "../query/useFunctionsData";
import { useGetUnitsData } from "../query/useUnitsData";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { INGREDIENT_SCHEMA } from "../../validations/ingredientValidation";

function AddIngredientForm() {
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

  const functionsOption = functionsData?.data.map((func) => func.name);
  const unitsOption = unitsData?.data.map((unit) => unit.abbreviation);

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  if (functionsIsLoading || unitsIsLoading) {
    return <div>Loading...</div>;
  }

  if (functionsError || unitsError) {
    return <div>Error</div>;
  }
  //   terakhir kali disini dimana formnya mau diimplemment gimana
  return (
    <div>
      Add Ingredient
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <input {...register("name")} placeholder="Ingredient Name" />
        {errors.name && <span>{errors.name.message}</span>}
        <br></br>
        <input {...register("price")} placeholder="Price($)" />
        {errors.price && <span>{errors.price.message}</span>}
        <br></br>
        <input {...register("quantity")} placeholder="Quantity" />

        <select {...register("unit")} placeholder="unit">
          {unitsOption.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.quantity && <span>{errors.quantity.message}</span>}
        <br></br>
        {errors.unit && <span>{errors.unit.message}</span>}
        <select {...register("function")} placeholder="function">
          {functionsOption.map((option) => (
            <option key={option} value={option}>
              {option}
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
        <input type="submit" />
      </form>
    </div>
  );
}

export default AddIngredientForm;
