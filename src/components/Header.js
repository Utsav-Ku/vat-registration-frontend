import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header-container">
      <img src="/OIP.png" alt="Satyamev Jayate" className="left-logo" />
      
      <div className="nic-container">
        <img src="/nic.png" alt="NIC Logo" className="nic-logo" />
        
        <div className="nic-text">
          <h2 className="hindi-text">राष्ट्रीय सूचना विज्ञान केंद्र</h2>
          <h2 className="english-text">National Informatics Centre</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
