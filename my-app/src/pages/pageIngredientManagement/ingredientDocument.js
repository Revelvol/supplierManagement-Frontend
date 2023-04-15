import { useParams } from "react-router-dom";


function IngredientDocument () {
    const { ingredientId } = useParams();

    return (
        <div>
            {ingredientId}
        </div>
    )
}

export default IngredientDocument