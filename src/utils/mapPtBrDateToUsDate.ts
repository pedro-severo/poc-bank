export const mapPtBrDateToUsDate = (date: string) => {
    const dateArray = date.split('/')
    const usDate = dateArray[1] + '/' + dateArray[0] + '/' + dateArray[2]
    return usDate
}