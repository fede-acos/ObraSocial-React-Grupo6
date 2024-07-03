import { Route, Routes } from "react-router-dom";
import CartillaMedica from "../pages/CartillaMedica";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { ProtectedRoute } from "./ProtectedRoute";

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/cartilla"
        element={
          <ProtectedRoute>
            <CartillaMedica />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default Router;
