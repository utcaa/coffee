export function addDays(date, daysToAdd) {
	return new Date(date.getTime() + daysToAdd*24*60*60*1000);
}

export function addHours(date, hoursToAdd) {
	return new Date(date.getTime() + hoursToAdd*1000*60*60);
}

export function firstIsAfterSecondDate(firstDate, secondDate) {
	return firstDate > secondDate;
}