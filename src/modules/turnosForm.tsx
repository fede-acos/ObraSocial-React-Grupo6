import {useForm, Controller, SubmitHandler } from "react-hook-form"
import {Calendar, DateValue} from "@nextui-org/react";
import { SpecialistDto } from "../types/SpecialistDto";
import { isWeekend} from "@internationalized/date";
import {useLocale} from "@react-aria/i18n";

interface FormTurnosProps {
    specialist: SpecialistDto;
}

interface FormValues  {
    motivoConsulta: string
    selectedDate: Date | null
    selectedButtonTime : string | null
}

function TurnosForm ({ specialist }: FormTurnosProps) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { // pacienteid, especialistaId, fecha, hora, motivoConsulta
        motivoConsulta: "",
        selectedDate: null,
        selectedButtonTime: null
        },
    })
    
    const isDateUnavailable = (date : DateValue) =>
        isWeekend(date, locale) ;

    const {locale} = useLocale();
    
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
    }





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
        </div>
        </form>
    )
}

export default TurnosForm;