import CourseList from "../courseList/courseList";
import { useState } from "react";
import TermSelector from "../termSelector/termSelector";
import { TERMS } from "../../constants/constants";

const CoursePage = ({ courses }) => {
	const [selectedTerm, setSelectedTerm] = useState(TERMS.FALL);
	const coursesBySelectedTerm = Object.values(courses).filter(
		(course) => course.term === selectedTerm
	);
	return (
		<div>
			<TermSelector
				selectedTerm={selectedTerm}
				setSelectedTerm={setSelectedTerm}
			/>
			<CourseList courses={coursesBySelectedTerm} />
		</div>
	);
};

export default CoursePage;
