import { CalendarDate } from "@internationalized/date";
import { SpecialistDto } from "../types/SpecialistDto";
import { TurnoDto } from "../types/TurnosDto";


const convertTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

const generateTimeSlots = (turnos : TurnoDto[], specialist : SpecialistDto, turnoAEditar : TurnoDto | undefined, selectedDate : CalendarDate | null ) => {
    const start = new Date(`2000-01-01T${specialist.horarioEntrada}`);
    const end = new Date(`2000-01-01T${specialist.horarioSalida}`);
    const timeSlots: { time: string; occupied: boolean; }[] = [];

    const current = new Date(start);
    
    const turnosSet: TurnoDto[] = turnos;

    const horaAEliminar = turnoAEditar?.hora;

    const nuevosTurnosSet = turnosSet.filter(turno => turno.hora !== horaAEliminar);

    while (current <= end) {
        const currentTimeInMinutes = current.getHours() * 60 + current.getMinutes();
        const formattedTime = current.toLocaleTimeString([], 
                { hour: '2-digit',
                minute: '2-digit',
                hour12: false });

        if (selectedDate){

            const { year, month, day } = selectedDate;
            const dateObj = new Date(year, month - 1, day);
            const formattedDate = dateObj.toISOString().split('T')[0];

            const fechaAFiltrar = nuevosTurnosSet.find(turno => {
                return turno.fecha === formattedDate;
            });

            const isOccupied = nuevosTurnosSet.some(turno => {                      
                if (turno.fecha === fechaAFiltrar?.fecha){
                const turnoTimeInMinutes = convertTimeToMinutes(turno.hora);
    
                return turnoTimeInMinutes === currentTimeInMinutes;
                }
            });
            timeSlots.push({
                time: formattedTime,
                occupied: isOccupied
            });
        } else {

            timeSlots.push({
                time: formattedTime,
                occupied: false
            });

        }

        current.setMinutes(current.getMinutes() + 30);
    
    }

    return timeSlots;
};

export default generateTimeSlots;