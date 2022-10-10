import { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';

const courseScheduleToDays = (courseSchedule) => {
	return courseSchedule.split(" ")[0].match(/[A-Z][a-z]*/g);
}

const courseScheduleToStartAndEndTime = (courseSchedule) => courseSchedule.split(" ")[1].split("-").map((time) => {
	const [hours, min] = time.split(":");
	const d = new Date();
	d.setHours(hours);
	d.setMinutes(min);
	return d;
});

const doesTimesIntervalOverlap = (time1Start, time1End, time2Start, time2End) => {
	return (time1Start <= time2Start && time1End >= time2Start) || (time2Start <= time1Start && time2End >= time1Start);
}

const doesDaysOverlap = (days1, days2) => {
	return days1.reduce((prev, day) => days2.includes(day) || prev, false);
}

export const doCourseSchedulesOverlap = (course1Schedule, course2Schedule) => {
	if (course1Schedule === "" || course2Schedule === "") {
		return false;
	}
	const course1Days = courseScheduleToDays(course1Schedule);
	const course2Days = courseScheduleToDays(course2Schedule);
	const [course1StartTime, course1EndTime] = courseScheduleToStartAndEndTime(course1Schedule);
	const [course2StartTime, course2EndTime] = courseScheduleToStartAndEndTime(course2Schedule);
	return doesDaysOverlap(course1Days, course2Days) && doesTimesIntervalOverlap(course1StartTime, course1EndTime, course2StartTime, course2EndTime);
}
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDbData = (path) => {
	const [data, setData] = useState();
	const [error, setError] = useState(null);

	useEffect(() => (
		onValue(ref(database, path), (snapshot) => {
			setData(snapshot.val());
		}, (error) => {
			setError(error);
		})
	), [path]);

	return [data, error];
};