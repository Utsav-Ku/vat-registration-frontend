import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingButton from '../components/LoadingButton';
import Footer from '../components/Footer';

const ForgotPassword = () => {

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
    const [dobDay, setDobDay] = useState("");
    const [dobMonth, setDobMonth] = useState("");
    const [dobYear, setDobYear] = useState("");
    const [securityPin, setSecurityPin] = useState("");
    const [securityPinText, setSecurityPinText] = useState(generatePin());
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [loading, setLoading] = useState(false);

    const speakSecurityPin = () => {
        if (isSpeaking) return;

        const utterance = new SpeechSynthesisUtterance(securityPinText.split('').join(' '));
        utterance.lang = 'en-US';
        utterance.rate = 1;

        setIsSpeaking(true);
        speechSynthesis.speak(utterance);

        utterance.onend = () => {
            setIsSpeaking(false);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!applicationNo || !dobDay || !dobMonth || !dobYear || !securityPin) {
            alert("Please fill all required fields.");
            return;
        }

        setLoading(true);

        const dateOfBirth = `${dobYear}-${dobMonth.padStart(2, '0')}-${dobDay.padStart(2, '0')}`;

        const payload = {
            "applicationNumber": applicationNo,
            "dateOfBirth": dateOfBirth,
            "captcha": "B2F7P"
        }

        if(securityPin !== securityPinText){
            alert("Invalid Capchta");
            setSecurityPin("");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post("https://tax-nic-1y21.onrender.com/auth/forgot-password", payload);
            if(data.success){
                alert(`New password generated successfully \n $ New Password: ${data.newPassword}`);
                navigate("/sign-in");
            } else{
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
                <div className="border p-4 mx-auto shadow"
                    style={{ maxWidth: '700px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px' }}>

                    <h5 className="fw-bold mb-4 text-center" style={{ color: '#2282C1' }}>
                        Forgot Password
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

                        {/* Date of Birth */}
                        <div className="mb-3 row align-items-center">
                            <label className="col-sm-5 col-form-label fw-bold">Date of Birth</label>
                            <div className="col-sm-7 d-flex">
                                <input 
                                    onChange={(e) => setDobDay(e.target.value)} 
                                    value={dobDay} 
                                    type="text" 
                                    className="form-control me-2" 
                                    placeholder="DD" 
                                    maxLength={2} 
                                    style={{ width: '60px' }} 
                                    required 
                                />
                                <input 
                                    onChange={(e) => setDobMonth(e.target.value)} 
                                    value={dobMonth} 
                                    type="text" 
                                    className="form-control me-2" 
                                    placeholder="MM" 
                                    maxLength={2} 
                                    style={{ width: '60px' }} 
                                    required 
                                />
                                <input 
                                    onChange={(e) => setDobYear(e.target.value)} 
                                    value={dobYear} 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="YYYY" 
                                    maxLength={4} 
                                    style={{ width: '80px' }} 
                                    required 
                                />
                            </div>
                        </div>

                        {/* Security Pin */}
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

                        {/* Captcha with Refresh */}
                        <div className="mb-4 row align-items-center">
                            <label className="col-sm-5 col-form-label fw-bold">Security Pin</label>
                            <div className="col-sm-7 d-flex align-items-center">
                                <input 
                                    type="text" 
                                    className="form-control text-center me-2" 
                                    style={{ width: '120px' }} 
                                    value={securityPinText} 
                                    readOnly 
                                />

                                <i 
                                    className="bi bi-arrow-clockwise" 
                                    role="button" 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={() => setSecurityPinText(generatePin())}
                                ></i>
                            </div>
                        </div>

                        {/* Audio */}
                        <div className="mb-4 row align-items-center">
                            <label className="col-sm-5 col-form-label fw-bold">Listen Security Pin Audio</label>
                            <div className="col-sm-7">
                                <button 
                                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center position-relative"
                                    type="button"
                                    onClick={speakSecurityPin}
                                    disabled={isSpeaking}
                                    style={{ minWidth: '180px' }}
                                >
                                    <i className="bi bi-volume-up me-2"></i>
                                    {isSpeaking ? (
                                        <span className="d-flex align-items-center">
                                            Speaking
                                            <span className="dot ms-1"></span>
                                            <span className="dot ms-1"></span>
                                            <span className="dot ms-1"></span>
                                        </span>
                                    ) : (
                                        "Play Security Pin"
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
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
                                Reset password
                            </LoadingButton>
                        </div>

                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForgotPassword;