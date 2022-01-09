import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Navbar from "../components/Navbar";

const queryClient = new QueryClient();



function MyApp({ Component, pageProps }) {
    return (
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    );
}

export default MyApp;
