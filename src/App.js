import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import SignUp from "./pages/SignIn.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import ForgotId from "./pages/ForgotId.js";
import Finish from "./pages/Finish.js";
<<<<<<< HEAD
import DocumentUpload from "./pages/DocumentUpload.js";
=======
>>>>>>> c2223d6d31ab30d936b24e18af5ffea458c28572
import PartAForm from "./pages/PartAForm.js";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-id" element={<ForgotId />} />
        <Route path="/finish" element={<Finish />} />
<<<<<<< HEAD
        <Route path="/upload-document" element={<DocumentUpload />}/>
        <Route path="/part-a" element={<PartAForm />} />
=======
         <Route path="/part-a" element={<PartAForm />} />
>>>>>>> c2223d6d31ab30d936b24e18af5ffea458c28572
      </Routes>
    </div>
  );
}

export default App;