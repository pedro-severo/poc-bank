const pad = (num: Number) => ('00'+num).slice(-2);

export const mapDateToSqlDate = (date: Date): string => {
    const sqlDate = date.getUTCFullYear() + '-' +
        pad(date.getUTCMonth() + 1) + '-' +
        pad(date.getUTCDate()) + " " + 
        pad(date.getHours()) + '-' +
        pad(date.getMinutes()) + '-' +
        pad(date.getSeconds())
    
    return sqlDate
}