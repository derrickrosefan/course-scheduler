import Planner from "./components/planner/planner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseForm from "./components/courseForm/courseForm";
import { useJsonQuery } from "./utilities/utilities";

const COURSE_DATA_URL =
	"https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";


const App = () => {
	const [data, isLoading, error] = useJsonQuery(COURSE_DATA_URL);
	if (isLoading) {
		return (
			<div className="container-fluid">
				<p>Loading...</p>
			</div>
		);
	}
	if (error) {
		return (
			<div className="container-fluid">
				<p>Error while retrieving course data...</p>
			</div>
		);
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
