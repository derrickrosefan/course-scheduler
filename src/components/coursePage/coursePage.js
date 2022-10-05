import CourseList from "../courseList/courseList";
import ScheduleModal from "../scheduleModal/scheduleModal";
import { useState } from "react";
import TermSelector from "../termSelector/termSelector";
import { TERMS } from "../../constants/constants";
import { doCourseSchedulesOverlap } from "../../utilities/utilities";

const CoursePage = ({ courses }) => {
	const [selectedTerm, setSelectedTerm] = useState(TERMS.FALL);
	const [selectedCourseIds, setSelectedCourseIds] = useState([]);
	const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
	const doesCourseOverlapWithSelectedCourses = (course, courseId, selectedCourseIds) => {
		return selectedCourseIds.reduce((prev, selectedCourseId) => {
			const selectedCourse = courses[selectedCourseId];
			return (doCourseSchedulesOverlap(course.meets, selectedCourse.meets) && !selectedCourseIds.includes(courseId) && (course.term === selectedCourse.term)) || prev
		}, false);
	}
	const coursesWithInfo = Object.entries(courses).map(([id, course]) => {
		return ({ doesOverlap: doesCourseOverlapWithSelectedCourses(course, id, selectedCourseIds), isSelected: selectedCourseIds.includes(id), id, ...course })
	});
	const selectedCourses = coursesWithInfo.filter(course => course.isSelected);
	const displayedCourses = coursesWithInfo.filter(
		(course) => course.term === selectedTerm
	);
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
				courses={displayedCourses}
				selectedTerm={selectedTerm}
				toggleSelectedCourseIds={toggleSelectedCourseIds}
			/>
		</div>
	);
};

export default CoursePage;
