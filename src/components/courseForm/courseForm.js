import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDbUpdate } from "../../utilities/utilities";

const InputField = ({ name, text, state, change }) => {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{text}</label>
            <input className="form-control" id={name} name={name}
                defaultValue={state.values?.[name]} onChange={change} />
            <div className="text-danger mt-3"><p>{state.errors?.[name]}</p></div>
        </div>
    )
}

const validateUserData = (key, val) => {
    switch (key) {
        case 'title':
            return /\w{2,}/gm.test(val) ? '' : 'Invalid title - needs to be at least two characters';
        case 'meets':
            return /[M|Tu|W|Th|F]+ [0-9][0-9]:[0-9][0-9]-[0-9][0-9]:[0-9][0-9]/gm.test(val) ? '' : 'Invalid meeting times - must specify valid days (MTuWThF) followed by a space and valid military-style times';
        default: return '';
    }
};

export const useFormData = (validator = null, values = {}) => {
    const [state, setState] = useState(() => ({ values }));
    const change = (evt) => {
        const { id, value } = evt.target;
        const error = validator ? validator(id, value) : '';
        evt.target.setCustomValidity(error);
        const values = { ...state.values, [id]: value };
        const errors = { ...state.errors, [id]: error };
        const hasError = Object.values(errors).some(x => x !== '');
        setState(hasError ? { values, errors } : { values });
    };

    return [state, change];
};

const CourseForm = ({ data }) => {
    const { id } = useParams();
    const [state, change] = useFormData(validateUserData, data.courses[id]);
    const [updateData, result] = useDbUpdate(`/courses/${id}`)
    const navigate = useNavigate();
    const submitEvent = ({ event }) => { updateData(event) };
    return (
        <div className="container pt-3">
            <h2>Edit Course Information</h2>
            <form>
                <InputField name="title" text="Title" state={state} change={change} />
                <InputField name="meets" text="Meets" state={state} change={change} />
                <div className="d-flex">
                    <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
                    <button type="button" className="btn btn-outline-dark me-2" onClick={() => {
                        submitEvent({ event: state.values });
                        if (result) {
                            return;
                        }
                        navigate(-1);
                    }}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CourseForm;