import Course from "../course/course";
const CourseList = ({
	courses,
	selectedTerm,
	selectedCourseIds,
	toggleSelectedCourseIds,
}) => {
	const coursesBySelectedTerm = courses.filter(
		(course) => course.term === selectedTerm
	);
	return (
		<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
			{coursesBySelectedTerm.map((course) => (
				<Course
					key={course.id}
					course={course}
					toggleSelectedCourseIds={toggleSelectedCourseIds}
					isSelected={selectedCourseIds.includes(course.id)}
				/>
			))}
		</div>
	);
};

export default CourseList;
