import Banner from "../banner/banner";
import CoursePage from "../coursePage/coursePage";

const Planner = ({ data }) => {
	return (
		<div className="container-fluid">
			<Banner title="Course scheduler" />
			<CoursePage courses={data} />
		</div>
	);
};

export default Planner;
