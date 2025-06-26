import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const ForgotApplicationNumber = () => {

    const generatePin = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const navigate = useNavigate();

    const [applicantName, setApplicantName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [gender, setGender] = useState("");
    const [dobDay, setDobDay] = useState("");
    const [dobMonth, setDobMonth] = useState("");
    const [dobYear, setDobYear] = useState("");
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add validation or API integration
        navigate('/sign-up');
    };

    return (
        <div>
            <Header />

            <div className="container mt-4">
                <div className="border p-4 mx-auto shadow" 
                    style={{ maxWidth: '700px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px' }}>

                    <h5 className="fw-bold mb-4 text-center" style={{ color: '#2282C1' }}>
                        Forgot Application Number
                    </h5>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3 row align-items-center">
                            <label className="col-sm-5 col-form-label fw-bold">Name of Applicant</label>
                            <div className="col-sm-7">
                                <input onChange={(e) => setApplicantName(e.target.value)} value={applicantName} type="text" className="form-control" placeholder="Enter Full Name" required />
                            </div>
                        </div>

                        <div className="mb-3 row align-items-center">
                            <label className="col-sm-5 col-form-label fw-bold">Father's Name</label>
                            <div className="col-sm-7">
                                <input onChange={(e) => setFatherName(e.target.value)} value={fatherName} type="text" className="form-control" placeholder="Enter Father's Name" required />
                            </div>
                        </div>

                        <div className="mb-3 row align-items-center">
                            <label className="col-sm-5 col-form-label fw-bold">Gender</label>
                            <div className="col-sm-7">
                                <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)} required>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-3 row align-items-center">
                            <label className="col-sm-5 col-form-label fw-bold">Date of Birth</label>
                            <div className="col-sm-7 d-flex">
                                <input onChange={(e) => setDobDay(e.target.value)} value={dobDay} type="text" className="form-control me-2" placeholder="DD" maxLength={2} style={{ width: '60px' }} required />
                                <input onChange={(e) => setDobMonth(e.target.value)} value={dobMonth} type="text" className="form-control me-2" placeholder="MM" maxLength={2} style={{ width: '60px' }} required />
                                <input onChange={(e) => setDobYear(e.target.value)} value={dobYear} type="text" className="form-control" placeholder="YYYY" maxLength={4} style={{ width: '80px' }} required />
                            </div>
                        </div>

                        <div className="mb-3 row align-items-center">
                            <label className="col-sm-5 col-form-label fw-bold">Security Pin (case sensitive)</label>
                            <div className="col-sm-7">
                                <input onChange={(e) => setSecurityPin(e.target.value)} value={securityPin} type="text" className="form-control" placeholder="Enter Security Pin" required />
                            </div>
                        </div>

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

                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn px-4" style={{ backgroundColor: '#1E59A8', color: 'white', width: '250px' }}>
                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    );
};

export default ForgotApplicationNumber;