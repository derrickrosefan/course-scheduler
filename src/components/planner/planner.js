import Banner from "../banner/banner";
import CoursePage from "../coursePage/coursePage";

const Planner = ({ data }) => {
	return (
		<div className="container-fluid">
			<Banner title={data.title} />
			<CoursePage courses={data.courses} />
		</div>
	);
};

export default Planner;
