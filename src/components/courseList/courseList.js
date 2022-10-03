import Course from "../course/course";
const CourseList = ({
	courses,
	toggleSelectedCourseIds,
}) => {
	return (
		<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
			{courses.map((course) => (
				<Course
					key={course.id}
					course={course}
					toggleSelectedCourseIds={toggleSelectedCourseIds}
					isSelected={course.isSelected}
				/>
			))}
		</div>
	);
};

export default CourseList;
