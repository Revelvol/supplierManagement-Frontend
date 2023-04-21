
import { useParams } from "react-router-dom"
import BackButton from "../../components/backButton"
function EditIngredient () {
    const {ingredientId} = useParams()

    return (
        <div>
            <BackButton/>
            
        </div>
    )

}

export default EditIngredient