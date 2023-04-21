
import { useParams } from "react-router-dom"
import BackButton from "../../components/backButton"
import EditIngredientForm from "../forms/editIngredientForm"
function EditIngredient () {
    const {ingredientId} = useParams()

    return (
        <div>
            <BackButton/>
            <EditIngredientForm ingredientId={ingredientId} />
        </div>
    )

}

export default EditIngredient