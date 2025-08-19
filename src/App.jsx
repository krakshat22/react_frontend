import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import OtpVerification from "./screens/OtpVerification";
import DocumentUpload from "./screens/DocumentUpload";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<OtpVerification />} />
          <Route path="/document-upload" element={<DocumentUpload />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
