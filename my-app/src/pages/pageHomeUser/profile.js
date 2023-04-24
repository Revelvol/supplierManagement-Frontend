import { useState } from "react";
import { useAuthHeader, useAuthUser} from "react-auth-kit"
import { ProfileForm } from "../../components/style";


const url = "http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/user/me/"
function Profile() {
  const auth = useAuthUser();
  const token = useAuthHeader();
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState(auth().name);
  const [email] = useState(auth().email);
  const [isStaff, setIsStaff] = useState(auth().is_staff);

  const handleEditButtonClick = () => {
    setIsEditable(true);
  };

  const handleSaveButtonClick = async (e) => {
    // Call the patchMeApi function to save the updated profile information
    const payload = {name, is_staff: isStaff}
    const response = await fetch(url, {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
            Authorization : token()
        },
        body: JSON.stringify(payload)
    }) ;
    if(response.ok){
        alert("sucessfully changed")
        setIsEditable(false);
    } else {
        alert("something when wrong please try again")
    }
  };
  return (
    <ProfileForm>
      <h2>Profile</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly={!isEditable}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            readOnly
          />
        </label>
        <br />
        <label>
          Staff:
          <input
            type="checkbox"
            checked={isStaff}
            onChange={(e) => setIsStaff(e.target.checked)}
            disabled={!isEditable}
          />
        </label>
        <br />
        {isEditable ? (
          <button type="button" onClick={handleSaveButtonClick}>
            Save
          </button>
        ) : (
          <button type="button" onClick={handleEditButtonClick}>
            Edit
          </button>
        )}
      </form>
    </ProfileForm>
  );
}

export default Profile