

export const checkPresentOrFutureDate = (date: Date) => {
    const now = new Date()
    return date.setHours(0,0,0,0) >= now.setHours(0,0,0,0)
};
