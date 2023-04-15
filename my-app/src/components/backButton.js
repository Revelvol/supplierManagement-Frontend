import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate()

  function handleGoBack() {
    navigate(-1)
  }

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>
    </div>
  );
}

export default BackButton
