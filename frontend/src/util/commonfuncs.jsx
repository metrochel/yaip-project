function dateToday() {
    let curDate = new Date(Date.now());
    curDate.setHours(0);
    curDate.setMinutes(0);
    curDate.setSeconds(0);
    return curDate.valueOf();
}

export function dateToStr(timestamp) {
    const date = new Date(timestamp);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    return date.toLocaleDateString([new Intl.Locale("ru-RU")], options);
}

export function daysStr(days) {
    if (days >= 10 && days < 20) {
        return `${days} дней`;
    }

    if (days % 10 == 1) {
        return `${days} день`;
    }

    if (days % 10 >= 2 && days % 10 <= 4) {
        return `${days} дня`;
    }

    return `${days} дней`;
}

export function unsignedDaysStr(timestamp) {
    const msInDay = 24 * 3600 * 1000;
    const today = dateToday();

    const days = Math.floor((timestamp - today) / msInDay);

    switch (days) {
        case 0: return "сегодня";
        case 1: return "завтра";
        case 2: return "послезавтра";
    }
    
    return daysStr(days);
}

export function signedDaysStr(timestamp) {
    const msInDay = 24 * 3600 * 1000;
    const today = dateToday();

    const days = Math.floor((timestamp - today) / msInDay);

    switch (days) {
        case -2: return "позавчера";
        case -1: return "вчера";
        case 0: return "сегодня";
        case 1: return "завтра";
        case 2: return "послезавтра";
    }

    if (days < 0) { return `${daysStr(days)} назад`; }
    if (days > 0) { return `через ${daysStr(days)}`; }

    return daysStr(days);
}