import {useForm, Controller, SubmitHandler, useWatch } from "react-hook-form"
import {Button, Calendar, DateValue, Textarea} from "@nextui-org/react";
import { SpecialistDto } from "../types/SpecialistDto";
import { isWeekend} from "@internationalized/date";
import {useLocale} from "@react-aria/i18n";
import { useEffect, useState } from "react";
import { useEntity } from "../services/useApi";
import { TurnoDto } from "../types/TurnoDto";
import './turnosForm.css'
import generateTimeSlots from "../utils/generador.horarios.specialist";
import { Medkit } from 'react-ionicons'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


interface FormTurnosProps {
    specialist: SpecialistDto;
    turnos: TurnoDto[]
}
interface FormValues  {
    motivoConsulta: string
    selectedDate: Date | null
    selectedButtonTime : string | null
}

function TurnosForm ({ specialist, turnos }: FormTurnosProps) {
    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: { 
        motivoConsulta: "",
        selectedDate: null,
        selectedButtonTime: null
        },
    })

    const selectedButtonTime = useWatch({ control, name: 'selectedButtonTime' });
    const [formattedDate, setFormattedDate] = useState<string | null>(null); 
    const navigate = useNavigate();

    const { add } = useEntity<TurnoDto>(
        "turno",
        "http://localhost:8080/turnos",
        null
        );

    const handleAdd = async (newEntity: TurnoDto) => {
        await add.mutateAsync(newEntity);
    };

    const {locale} = useLocale();

    const isDateUnavailable = (date : DateValue) =>
        isWeekend(date, locale) ;

    

    const selectedDate  = watch('selectedDate');
    useEffect(() => {
        
        if (selectedDate) {
            const date = new Date(selectedDate).toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        });
        console.log(date)
        setFormattedDate(date);
        } else {
        setFormattedDate(null);
        }
        
    }, [selectedDate]);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if (data.selectedDate) {
            const dateObj = new Date(data.selectedDate);
            const year = dateObj.getFullYear();
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const day = dateObj.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            if (data.selectedButtonTime){
            const turnoData: TurnoDto = {
                    especialistaId: specialist.id,
                    fecha: formattedDate,
                    hora: data.selectedButtonTime,
                    motivoConsulta: data.motivoConsulta,
                };
            
                handleAdd(turnoData)
                Swal.fire({
                    title: "¡Muchas Gracias!",
                    text: "Su reserva se ha realizado con exito",
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
            {/* Columna 1: Icono Medkit */}
            <div className="flex-shrink-0 mr-4">
                <Medkit  />

            </div>

            {/* Columna 2: Información del Especialista */}
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
                {generateTimeSlots(turnos, specialist).map((time, index) => (
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