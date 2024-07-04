import { SpecialistDto } from "../types/SpecialistDto";
import { TurnoDto } from "../types/TurnosDto";


const convertTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

const generateTimeSlots = (turnos : TurnoDto[], specialist : SpecialistDto) => {
    const start = new Date(`2000-01-01T${specialist.horarioEntrada}`);
    const end = new Date(`2000-01-01T${specialist.horarioSalida}`);
    const timeSlots: { time: string; occupied: boolean; }[] = [];

    const current = new Date(start);
    
    const turnosasd: TurnoDto[] = turnos;

    while (current <= end) {
        const currentTimeInMinutes = current.getHours() * 60 + current.getMinutes();
        const formattedTime = current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const isOccupied = turnosasd.some(turno => {
            const turnoTimeInMinutes = convertTimeToMinutes(turno.hora);
            return turnoTimeInMinutes === currentTimeInMinutes;
        });

        timeSlots.push({
            time: formattedTime,
            occupied: isOccupied
        });

        current.setMinutes(current.getMinutes() + 30);
    
}


return timeSlots;
};

export default generateTimeSlots;