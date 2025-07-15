import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingButton from '../components/LoadingButton';
import Footer from '../components/Footer';
import SpeakCaptcha from '../components/SpeakCaptcha';
import GeneratePinInput from '../components/GeneratePinInput';

const SignIn = () => {
  const generatePin = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pin = '';
    for (let i = 0; i < 5; i++) {
      pin += chars[Math.floor(Math.random() * chars.length)];
    }
    return pin;
  };

  const navigate = useNavigate();

  const [applicationNo, setApplicationNo] = useState("");
  const [password, setPassword] = useState("");
  const [securityPin, setSecurityPin] = useState("");
  const [securityPinText, setSecurityPinText] = useState(generatePin());
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!applicationNo || !password || !securityPin) {
      alert("Please fill all required fields.");
      return;
    }

    if (securityPin !== securityPinText) {
      alert("Invalid Captcha");
      setSecurityPin("");
      return;
    }

    setLoading(true);

    const payload = {
      applicationNumber: applicationNo,
      password: password,
      captcha: "A9X3Z"
    };

    try {
      const { data } = await axios.post("https://tax-nic-1y21.onrender.com/auth/login", payload);

      if (data.success) {
        alert("Login Successful!!");
        const token = data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("applicationNumber", applicationNo);
        navigate("/part-a");
      } else {
        alert("Invalid Credentials");
      }

    } catch (error) {
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div
          className="border p-4 mx-auto shadow"
          style={{ maxWidth: '700px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px' }}
        >
          <h5 className="fw-bold mb-4 text-center" style={{ color: '#2282C1' }}>
            Registered Candidates Sign-In
          </h5>

          <form onSubmit={handleSubmit}>
            {/* Application Number */}
            <div className="mb-3 row align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">Application Number</label>
              <div className="col-sm-7">
                <input
                  onChange={(e) => setApplicationNo(e.target.value)}
                  value={applicationNo}
                  type="text"
                  className="form-control"
                  placeholder="Application Number"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3 row align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">Password</label>
              <div className="col-sm-7">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  required
                />
              </div>
            </div>

            {/* Security Pin Input */}
            <div className="mb-3 row align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">Security Pin (case sensitive)</label>
              <div className="col-sm-7">
                <input
                  onChange={(e) => setSecurityPin(e.target.value)}
                  value={securityPin}
                  type="text"
                  className="form-control"
                  placeholder="Enter Security Pin"
                  required
                />
              </div>
            </div>

            {/* Captcha Text + Regenerate */}
            <GeneratePinInput
                pin={securityPinText}
                onRegenerate={() => setSecurityPinText(generatePin())}
            />

            {/* Use SpeakCaptcha component here */}
            <SpeakCaptcha
              pin={securityPinText}
              isSpeaking={isSpeaking}
              onSpeakStart={() => setIsSpeaking(true)}
              onSpeakEnd={() => setIsSpeaking(false)}
            />

            {/* Sign In Button */}
            <div className="position-relative mb-3">
              <div className="d-flex justify-content-center">
                <LoadingButton
                  type="submit"
                  loading={loading}
                  style={{
                    backgroundColor: "#1E59A8",
                    color: "white",
                    width: "250px",
                  }}
                >
                  Sign In
                </LoadingButton>
              </div>

              {/* Desktop Forgot Password beside button */}
              <a
                onClick={() => navigate('/forgot-password')}
                href="#"
                className="d-none d-lg-block"
                style={{
                  color: '#000000',
                  whiteSpace: 'nowrap',
                  position: 'absolute',
                  right: '0',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                Forgot Password?
              </a>
            </div>

            {/* New Registration Button */}
            <div className="d-flex justify-content-center mb-3">
              <button
                type="button"
                onClick={() => navigate('/part-a')}
                className="btn fw-bold px-4"
                style={{ backgroundColor: '#FC6C1B', color: 'white', width: '250px' }}
              >
                New Registration &gt;&gt;
              </button>
            </div>

            {/* Forgot Application Number */}
            <div className="d-flex justify-content-end mb-2">
              <a
                href="#"
                onClick={() => navigate('/forgot-id')}
                style={{ color: '#1E59A8' }}
              >
                Forgot Application Number
              </a>
            </div>

            {/* Mobile Forgot Password */}
            <div className="d-block d-lg-none text-end mb-3">
              <a
                onClick={() => navigate('/forgot-password')}
                href="#"
                style={{ color: '#1E59A8' }}
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignIn;