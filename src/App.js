import Planner from "./components/planner/planner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Planner />
		</QueryClientProvider>
	);
};

export default App;
