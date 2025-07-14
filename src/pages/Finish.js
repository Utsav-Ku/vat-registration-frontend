import React, { useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Finish = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = () => {
    localStorage.removeItem('applicationNumber');
    localStorage.removeItem('token');
    alert("Application submitted successfully. You will be redirected to the home page.");
    navigate('/');
  };

  const boxStyle = {
    borderRadius: '6px',
    fontSize: '1.1rem',
    lineHeight: '1.8',
    fontWeight: '500',
    width: '100%',
    maxWidth: '100%',
    padding: '24px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '150px'
  };

  return (
    <div>
      <Header />

      <div className="container mt-4">
        <div
          className="border p-4 mx-auto shadow d-flex flex-column align-items-center w-100"
          style={{ maxWidth: '850px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px' }}
        >
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
            className="mb-5"
            style={{
              ...boxStyle,
              backgroundColor: '#F8D7DA',
              color: '#842029'
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
            className="mb-5"
            style={{
              ...boxStyle,
              backgroundColor: '#E2E3E5',
              color: '#000'
            }}
          >
            <div className="d-flex flex-column align-items-center">
              <i className="bi bi-exclamation-triangle-fill mb-2" style={{ fontSize: '1.5rem' }}></i>
              <div>Please ensure all entered information is accurate.</div>
              <div>Once submitted, changes cannot be made.</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <button
              className="btn px-4 fw-bold"
              style={{ backgroundColor: '#1E59A8', color: 'white', width: '150px' }}
              onClick={() => navigate('/upload-document')}
            >
              Prev
            </button>
            <button
              type="button"
              className="btn px-4 fw-bold"
              style={{ backgroundColor: '#1E59A8', color: 'white', width: '150px' }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Finish;
