let regex = /\b([01]?\d):([0-5]\d)\s*([ap])(?:\.?\s*m\.?|\.?\s*M\.?)/gi;

function msToTime(timeInMiliseconds) {
    let hours, minutes, seconds;
    hours = Math.floor(timeInMiliseconds / 1000 / 60 / 60);
    minutes = Math.floor((timeInMiliseconds / 1000 / 60 / 60 - hours) * 60);
    seconds = Math.floor(
        ((timeInMiliseconds / 1000 / 60 / 60 - hours) * 60 - minutes) * 60
    );

    hours = hours < 10 ? '0' + hours : hours.toString();
    minutes = minutes < 10 ? '0' + minutes : minutes.toString();
    seconds = seconds < 10 ? '0' + seconds : seconds.toString();

    return [hours, minutes, seconds];
}

// currentTime = 2:15 p.m. 5:50 a.m.
function getNextMealTime(currentTime, isDateTimeString = false) {
    let timeDifference; // * to store the difference between current time and next meal time
    let currentDateTime;

    if (!isDateTimeString) {
        const timeArray = regex.exec(currentTime);
        if (!timeArray) {
            return 'Invalid date time string';
        }
        /**
		 * [
			'09:30 p.m.',
			'09',
			'30',
			'p',
			index: 0,
			input: '09:30 p.m.',
			groups: undefined
		   ]
		 */

        let cHour = +timeArray[1];
        let cMinute = +timeArray[2];
        let cSuffix = timeArray[3];

        if (cHour > 12) {
            return 'Invalid date time string';
        }
        // * getting today's date time
        currentDateTime = new Date();

        if (cSuffix === 'p' || cSuffix === 'P') {
            if (cHour === 12) {
                currentDateTime.setHours(12, cMinute);
            } else {
                currentDateTime.setHours(12 + cHour, cMinute);
            }
            console.log('My Test time: ' + currentDateTime);
        } else if (cSuffix === 'a' || cSuffix === 'A') {
            if (cHour === 12) {
                currentDateTime.setHours(0, cMinute);
            } else {
                currentDateTime.setHours(cHour, cMinute);
            }
            console.log('My Test time: ' + currentDateTime);
        } else {
            return 'Invalid date time string';
        }
    } else {
        // intact
        currentDateTime = new Date(currentTime);
    }

    // console.log('Today: ' + todayDateTime.toISOString());
    const currentDateString = currentDateTime.toISOString().split('T')[0];

    // ! calculating today's breakfast, lunch and dinner timestamp
    const breakfastTime = new Date(`${currentDateString}T07:00:00`); //* 7:00 am
    const lunchTime = new Date(`${currentDateString}T12:00:00`); //* 12:00 pm
    const dinnerTime = new Date(`${currentDateString}T19:00:00`); //* 7:00 pm

    // console.log('Breakfast Time', breakfastTime.getHours());
    // console.log('Lunch Time', lunchTime.getHours());
    // console.log('Dinner Time', dinnerTime.getHours());

    // ! determine next meal time

    if (currentDateTime < breakfastTime) {
        timeDifference = Math.abs(currentDateTime - breakfastTime);
    } else if (currentDateTime < lunchTime) {
        timeDifference = Math.abs(currentDateTime - lunchTime);
    } else if (currentDateTime < dinnerTime) {
        timeDifference = Math.abs(currentDateTime - dinnerTime);
    } else {
        // ! If it is after dinner, return the next day breakfas time
        let nextDay = new Date(currentDateTime);
        nextDay.setDate(nextDay.getDate() + 1);
        console.log('Next day', nextDay);
        let nextBreakfast = new Date(
            `${nextDay.toISOString().split('T')[0]}T07:00:00`
        );

        timeDifference = Math.abs(currentDateTime - nextBreakfast);
    }

    // * Converting the time difference to hours, minutes, seconds

    let nextMealTime = msToTime(timeDifference);
    let hours = +nextMealTime[0];
    let minutes = +nextMealTime[1];
    let seconds = +nextMealTime[2];

    // * Returning the result as an array
    return [hours, minutes];
}

console.log(getNextMealTime('9:00 a.m.'));
// console.log(getNextMealTime('2023-02-23T15:50:00.545Z', true));
// console.log(getNextMealTime('2023-02-23T17:30:00.545Z'));
// console.log(msToTime(810214));
// console.log(msToTime(300000));
