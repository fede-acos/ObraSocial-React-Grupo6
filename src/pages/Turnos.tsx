import './turnos.css';
import { useLocation } from 'react-router-dom';
import TurnosForm from '../modules/turnosForm';


function Turnos () {  
    const location = useLocation();
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