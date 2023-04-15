import { useParams } from "react-router-dom";
import BackButton from "../../components/backButton";


function EditDocument () {
    const { ingredientId } = useParams();

    return (
        <div>
            <BackButton/>
            {ingredientId}
        </div>
    )
}

export default EditDocument