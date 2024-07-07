import { CalendarDate } from "@internationalized/date";

const parseDateString = (dateString: string): CalendarDate => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new CalendarDate(year, month, day);
};

export default parseDateString