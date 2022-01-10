import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Navbar from "../components/Navbar";
import background from "../public/Logomaske_384x215_blue_light.jpg"
import Head from 'next/head'

const queryClient = new QueryClient();
const URL = background


function MyApp({ Component, pageProps }) {
	return (
		<div style={{backgroundImage: URL}}>
			<Head>
		  <meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</div>
	);
}

export default MyApp;
