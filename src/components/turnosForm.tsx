import {useForm, Controller, SubmitHandler, useWatch } from "react-hook-form"
import {Button, Calendar, DateValue, Textarea} from "@nextui-org/react";
import { SpecialistDto } from "../types/SpecialistDto";
import { isWeekend, CalendarDate} from "@internationalized/date";
import {useLocale} from "@react-aria/i18n";
import { useEffect, useState } from "react";
import { TurnoDto } from "../types/TurnoDto";
import './styles/turnosForm.css'
import generateTimeSlots from "../utils/generador.horarios.specialist";
import { Medkit } from 'react-ionicons'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { TurnoDtoResponse } from "../types/TurnoDtoResponse";
import parseDateString from "../utils/parse.date.string";
import formatTurnoHora from "../utils/format.turnos.hora";


interface FormTurnosProps {
    specialist: SpecialistDto;
    turnos: TurnoDto[]
    turno: TurnoDtoResponse | undefined ;
    onUpdate: (turno: TurnoDtoResponse) => void;
    onAdd: (turno: TurnoDto) => void;
}
interface FormValues  {
    motivoConsulta: string
    selectedDate: CalendarDate | null
    selectedButtonTime : string | null
}

function TurnosForm ({ specialist, turnos, turno, onUpdate, onAdd }: FormTurnosProps) {
    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: { 
            motivoConsulta: turno ? turno.motivoConsulta : "",
            selectedDate: turno ? parseDateString(turno.fecha) : null,
            selectedButtonTime: turno ? formatTurnoHora(turno.hora) : ""
        },
    })

    const selectedButtonTime = useWatch({ control, name: 'selectedButtonTime' });
    const selectedDate  = watch('selectedDate');
    const [formattedDate, setFormattedDate] = useState<string | null>(null); 
    const navigate = useNavigate();

    const {locale} = useLocale();

    const isDateUnavailable = (date : DateValue) =>
        isWeekend(date, locale) ;

    

    useEffect(() => {
        
        if (selectedDate) {

            const { year, month, day } = selectedDate;
            const date = new Date(year, month - 1, day).toLocaleDateString('es-ES', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                timeZone: "UTC"

        });
        console.log(date)
        setFormattedDate(date);
        } else {
        setFormattedDate(null);
        }
        
    }, [selectedDate]);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if (data.selectedDate) {

            const { year, month, day } = data.selectedDate;
            const dateObj = new Date(year, month - 1, day);
            const formattedDate = dateObj.toISOString().split('T')[0];

            if (data.selectedButtonTime && turno === undefined ){
                const turnoData: TurnoDto = {
                        especialistaId: specialist.id,
                        fecha: formattedDate,
                        hora: data.selectedButtonTime,
                        motivoConsulta: data.motivoConsulta,
                    };
                    
                    onAdd(turnoData)
                    Swal.fire({
                        title: "¡Muchas Gracias!",
                        text: "Su reserva se ha realizado con exito",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/mis-turnos")
                        }
                    });                 
                } else if (data.selectedButtonTime && turno){
    
                    const turnoData: TurnoDtoResponse = {
                        turnoId: turno.turnoId,
                        pacienteId: turno.pacienteId,
                        especialistaId: specialist.id,
                        fecha: formattedDate,
                        hora: data.selectedButtonTime,
                        motivoConsulta: data.motivoConsulta,
                    };
                
                    onUpdate(turnoData)
                    
                    Swal.fire({
                        title: "¡Muchas Gracias!",
                        text: "Su reserva se ha modificado con exito",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/mis-turnos")
                        }
                    });         
                }
            }
        }   

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="form-block flex items-center">
            <div className="flex-shrink-0 mr-4">
                <Medkit  />

            </div>

            <div className="text-left">
                <h1 className="text-3xl font-bold">{specialist.nombre}</h1>
                <br/>
                <h2 className="text-xl font-semibold">{specialist.especialidad}</h2>
                <br/>
                <p className="text-lg">{specialist.ubicacion.provincia}, {specialist.ubicacion.ciudad}</p>
            </div>
        </div>

        <div className="form-block">
            <h2><b>Seleccione fecha y hora del turno</b></h2>
            <Controller
            name="selectedDate"
            control={control}
            rules={{ required: "La fecha es obligatoria" }}
            render={({ field }) => (
            <Calendar
                calendarWidth ="300px"
                className="custom-calendar"
                aria-label="Date (Unavailable)"
                isDateUnavailable={isDateUnavailable}
                onChange={(date) => field.onChange(date)}
                value={field.value}
            />
            )}
        />
        <p className="error">{errors.selectedDate?.message}</p>
        {formattedDate && <p>{formattedDate}</p>}
        </div>

        <div className="form-block">
        <h2><b>Motivo de consulta:</b></h2>
        <Controller
            name="motivoConsulta"
            control={control}
            rules={{ required: "El motivo es obligatorio" }}
            render={({ field }) => (
            <>
                <Textarea
                    className="textarea"
                    {...field}
                />
                <p className="error">{errors.motivoConsulta?.message}</p>
            </>
            )}
        />
        </div>

        
        <div className="form-block">
            <h2><b>Seleccione un horario</b></h2>
            <div className="time-slots">
                {generateTimeSlots(turnos, specialist, turno, selectedDate).map((time, index) => (
                <Controller
                    key={index}
                    name="selectedButtonTime"
                    control={control}
                    rules={{ required: "El horario es obligatorio" }}
                    render={({ field }) => (
                    <Button
                        onClick={() => field.onChange(time.time)}
                        radius="none"
                        color={selectedButtonTime === time.time ? 'primary' : 'default'}
                        variant="bordered"
                        isDisabled={time.occupied}
                    >
                        {time.time}
                    </Button>
                    )}
                />
                ))}   
            </div>
            <p className="error">{errors.selectedButtonTime?.message}</p>
        </div>

        <div className="submit-button">
            <Button size="lg" color="primary" type="submit">Confirmar</Button>
        </div>
        </form>
    )
}

export default TurnosForm;