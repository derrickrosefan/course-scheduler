import CourseList from "../courseList/courseList";
import ScheduleModal from "../scheduleModal/scheduleModal";
import { useState } from "react";
import TermSelector from "../termSelector/termSelector";
import { TERMS } from "../../constants/constants";

const CoursePage = ({ courses }) => {
	const [selectedTerm, setSelectedTerm] = useState(TERMS.FALL);
	const [selectedCourseIds, setSelectedCourseIds] = useState([]);
	const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
	const coursesWithIds = Object.entries(courses).map(([id, course]) => ({ isSelected: selectedCourseIds.includes(id), id, ...course }));
	const coursesBySelectedTerm = coursesWithIds.filter(
		(course) => course.term === selectedTerm
	);
	const selectedCourses = coursesWithIds.filter(course => course.isSelected);
	const toggleSelectedCourseIds = (id) => {
		setSelectedCourseIds(
			selectedCourseIds.includes(id)
				? selectedCourseIds.filter(
					(selectedCourseId) => selectedCourseId !== id
				)
				: [id, ...selectedCourseIds]
		);
	};
	const openModel = () => { setIsScheduleModalVisible(true) };
	const closeModal = () => { setIsScheduleModalVisible(false) };
	return (
		<div>
			<ScheduleModal courses={selectedCourses} isVisible={isScheduleModalVisible} closeModal={closeModal} />
			<div className="d-flex justify-content-between">
				<TermSelector
					selectedTerm={selectedTerm}
					setSelectedTerm={setSelectedTerm}
				/>
				<button type="button" className="btn btn-primary" onClick={() => openModel()}>Course Plan</button>
			</div>
			<CourseList
				courses={coursesBySelectedTerm}
				selectedTerm={selectedTerm}
				toggleSelectedCourseIds={toggleSelectedCourseIds}
			/>
		</div>
	);
};

export default CoursePage;
