import React from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Finish = () => {

    const navigate = useNavigate();

    return (
        <div>
            <Header />

            <div className="container mt-4">
                <div className="border p-4 mx-auto shadow d-flex flex-column align-items-center"
                    style={{ maxWidth: '650px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px' }}>

                    {/* Finish Text */}
                    <div
                        className="fw-bold text-primary text-center mb-4"
                        style={{ fontSize: '1.4rem', letterSpacing: '0.5px' }}
                    >
                        <i className="bi bi-check-circle-fill me-2"></i>
                        Finish
                    </div>

                    {/* Red Alert Box */}
                    <div
                        className="p-4 mb-5 d-flex justify-content-center align-items-center text-center"
                        style={{
                            backgroundColor: '#F8D7DA',
                            borderRadius: '6px',
                            color: '#842029',
                            height: '150px',
                            width: '600px',
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            fontWeight: '500'
                        }}
                    >
                        <div className="d-flex flex-column align-items-center">
                            <div className="d-flex align-items-center mb-2">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                <span>You must be at least 18 years old to register.</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                <span>Please enter at least one bank detail.</span>
                            </div>
                        </div>
                    </div>

                    {/* Grey Information Box */}
                    <div
                        className="p-4 mb-5 d-flex justify-content-center align-items-center text-center"
                        style={{
                            backgroundColor: '#E2E3E5',
                            borderRadius: '6px',
                            color: '#000',
                            height: '150px',
                            width: '600px',
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            fontWeight: '500'
                        }}
                    >
                        <div className="d-flex flex-column align-items-center">
                            <i className="bi bi-exclamation-triangle-fill mb-2" style={{ fontSize: '1.5rem' }}></i>
                            <div>Please ensure all entered information is accurate.</div>
                            <div>Once submitted, changes cannot be made.</div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-center gap-3">
                        <button
                            className="btn px-4 fw-bold"
                            style={{ backgroundColor: '#1E59A8', color: 'white', width: '120px' }}
                            onClick={() => navigate('/upload-document')}
                        >
                            Prev
                        </button>
                        <button
                            className="btn px-4 fw-bold"
                            style={{ backgroundColor: '#1E59A8', color: 'white', width: '120px' }}
                            onClick={() => alert('Form Submitted')}
                        >
                            Submit
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Finish;