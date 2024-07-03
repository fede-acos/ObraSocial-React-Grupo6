import { Route, Routes } from "react-router-dom";
import CartillaMedica from "../pages/CartillaMedica";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MisTurnos from "../pages/MisTurnos";
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
      <Route
        path="/mis-turnos"
        element={
          <ProtectedRoute>
            <MisTurnos />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default Router;
