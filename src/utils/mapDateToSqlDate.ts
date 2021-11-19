const pad = (num: Number) => ('00'+num).slice(-2);

export const mapDateToSqlDate = (date: Date): string => {
    const sqlData = date.getUTCFullYear()         + '-' +
        pad(date.getUTCMonth() + 1)  + '-' +
        pad(date.getUTCDate()) 
    
    return sqlData
}