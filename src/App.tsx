import { NextUIProvider } from "@nextui-org/react";
import {useAuth} from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Router from "./routes/Router";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const auth = useAuth();

  const navigate = useNavigate();
  console.log(auth?.currentUser?.upn);

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
