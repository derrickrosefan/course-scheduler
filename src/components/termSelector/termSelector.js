import { TERMS } from "../../constants/constants";

const TermButton = ({ term, selectedTerm, setSelectedTerm }) => (
    <div>
        <input
            type="radio"
            id={term}
            className="btn-check"
            checked={term === selectedTerm}
            autoComplete="off"
            onChange={() => setSelectedTerm(term)}
        />
        <label className="btn btn-success m-1 p-2" htmlFor={term}>
            {term}
        </label>
    </div>
);

const TermSelector = ({ selectedTerm, setSelectedTerm }) => (
    <div className="btn-group">
        {Object.values(TERMS).map((term) => (
            <TermButton
                term={term}
                selectedTerm={selectedTerm}
                setSelectedTerm={setSelectedTerm}
            />
        ))}
    </div>
);

export default TermSelector;
