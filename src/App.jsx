import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import OtpVerification from "./screens/OtpVerification";
import DocumentUpload from "./screens/DocumentUpload";
import UploadResult from "./components/UploadResult";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<OtpVerification />} />
          <Route path="/document-upload" element={<DocumentUpload />} />
          <Route
            path="/upload-success"
            element={
              <UploadResult
                status="success"
                tripId={"#TR78945"}
                dateTime="Dec 15, 2023 • 10:45 AM"
                message="Your document has been successfully uploaded to our system"
                actionLabel="Back to Documents"
                actionColor="bg-green-500 text-white"
                onAction={() => navigate("/document-upload")}
              />
            }
          />
          <Route
            path="/upload-failed"
            element={
              <UploadResult
                status="failure"
                tripId="#TR78945"
                dateTime="Dec 15, 2023 • 10:45 AM"
                message="We couldn't upload your document. Please check your connection and try again."
                actionLabel="Retry Upload"
                actionColor="bg-red-500 text-white"
                onAction={() => {
                  /* handle retry logic */
                }}
                showCancel={true}
                onCancel={() => navigate("/document-upload")}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
