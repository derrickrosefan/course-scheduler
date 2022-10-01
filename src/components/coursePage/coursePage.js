import CourseList from "../courseList/courseList";
import { useState } from "react";
import TermSelector from "../termSelector/termSelector";
import { TERMS } from "../../constants/constants";

const CoursePage = ({ courses }) => {
	const [selectedTerm, setSelectedTerm] = useState(TERMS.FALL);
	const [selectedCourseIds, setSelectedCourseIds] = useState([]);
	const coursesWithIds = Object.entries(courses).map(([id, course]) => ({ id, ...course }));
	const toggleSelectedCourseIds = (id) => {
		setSelectedCourseIds(
			selectedCourseIds.includes(id)
				? selectedCourseIds.filter(
					(selectedCourseId) => selectedCourseId !== id
				)
				: [id, ...selectedCourseIds]
		);
	};
	return (
		<div>
			<TermSelector
				selectedTerm={selectedTerm}
				setSelectedTerm={setSelectedTerm}
			/>
			<CourseList
				courses={coursesWithIds}
				selectedTerm={selectedTerm}
				selectedCourseIds={selectedCourseIds}
				toggleSelectedCourseIds={toggleSelectedCourseIds}
			/>
		</div>
	);
};

export default CoursePage;
