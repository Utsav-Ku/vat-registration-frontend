import React from 'react';

const GeneratePinInput = ({ pin, onRegenerate }) => {
  return (
    <div className="mb-3 row align-items-center">
      <label className="col-sm-5 col-form-label fw-bold">Security Pin</label>
      <div className="col-sm-7 d-flex align-items-center">
        <input
          type="text"
          className="form-control text-center me-2"
          style={{ width: '120px' }}
          value={pin}
          readOnly
        />
        <i
          className="bi bi-arrow-clockwise"
          role="button"
          style={{ cursor: 'pointer' }}
          onClick={onRegenerate}
        ></i>
      </div>
    </div>
  );
};

export default GeneratePinInput;