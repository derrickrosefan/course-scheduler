import { useJsonQuery } from "../../utilities/utilities";
import Banner from "../banner/banner";
import CoursePage from "../coursePage/coursePage";

const SCHEDULE_URL =
	"https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";

const Schedule = () => {
	const [data, isLoading, error] = useJsonQuery(SCHEDULE_URL);
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
		<div className="container-fluid">
			<Banner title={data.title} />
			<CoursePage courses={data.courses} />
		</div>
	);
};

export default Schedule;
