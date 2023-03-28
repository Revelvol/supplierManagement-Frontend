import { useParams } from "react-router-dom"
import { useSupplierData } from "./hooks/useSupplierData";


function EditSupplier() {
    // implement query by id here 
    const { supplierId } = useParams();

    const { data } = useSupplierData(supplierId); 
    

    return (
        <h1> Test {supplierId} </h1>
    )
}

export default EditSupplier