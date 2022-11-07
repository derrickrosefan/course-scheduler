import { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { connectDatabaseEmulator, getDatabase, onValue, ref, update } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';
import { useCallback } from 'react';
import { connectAuthEmulator, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signInWithPopup, signOut } from 'firebase/auth';
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
const auth = getAuth(firebase);
const database = getDatabase(firebase);

if (process.env.REACT_APP_EMULATE) {
	connectAuthEmulator(auth, "http://127.0.0.1:9099");
	connectDatabaseEmulator(database, "127.0.0.1", 9000);

	signInWithCredential(auth, GoogleAuthProvider.credential(
		'{"sub": "P09iZxyMhvSpvDr2G7a6kSI2b4dk", "email": "test@gmail.com", "displayName":"tester", "email_verified": true}'
	));
}


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

const makeResult = (error) => {
	const timestamp = Date.now();
	const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
	return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
	const [result, setResult] = useState();
	const updateData = useCallback((value) => {
		update(ref(database, path), value)
			.then(() => setResult(makeResult()))
			.catch((error) => setResult(makeResult(error)))
	}, [path]);

	return [updateData, result];
};

export const signInWithGoogle = () => {
	signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
	const [user, setUser] = useState(null);

	useEffect(() => (
		onAuthStateChanged(getAuth(firebase), setUser)
	), [setUser]);

	return [user];
};

export const useProfile = () => {
	const [user] = useAuthState();
	const [isAdmin, isLoading, error] = useDbData(`/admins/${user?.uid || 'guest'}`);
	return [{ user, isAdmin }, isLoading, error];
};
