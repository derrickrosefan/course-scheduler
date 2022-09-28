import Schedule from "./components/schedule/schedule";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Schedule />
    </QueryClientProvider>
  );
};

export default App;
