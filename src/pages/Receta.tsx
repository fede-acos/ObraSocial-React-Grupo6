import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecetaPdf from "../components/RecetaPdf";


function Receta() {
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!location.state || !location.state.recetaDownload) {
            navigate("/mis-turnos");
        }
    }, [location.state, navigate]);

    if (!location.state || !location.state.recetaDownload) {
    return null;
    }

    const { recetaDownload } = location.state;

    return (
        <div className="container-turnos">
            <div className="flex flex-col items-center justify-center min-h-500">
            <RecetaPdf receta={recetaDownload}/>
            </div>
        </div>
    );
}

export default Receta;