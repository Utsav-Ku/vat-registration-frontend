import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const generatePin = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const navigate = useNavigate();

    const [applicationNo, setApplicationNo] = useState("");
    const [password, setPassword] = useState("");
    const [securityPin, setSecurityPin] = useState("");
    const [securityPinText, setSecurityPinText] = useState(generatePin());
    const [isSpeaking, setIsSpeaking] = useState(false);

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

    return (
        <div>
            <Header />

            <div className="container mt-4">
                <div className="border p-4 mx-auto shadow" 
                    style={{ maxWidth: '700px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px' }}>

                    {/* Heading inside box */}
                    <h5 className="fw-bold mb-4 text-center" style={{ color: '#2282C1' }}>
                        Registered Candidates Sign-In
                    </h5>

                    {/* Application Number */}
                    <div className="mb-3 row align-items-center">
                        <label className="col-sm-5 col-form-label fw-bold">Application Number</label>
                        <div className="col-sm-7">
                            <input onChange={(e) => setApplicationNo(e.target.value)} value={applicationNo} type="text" className="form-control" placeholder="Application Number" />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-3 row align-items-center">
                        <label className="col-sm-5 col-form-label fw-bold">Password</label>
                        <div className="col-sm-7">
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control" placeholder="Enter Password" />
                        </div>
                    </div>

                    {/* Security Pin */}
                    <div className="mb-3 row align-items-center">
                        <label className="col-sm-5 col-form-label fw-bold">Security Pin (case sensitive)</label>
                        <div className="col-sm-7">
                            <input onChange={(e) => setSecurityPin(e.target.value)} value={securityPin} type="text" className="form-control" placeholder="Enter Security Pin" />
                        </div>
                    </div>

                    {/* Captcha */}
                    <div className="mb-3 row align-items-center">
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


                    {/* Buttons and Links */}
                    <div className="position-relative mb-3">

                        <div className="d-flex justify-content-center">
                            <button 
                                className="btn px-4" 
                                style={{ backgroundColor: '#1E59A8', color: 'white', width: '250px' }}
                            >
                                Sign In
                            </button>
                        </div>

                        <a 
                            onClick={() => navigate('/forgot-password')}
                            href="#" 
                            style={{ color: '#000000', whiteSpace: 'nowrap', position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }}
                        >
                            Forgot Password?
                        </a>

                    </div>

                    {/* New Registration Button */}
                    <div className="d-flex justify-content-center mb-3">
                        <button
                            onClick={() => navigate('/')} 
                            className="btn fw-bold px-4" 
                            style={{ backgroundColor: '#FC6C1B', color: 'white', width: '250px' }}
                        >
                            New Registration &gt;&gt;
                        </button>
                    </div>

                    {/* Forgot Application Number Link */}
                    <div className="d-flex justify-content-end">
                        <a href="#" onClick={() => navigate('/forgot-id')} style={{ color: '#1E59A8' }}>Forgot Application Number</a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignIn;