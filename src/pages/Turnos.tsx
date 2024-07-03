import { useLocation, useNavigate } from 'react-router-dom';
import TurnosForm from '../modules/turnosForm';
import './styles/turnos.css'
import { useEffect } from 'react';


function Turnos () {  
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state || !location.state.specialist) {
            navigate('/cartilla');
        }
    }, [location.state, navigate]); 
    
    if (!location.state || !location.state.specialist) {     
        return null;
    }

    const { specialist } = location.state;   

    return (
    <div className="container">     
        <div className="centered-content">
            <h2>Turnos para {specialist.nombre}</h2>
            <TurnosForm specialist={specialist}/>
        </div>
    </div>
    );
}

export default Turnos;