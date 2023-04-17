import { useSuppliersData } from "../query/useSuppliersData";
import { useGetIngredientsData } from "../query/useIngredientsData";
import { useState, useMemo } from "react";
import IngredientTables from "../tables/IngredientTables";
import { ColumnFilter, isUsedFilter } from "../tables/Filter/columnFilter";
import AddIngredientForm from "../forms/addIngredientForm";
import { Link } from "react-router-dom";
import { FaFilePdf, FaEdit } from "react-icons/fa";
import { useGetIngredientsDocumentsData } from "../query/useIngredientsDocumentData";

function IngredientManagement() {
  const [ingredientTable, setIngredientTable] = useState(<div> </div>);

  // ada bug di filtering yang object dan is used
  const COLUMNS = useMemo(
    () => [
      {
        Header: "Ingredient Name",
        accessor: "name",
        Filter: ColumnFilter,
      },
      {
        Header: "Price ($)",
        accessor: "price",
        Filter: ColumnFilter,
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        Filter: ColumnFilter,
      },
      {
        Header: "Unit",
        accessor: "unit",
        Cell: ({ value }) => {
          return value.abbreviation;
        },
        Filter: ColumnFilter,
        filter: (row, columnIds, filterValue) => {
          return row.filter((row) =>
            row.values.unit.abbreviation.includes(filterValue)
          );
        },
      },
      {
        Header: "Function",
        accessor: "function",
        Cell: ({ value }) => {
          return value.name;
        },
        Filter: ColumnFilter,
        filter: (row, columnIds, filterValue) => {
          return row.filter((row) =>
            row.values.function.name.includes(filterValue)
          );
        },
      },
      {
        Header: "Is Used",
        accessor: "is_used",
        Cell: ({ value }) =>
          value ? (
            <div className="d-flex align-items-center justify-content-center h-100 bg-success">
              <span className="text-center text-white">Used</span>
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100 bg-danger">
              <span className="text-center text-white">Not Used </span>
            </div>
          ),
        Filter: isUsedFilter,
      },
      // {
      //   Header: "Edit",
      //   accessor: "id",
      //   Cell: ({ value }) => {
      //     return (
      //       <div>
      //         <Link to={`/ingredient-management/edit/${value}`}>
      //           <FaEdit style={{ marginRight: "0.5rem" }} />
      //         </Link>
      //       </div>
      //     );
      //   },
      //   Filter: ColumnFilter,
      //   disableFilters: true,
      // },
      {
        Header: "Documents",
        columns: [
          {
            Header: "ISO",
            Filter: ColumnFilter,
            disableFilters: true,
            accessor: "isoDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
          {
            Header: "GMO",
            Filter: ColumnFilter,
            disableFilters: true,
            accessor: "gmoDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
          {
            Header: "Kosher",
            Filter: ColumnFilter,
            disableFilters: true,
            accessor: "kosherDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
          {
            Header: "Halal",
            Filter: ColumnFilter,
            disableFilters: true,
            accessor: "halalDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
          {
            Header: "MSDS",
            Filter: ColumnFilter,
            disableFilters: true,
            accessor: "msdsDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
          {
            Header: "COA",
            Filter: ColumnFilter,
            disableFilters: true,
            accessor: "coaDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
          {
            Header: "Allergen",
            Filter: ColumnFilter,
            disableFilters: true,
            accessor: "allergenDocument",
            Cell: ({ value }) =>
              value ? (
                <a href={value} target="_blank">
                  <FaFilePdf />
                </a>
              ) : null,
          },
        ],
      },
    ],
    []
  );

  const {
    isLoading: suppliersIsLoading,
    error: suppliersError,
    data: suppliersData,
  } = useSuppliersData();

  const {
    isLoading: ingredientsIsLoading,
    error: ingredientsError,
    data: ingredientsData,
  } = useGetIngredientsData();

  const documentQueries = useGetIngredientsDocumentsData(ingredientsData);

  const ingredientsWithDocumentData = ingredientsData?.data.map(
    /* map ingredient with document data */
    (ingredient) => {
      try {
        const documents = documentQueries.find(
          (query) => parseInt(query.data.ingredient) === parseInt(ingredient.id)
        ).data;
        const mergedData = {
          ...ingredient,
          ...documents,
        };

        delete mergedData.ingredient;
        return mergedData;
      } catch (err) {
        // error happen here
      }
    }
  );

  if (
    suppliersIsLoading ||
    ingredientsIsLoading ||
    documentQueries.some((query) => query.isLoading)
  ) {
    return "is loading .... ";
  }

  if (
    suppliersError ||
    ingredientsError ||
    documentQueries.some((query) => query.error)
  ) {
    let alertMessage = "";
    if (suppliersError) {
      alertMessage += suppliersError.message + " ";
    }
    if (ingredientsError) {
      alertMessage += ingredientsError.message + " ";
    }
    documentQueries.forEach((query) => {
      if (query.error) {
        alertMessage += query.error.message + " ";
      }
    });
    return (
      <div className="alert alert-danger" role="alert">
        {alertMessage}
      </div>
    );
  }

  const handleSupplierClick = (event) => {
    /* set the displayed table of ingredient 
    based on the supplier clicked*/
    const supplierId = event.target.parentNode.id;
    const ingredientData = ingredientsWithDocumentData.map((ingredient) => {
      if (ingredient.supplier === parseInt(supplierId)) {
        return ingredient;
      } else {
        return null;
      }
    });
    // if null render nothing
    if (ingredientData[0] === null) {
      setIngredientTable(
        <>
          <span>There is no ingredient, add ingredient!!!</span>
          <AddIngredientForm />
        </>
      );
    } else {
      setIngredientTable(
        <IngredientTables columns={COLUMNS} data={ingredientData} />
      );
    }
  };

  return (
    <div>
      <ul>
        {suppliersData?.data.map((supplier) => {
          return (
            <li id={supplier.id} key={supplier.id}>
              <div
                className="open-supplier-ingredient"
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={handleSupplierClick}
              >
                {supplier.name}
              </div>
              <br></br>
            </li>
          );
        })}
      </ul>
      <div className="ingredientTable">{ingredientTable}</div>
    </div>
  );
}

export default IngredientManagement;
