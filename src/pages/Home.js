import React from 'react';
import Header from '../components/Header.js';

const Home = () => {
  return (
    <div>
        <Header />

        <div className="container my-4">
            
            <div className="row">

            <div className="col-md-6 mb-4">
                <div className="border p-4 h-100 rounded shadow text-center" style={{ backgroundColor: '#E9ECEF' }}>
                
                <img src="/logo.png" alt="Login Icon" className="mb-3" style={{ width: '60px' }} />

                <h5 className="fw-bold">Already Registered Candidate</h5>
                <h6>पहले से पंजीकृत उम्मीदवार</h6>

                <hr />

                <p>
                    Enter Your UGAAC ID and Password to login and continue with your application. <br />
                    लॉगिन करने के लिए अपना UGAAC ID और पासवर्ड दर्ज करें और अपना आवेदन जारी रखें।
                </p>

                <div style={{ marginTop: '100px'}}>
                    <button 
                    className="btn w-100 mb-2" 
                    style={{ backgroundColor: '#1E59A8', color: 'white' }}
                    >
                    Click Here For Login
                    </button>

                    <a href="#" className="d-block text-decoration-none" style={{ color: '#1E59A8' }}>
                    Forgot Application Number
                    </a>
                </div>

                </div>
            </div>

            <div className="col-md-6 mb-4">
                <div className="border p-4 h-100 rounded shadow text-center" style={{ backgroundColor: '#E9ECEF' }}>
                
                <img src="/logo.png" alt="Register Icon" className="mb-3" style={{ width: '60px' }} />

                <h5 className="fw-bold">Register your Profile</h5>
                <h6>अपना प्रोफाइल पंजीकृत करें</h6>

                <hr />

                <p>
                    Register your profile by filling in details. <br />
                    प्रोफाइल पंजीकृत करने के लिए विवरण भरें।
                </p>

                <div style={{ marginTop: '147px'}}>
                    <button 
                    className="btn w-100" 
                    style={{ backgroundColor: '#1E59A8', color: 'white' }}
                    >
                    New Registration
                    </button>
                </div>

                </div>
            </div>

            </div>
        </div>
      
    </div>
  );
};

export default Home;