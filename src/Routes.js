import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEditDel from "./Components/AddEditDel";
// import Login from "./Components/Login";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login/>}/> */}
        <Route path="/Add" element={<AddEditDel/>}/>
     
      </Routes>
    </BrowserRouter>
  );
}

export default  AppRoutes;
