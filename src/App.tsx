import { NextUIProvider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Router from "./routes/Router";
function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Router />
    </NextUIProvider>
  );
}

export default App;
