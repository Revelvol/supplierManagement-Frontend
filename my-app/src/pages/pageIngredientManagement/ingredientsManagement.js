import { useSuppliersData } from "../query/useSuppliersData";
import { Link } from "react-router-dom";

function IngredientManagement() {
  const {
    isLoading: suppliersIsLoading,
    error: suppliersError,
    data: suppliersData,
  } = useSuppliersData();


  if (
    suppliersIsLoading 
  ) {
    return "is loading .... ";
  }

  if (
    suppliersError 
  ) {
    let alertMessage = "";
    if (suppliersError) {
      alertMessage += suppliersError.message + " ";
    }
    
    return (
      <div className="alert alert-danger" role="alert">
        {alertMessage}
      </div>
    );
  }  

  return (
    <div>
      <ul>
        {suppliersData?.data.map((supplier) => {
          return (
            <li id={supplier.id} key={supplier.id}>
              <div
                className="open-supplier-ingredient"
                style={{ cursor: "pointer", fontWeight: "bold" }}
              >
                <Link to={`/ingredient-management/supplier=${supplier.id}`}>
                  {supplier.name}{" "}
                </Link>
              </div>
              <br></br>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default IngredientManagement;
