import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import SignUp from "./pages/SignIn.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import ForgotId from "./pages/ForgotId.js";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-id" element={<ForgotId />} />
      </Routes>
    </div>
  );
}

export default App;