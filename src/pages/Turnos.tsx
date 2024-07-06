import { useLocation, useNavigate } from 'react-router-dom';
import TurnosForm from '../components/turnosForm';
import './styles/turnos.css'
import { useEffect } from 'react';
import { useEntities } from '../services/useApi';
import { TurnoDto } from '../types/TurnosDto';
import { Spinner } from '@nextui-org/react';


function Turnos () {  
    const location = useLocation();
    const navigate = useNavigate();

    const { turno } = location.state; 

    const { data , isLoading } = useEntities<TurnoDto>(
        "turnos",
        "http://localhost:8080/turnos"
    );


    useEffect(() => {
        if (!location.state || !location.state.specialist) {
            navigate('/cartilla');
        }
    }, [location.state, navigate]); 
    
    if (!location.state || !location.state.specialist) {     
        return null;
    }

    const { specialist } = location.state;   

    if (isLoading || !data) {
        return (
        <div>
            <Spinner size="lg" />
        </div>
        )
    }
    return (
    <div className="container-turnos">     
        <div className="centered-content">
            <h2>Turnos con {specialist.nombre}</h2>
            <TurnosForm 
            specialist={specialist}
            turnos={data}
            turno={turno} />
        </div>
    </div>
    );
}

export default Turnos;