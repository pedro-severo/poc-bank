const pad = (num: Number) => ('00'+num).slice(-2);

// TODO: Fix => function is mapping a sql date without exactly hours
export const mapDateToSqlDate = (date: Date): string => {
    const sqlData = date.getUTCFullYear()         + '-' +
        pad(date.getUTCMonth() + 1)  + '-' +
        pad(date.getUTCDate()) 
    
    return sqlData
}