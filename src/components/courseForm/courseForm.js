import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const InputField = ({ name, text, state, change }) => (
    <div className="mb-3">
        <label htmlFor={name} className="form-label">{text}</label>
        <input className="form-control" id={name} name={name}
            defaultValue={state.values?.[name]} onChange={change} />
    </div>
);

export const useFormData = (values = {}) => {
    const [state, setState] = useState(() => ({ values }));

    const change = (evt) => {
        const { id, value } = evt.target;
        const values = { ...state.values, [id]: value };
        setState({ values });
    };

    return [state, change];
};

const ButtonBar = () => {
    const navigate = useNavigate();
    return (
        <div className="d-flex">
            <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
        </div>
    );
};

const CourseForm = ({ data }) => {
    const { id } = useParams();
    const [state, change] = useFormData(data.courses[id]);
    return (
        <div className="container pt-3">
            <h2>Edit Course Information</h2>
            <form>
                <InputField name="title" text="Title" state={state} change={change} />
                <InputField name="meets" text="Meets" state={state} change={change} />
                <ButtonBar />
            </form>
        </div>
    )
}

export default CourseForm;