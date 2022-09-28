const Course = ({ course }) => {
  return (
    <div className="col pt-3">
      <div className="card p-3 h-100">
        <div className="card-body">
          <h2 className="card-title">
            {course.term} CS {course.number}
          </h2>
          <p className="card-text">{course.title}</p>
        </div>
        <div className="card-footer bg-white">
          <p>{course.meets}</p>
        </div>
      </div>
    </div>
  );
};

export default Course;
