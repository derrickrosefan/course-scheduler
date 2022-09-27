import Course from "../course/course";
const CourseList = ({ courses }) => {
    return (
        <div>
            {Object.values(courses).map(course => <Course key={course.number} course={course} />)}
        </div>
    );
}

export default CourseList;