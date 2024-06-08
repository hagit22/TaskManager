export const utilities = {
    formatDate,
    getCurrentWorkWeek,
    getRandomDateInRange,
    getRandomValInRange,
    getRandomValInList,
    getRandomUniquesFromList
}

enum Weekday {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

export interface DateRange {
    startDate: Date;
    endDate: Date;
}

export function parseDateRange(key: string, value: any) {
    if (key == 'startDate' || key == 'endDate') {
        return new Date(value);
    }
    return value;
}

function formatDate(date: Date) : string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function getCurrentWorkWeek() : DateRange {
    return ({
        startDate: _getDateByWeekday(Weekday.Sunday),
        endDate: _getDateByWeekday(Weekday.Thursday)
    })
}

function getRandomDateInRange(numDays: number): Date {
    const randomDaysInRange = Math.floor(Math.random() * numDays*2) - numDays; 
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() + randomDaysInRange);
    return randomDate;
}

function getRandomValInRange(range: number): number {
    return Math.floor(Math.random() * range); 
}

function getRandomValInList<T>(list: Array<T>): T {
    return list[getRandomValInRange(list.length)] 
}

function getRandomUniquesFromList<T>(list: Array<T>, maxVals: number): Array<T> {
    const result = []
    for (let i = 0; i < maxVals; i++) 
        result.push(getRandomValInList(list))
    return Array.from(new Set(result))
}


function _getDateByWeekday(requestedWeekday: Weekday) : Date {
    const today = new Date();
    const todaysWeekday = today.getDay();
    const diff = requestedWeekday - todaysWeekday;
    const requestedDate = new Date()
    requestedDate.setDate(today.getDate() + diff);
    return requestedDate
}



