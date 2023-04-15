import { useGetFunctionsData } from "../query/useFunctionsData";
import { useGetUnitsData } from "../query/useUnitsData";
import { useForm } from "react-hook-form";

function AddIngredientForm() {
  const { register, handleSubmit, formState:{errors} } = useForm();
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
  const unitsOption = unitsData?.data.map((unit) => unit.name);

  const handleFormSubmit = (data) => {
    console.log(data);
  };
//   terakhir kali disini dimana formnya mau diimplemment gimana
  return (
    <div>
      Add Ingredient
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <input
          {...register("name", { required: "this is required" })}
          placeholder="Ingredient Name"
        />
        <p>{errors.name?.message}</p>
        <input
          {...register("price", { required: "this is required" })}
          placeholder="Price($)"
        />
        <p>{errors.price?.message}</p>
        <input type="submit" />
      </form>
    </div>
  );
}

export default AddIngredientForm;
