import "../styles/globals.css";
// import '../styles/reset.css';
import "semantic-ui-css/semantic.min.css";
import { AuthUserProvider } from "./context/authContext.js";

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}

export default MyApp;
