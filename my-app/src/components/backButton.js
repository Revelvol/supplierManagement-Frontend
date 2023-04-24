import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { BackButtonDiv } from "./style";



function BackButton() {
  const navigate = useNavigate()

  function handleGoBack() {
    navigate(-1)
  }

  return (
    <BackButtonDiv>
      <button onClick={handleGoBack}>
        <FaArrowLeft /> Back 
      </button>
    </BackButtonDiv>

  );
}

export default BackButton
