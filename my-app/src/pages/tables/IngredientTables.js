import { useTable, useSortBy } from "react-table";
import styled from "styled-components";
import { FaFilePdf, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function IngredientTables() {

  return (
    <Styles>
     <div> TEST </div>
    </Styles>
  );
}

export default IngredientTables;
