const Course = ({ course }) => {
    return (
        <div>
            <p>{course.term} CS {course.number}: {course.title}</p>
        </div>
    );
}

export default Course;