import "./scheduleModal.css"
import Course from "../course/course"
const ScheduleModal = ({ courses, isVisible, closeModal }) => (
    <div className={`modal ${isVisible ? 'modal-show' : ''}`} onClick={(evt) => { if (evt.target === evt.currentTarget) closeModal() }}>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Schedule</h3>
                    <button type="button" className="btn-close" onClick={() => closeModal()}></button>
                </div>
                <div className="modal-body">
                    {courses.length ? courses.map((course) => <Course course={course} toggleSelectedCourseIds={() => { }} />) : <p> You have not selected any courses to schedule...</p>}
                </div>
            </div>
        </div>
    </div>
);

export default ScheduleModal;