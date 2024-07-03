import { NextUIProvider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Router from "./routes/Router";
import Header from "./modules/header";
import Footer from "./modules/footer";
function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Header />
      <Router />
      <Footer />
    </NextUIProvider>
  );
}

export default App;
