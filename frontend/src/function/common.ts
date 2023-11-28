
export const getMonthAndYearForCalendarDate = (date:string)=>{
    const [year,month] = date.split('-');
    return {year,month};
}


