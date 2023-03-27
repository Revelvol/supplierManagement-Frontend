import { useParams } from "react-router-dom"

function EditSupplier() {
    const { supplierId} = useParams();

    return (
        <h1> Test {supplierId} </h1>
    )
}

export default EditSupplier