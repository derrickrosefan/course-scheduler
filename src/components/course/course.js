const Course = ({ course, toggleSelectedCourseIds, isSelected }) => {
	const cardColor = course.doesOverlap ? "bg-warning" : (isSelected ? "bg-primary" : "bg-white");
	return (
		<div
			className="col pt-3"
			onClick={course.doesOverlap ? () => { } : () => toggleSelectedCourseIds(course.id)}
		>
			<div
				className={`card p-3 h-100 ${cardColor}`}
			>
				<div className="card-body">
					<h4 className="card-title">
						{course.term} CS {course.number}
					</h4>
					<p className="card-text">{course.title}</p>
				</div>
				<div
					className={
						`card-footer ${cardColor}`
					}
				>
					<p>{course.meets}</p>
				</div>
			</div>
		</div >
	);
};

export default Course;
