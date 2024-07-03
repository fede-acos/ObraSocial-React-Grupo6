import {useForm, Controller, SubmitHandler, useWatch } from "react-hook-form"
import {Button, Calendar, DateValue, Textarea} from "@nextui-org/react";
import { SpecialistDto } from "../types/SpecialistDto";
import { isWeekend} from "@internationalized/date";
import {useLocale} from "@react-aria/i18n";
import { useEffect, useState } from "react";

interface FormTurnosProps {
    specialist: SpecialistDto;
}
interface FormValues  {
    motivoConsulta: string
    selectedDate: Date | null
    selectedButtonTime : string | null
}

function TurnosForm ({ specialist }: FormTurnosProps) {
    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: { // pacienteid, especialistaId, fecha, hora, motivoConsulta
        motivoConsulta: "",
        selectedDate: null,
        selectedButtonTime: null
        },
    })
    
    const [formattedDate, setFormattedDate] = useState<string | null>(null);

    const isDateUnavailable = (date : DateValue) =>
        isWeekend(date, locale) ;

    const {locale} = useLocale();
    
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
    }

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


    const generateTimeSlots = () => {
        const start = new Date(`2000-01-01T${specialist.horarioEntrada}`);
        const end = new Date(`2000-01-01T${specialist.horarioSalida}`);
        const timeSlots: string[] = [];
        
        const current = new Date(start);
    
        while (current <= end) {
            timeSlots.push(current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            current.setMinutes(current.getMinutes() + 30);
        }

        return timeSlots;
    };

    const selectedButtonTime = useWatch({ control, name: 'selectedButtonTime' });







    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="form-block">
            <h1>{specialist.nombre}</h1>
        </div>

        <div className="form-block">
            <h2><b>Seleccione fecha y hora del turno</b></h2>
            <Controller
            name="selectedDate"
            control={control}
            rules={{ required: "pedilo" }}
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
            rules={{ required: "pedilo" }}
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
                {generateTimeSlots().map((time, index) => (
                <Controller
                    key={index}
                    name="selectedButtonTime"
                    control={control}
                    rules={{ required: "pedilo" }}
                    render={({ field }) => (
                    <Button
                        onClick={() => field.onChange(time)}
                        radius="none"
                        color={selectedButtonTime === time ? 'primary' : 'default'}
                        variant="bordered"
                    >
                        {time}
                    </Button>
                    )}
                />
                ))}
                <p className="error">{errors.selectedButtonTime?.message}</p>
            </div>
        </div>

        <div className="submit-button">
            <Button size="lg" color="primary" type="submit">Confirmar</Button>
        </div>
        </form>
    )
}

export default TurnosForm;