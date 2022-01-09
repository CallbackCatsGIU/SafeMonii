import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Navbar from "../components/Navbar";
import background from "../public/Logomaske_384x215_blue_light.jpg"

const queryClient = new QueryClient();
const URL = background

function MyApp({ Component, pageProps }) {
	return (
		<div style={{backgroundImage: URL}}>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</div>
	);
}

export default MyApp;
