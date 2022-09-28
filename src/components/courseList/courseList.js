import Course from "../course/course";
const CourseList = ({ courses }) => {
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
            {Object.values(courses).map(course => <Course key={course.number} course={course} />)}
        </div>
    );
}

export default CourseList;