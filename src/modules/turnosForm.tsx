import {Calendar, DateValue} from "@nextui-org/react";
import { SpecialistDto } from "../types/SpecialistDto";
import { isWeekend} from "@internationalized/date";
import {useLocale} from "@react-aria/i18n";

interface FormTurnosProps {
    specialist: SpecialistDto;
}

function TurnosForm ({ specialist }: FormTurnosProps) {
    
    const isDateUnavailable = (date : DateValue) =>
        isWeekend(date, locale) ;
    const {locale} = useLocale();
    
    return (
        

        <Calendar
                calendarWidth ="300px"
                className="custom-calendar"
                aria-label="Date (Unavailable)"
                isDateUnavailable={isDateUnavailable}
                
            />
    )
}

export default TurnosForm;