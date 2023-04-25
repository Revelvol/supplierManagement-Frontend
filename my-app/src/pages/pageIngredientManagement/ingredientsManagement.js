import { useState } from "react";
import { useSuppliersData } from "../query/useSuppliersData";
import { Link } from "react-router-dom";
import { GlobalFilterStyles, Title } from "../../components/style";
import AddSupplierForm from "../forms/addSupplierForm";

function IngredientManagement() {
  const {
    isLoading: suppliersIsLoading,
    error: suppliersError,
    data: suppliersData,
  } = useSuppliersData();
  const [filter, setFilter] = useState("");
  const [hideAddSupplier, setHideAddSupplier] = useState(true);

  if (suppliersIsLoading) {
    return "is loading .... ";
  }

  if (suppliersError) {
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

  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  const handleUnhideAddSupplier = () => {
    setHideAddSupplier(!hideAddSupplier);
  };

  return (
    <div>
      <Title className="text-center">Ingredient Management</Title>
      {hideAddSupplier === true ? (
        <div className="col-6">
          <button className="btn btn-info " onClick={handleUnhideAddSupplier}>
            Add Supplier{" "}
          </button>{" "}
        </div>
      ) : (
        <div className="col-6">
          <button className="btn btn-danger" onClick={handleUnhideAddSupplier}>
            Close{" "}
          </button>{" "}
          <Title>Add Supplier </Title>
          <AddSupplierForm />
        </div>
      )}
      <GlobalFilterStyles>
        <span>
          Search : {""}
          <input onChange={handleChange} />
        </span>
      </GlobalFilterStyles>
      {suppliersData?.data[0] === undefined ? "please add supplier " : ""}
      <div className="supplier-list">
        {suppliersData?.data
          .filter((supplier) => {
            return supplier.name.toLowerCase().includes(filter.toLowerCase());
          })
          .map((supplier) => {
            return (
              <div id={supplier.id} key={supplier.id} className="supplier-box">
                <Link to={`/ingredient-management/supplier=${supplier.id}`}>
                  {supplier.name}
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default IngredientManagement;
