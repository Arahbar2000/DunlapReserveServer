exports.dateToInterval = date => {
    const roundedDate = exports.roundTime(date)
    const hours = roundedDate.getHours()
    const minutes = roundedDate.getMinutes()
    return (2 * hours) + (minutes / 30)
}

exports.intervalToDate = interval => {
    const date = new Date();
    date.setHours(Math.floor(interval/2), 0, 0, 0);
    if(interval % 2) date.setMinutes(30);
    return date;
}

exports.roundTime = date => {
    const newDate = new Date()
    if (date.getMinutes() <= 30 && date.getMinutes() > 0) {
        newDate.setHours(date.getHours(), 30, 0, 0)
    }
    else if (date.getMinutes() > 30) {
        newDate.setHours(date.getHours() + 1, 0, 0, 0)
    }
    else {
        newDate.setTime(date.getTime())
    }
    return newDate
}