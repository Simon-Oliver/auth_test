import '../styles/globals.css'
// import '../styles/reset.css';
import { AuthUserProvider } from "./context/authContext.js";

function MyApp({ Component, pageProps }) {
  return <AuthUserProvider><Component {...pageProps} /></AuthUserProvider>
}

export default MyApp
