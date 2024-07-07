
const formatTurnoHora = (hora: string): string => {
    // Suponemos que hora viene en formato 'HH:mm:ss' o 'HH:mm'
    const [hours, minutes] = hora.split(':');
    return `${hours}:${minutes}`;
};

export default formatTurnoHora;