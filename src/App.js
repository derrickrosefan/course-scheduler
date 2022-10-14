import Planner from "./components/planner/planner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseForm from "./components/courseForm/courseForm";
import { useDbData } from "./utilities/utilities";

const App = () => {
	const [data, error] = useDbData("/courses");
	if (error !== null) {
		return <p>Encountered error while loading data...</p>;
	}
	if (data === undefined) {
		return <p>Loading...</p>;
	}
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Planner data={data} />} />
				<Route path="/edit/:id" element={<CourseForm data={data} />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
