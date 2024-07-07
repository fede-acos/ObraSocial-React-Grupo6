import { NextUIProvider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useAuth } from "./hooks/useAuth";
import { useDarkMode } from "usehooks-ts";
import Router from "./routes/Router";

function App() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  return (
    <NextUIProvider navigate={navigate}>
      <main className={`${isDarkMode ? '' : 'dark'} text-foreground bg-background`}>
        <div className="flex flex-col min-h-screen">
          {auth?.currentUser ? <Header /> : <></>}
          <div className="flex-grow">
            <Router />
          </div>
        </div>
        <Footer />
        <ToastContainer />
      </main>
    </NextUIProvider>
  );
}

export default App;
