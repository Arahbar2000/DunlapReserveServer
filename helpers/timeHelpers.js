exports.dateToInterval = date => {
    const roundedDate = exports.roundTime(date)
    const hours = roundedDate.getUTCHours()
    const minutes = roundedDate.getUTCMinutes()
    return (2 * hours) + (minutes / 30)
}

exports.intervalToDate = interval => {
    const date = new Date();
    date.setUTCHours(Math.floor(interval/2), 0, 0, 0);
    if(interval % 2) date.setUTCMinutes(30);
    return date;
}

exports.roundTime = date => {
    const newDate = new Date()
    if (date.getUTCMinutes() <= 30 && date.getUTCMinutes() > 0) {
        newDate.setUTCHours(date.getUTCHours(), 30, 0, 0)
    }
    else if (date.getMinutes() > 30) {
        newDate.setUTCHours(date.getUTCHours() + 1, 0, 0, 0)
    }
    else {
        newDate.setUTCMilliseconds(date.getUTCMilliseconds())
    }
    return newDate
}