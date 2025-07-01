import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import SignIn from "./pages/SignIn.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import ForgotId from "./pages/ForgotId.js";
import Finish from "./pages/Finish.js";
import DocumentUpload from "./pages/DocumentUpload.js";
import PartAForm from "./pages/PartAForm.js";
import PartBForm from "./pages/PartBForm.js";
import BusinessPartnerDetails from "./pages/businessPartnerDetails.js";
import PartCForm from "./pages/PartCForm.js";
import BankInfo from "./pages/BankInfo.js";
import AdditionalBusinessPlaces from "./pages/AdditionalBusinessPlaces.js";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-id" element={<ForgotId />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="/upload-document" element={<DocumentUpload />}/>
        <Route path="/part-a" element={<PartAForm />} />
        <Route path="/part-b" element={<PartBForm />} />
        <Route path="/part-c" element={<PartCForm />} />
        <Route path="/bank-info" element={<BankInfo />} />
        <Route path="/business-partner-details" element={<BusinessPartnerDetails />} />
        <Route path="/additional-business-places" element={<AdditionalBusinessPlaces />} />
      </Routes>
    </div>
  );
}

export default App;
