import React from 'react';

const Header = () => {
  return (
    <div className="d-flex align-items-center w-100 p-3 border-bottom" >
      
      <img 
        src="/OIP.png" 
        alt="Satyamev Jayate" 
        style={{ width: '66px', height: '105px', marginRight: '20px' }} 
      />
      
      <div className="d-flex align-items-center">
        
        <img 
          src="/nic.png" 
          alt="NIC Logo" 
          style={{ maxHeight: '88px', width: '189px', marginRight: '10px' }} 
        />
        
        <div className="d-none d-md-block">
          <h2 className="fw-bold mb-0" style={{ fontSize: '36px', color: '#2282C1' }}>
            राष्ट्रीय सूचना विज्ञान केंद्र
          </h2>
          <h2 className="fw-bold mb-0" style={{ fontSize: '36px', color: '#2282C1' }}>
            National Informatics Centre
          </h2>
        </div>

      </div>

    </div>
  );
};

export default Header;