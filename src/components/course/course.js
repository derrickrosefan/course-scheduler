const Course = ({ course, toggleSelectedCourseIds, isSelected }) => {
	return (
		<div
			className="col pt-3"
			onClick={() => toggleSelectedCourseIds(course.id)}
		>
			<div
				className={isSelected ? "card p-3 h-100 bg-light" : "card p-3 h-100"}
			>
				<div className="card-body">
					<h4 className="card-title">
						{course.term} CS {course.number}
					</h4>
					<p className="card-text">{course.title}</p>
				</div>
				<div
					className={
						isSelected ? "card-footer bg-light" : "card-footer bg-white"
					}
				>
					<p>{course.meets}</p>
				</div>
			</div>
		</div>
	);
};

export default Course;
