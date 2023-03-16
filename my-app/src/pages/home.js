import React from 'react';
import { useAuthUser } from 'react-auth-kit';

function Home () {
  const auth = useAuthUser();
  return (
  <div>
    <br></br>
      Welcome Home {auth().name}
  </div>
  )
}

export default Home;
