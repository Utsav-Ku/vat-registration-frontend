import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import SignUp from "./pages/SignIn.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import ForgotId from "./pages/ForgotId.js";
import Finish from "./pages/Finish.js";
import DocumentUpload from "./pages/DocumentUpload.js";
import PartAForm from "./pages/PartAForm.js";
import BusinessPartnerDetails from "./pages/businessPartnerDetails.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-id" element={<ForgotId />} />
        <Route path="/part-a" element={<PartAForm />} />
        <Route path="/business-partner-details" element={<BusinessPartnerDetails />} />
        <Route path="/upload-document" element={<DocumentUpload />}/>
        <Route path="/finish" element={<Finish />} />
      </Routes>
    </div>
  );
}

export default App;