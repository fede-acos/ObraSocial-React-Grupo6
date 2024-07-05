import { NextUIProvider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useAuth } from "./hooks/useAuth";
import Router from "./routes/Router";

function App() {
  const auth = useAuth();

  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <div className="flex flex-col min-h-screen">
        {auth?.currentUser ? <Header /> : <></>}

        <div className="flex-grow">
          <Router />
        </div>
      </div>

      <Footer />
    </NextUIProvider>
  );
}

export default App;
