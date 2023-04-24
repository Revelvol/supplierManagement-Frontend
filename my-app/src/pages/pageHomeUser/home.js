import React from "react";
import { useAuthUser } from "react-auth-kit";

function Home() {
  const auth = useAuthUser();
  return (
    <div style={{ textAlign: "center", fontSize: "24px" }}>
      <br />
      Welcome Home {auth().name}!
      <br />
      <br />
      This is a supplier document management app where you can add and manage
      suppliers and their associated ingredients. With this app, you can keep
      track of important documents such as ISO, GMO, kosher, halal, MSDS, TDS,
      COA, and allergen certifications.
      <br />
      <br />
      To get started, click on the "SuppliersManagement" tab in the navigation
      bar to view your existing suppliers or add a new one. You can then add
      ingredients to each supplier and manage their associated documents.
      <br />
      <br />
      This project was built with a React and Django,
      utilizing various libraries and technologies to create a seamless user
      experience for managing supplier and ingredient data.
    </div>
  );
}

export default Home;
