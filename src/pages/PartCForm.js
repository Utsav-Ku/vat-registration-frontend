import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const PartCForm = () => {
  const navigate = useNavigate();
  const [isCitizen, setIsCitizen] = useState(true);
  const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  if (!form.checkValidity()) {
    form.reportValidity(); 
    return;
  }
  navigate("/bank-info");
};
  return (
    <>
      <Header />
      <div className="container mt-4 mb-5">
        <div className="card shadow-lg p-4">
          <form onSubmit={handleSubmit}>
             <div className="fw-bold text-primary text-center mb-4" style={{ fontSize: "1.5rem", letterSpacing: "0.5px" }}>
            <i className="bi bi-pencil-square me-2"></i>
            Part (C)
          </div>
            {/* Repeating pattern: Label - Input aligned horizontally */}
            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                Regd No. under Central Excise and Tariff Act (if any)
              </label>
              <div className="col-sm-7">
                <input type="text" className="form-control" />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                Trade License issued by Municipality / Local Body
              </label>
              <div className="col-sm-7">
                <input type="text" className="form-control" />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                Date of issue of Trade License Certificate
              </label>
              <div className="col-sm-7">
                <input type="date" className="form-control" />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                Date of last Renewal of Trade License Certificate
              </label>
              <div className="col-sm-7">
                <input type="date" className="form-control" />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                Language to be used in maintaining accounts
              </label>
              <div className="col-sm-7">
                <input type="text" className="form-control " />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">Accounting Year - From</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" placeholder="From" />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">Accounting Year - To</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" placeholder="To" />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                Amount of sale During Last Quarter <span className="text-danger">*</span>
              </label>
              <div className="col-sm-7">
                <input type="number" className="form-control" required/>
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">Amount of sale During Last Year <span className="text-danger">*</span></label>
              <div className="col-sm-7">
                <input type="number" className="form-control"  required />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                License issued under Tripura's Shop's & Establishment Act - No.
              </label>
              <div className="col-sm-7">
                <input type="text" className="form-control" />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                License issued under Tripura's Shop's & Establishment Act - Date
              </label>
              <div className="col-sm-7">
                <input type="date" className="form-control" />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                Food Staff License issued by Competent Authority - No.
              </label>
              <div className="col-sm-7">
                <input type="text" className="form-control" />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                Food Staff License issued by Competent Authority - Date
              </label>
              <div className="col-sm-7">
                <input type="date" className="form-control" />
              </div>
            </div>

            <div className="row mb-4 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                Whether Citizen of India or Not (Y/N)
              </label>
              <div className="col-sm-7">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="citizen"
                    id="yes"
                    value="yes"
                    checked={isCitizen}
                    onChange={() => setIsCitizen(true)}
                  />
                  <label className="form-check-label" htmlFor="yes">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="citizen"
                    id="no"
                    value="no"
                    checked={!isCitizen}
                    onChange={() => setIsCitizen(false)}
                  />
                  <label className="form-check-label" htmlFor="no">No</label>
                </div>
              </div>
            </div>

               <div className="p-4 border rounded shadow-sm mb-4 bg-light">
  <h6 className="fw-bold text-primary mb-3">
    <i className="bi bi-file-earmark-text-fill me-2"></i>Declaration
  </h6>

  <div className="row g-3 mb-3">
    <div className="col-sm-2">
      <input
        type="text"
        className="form-control"
        value="I"
        readOnly
      />
    </div>
    <div className="col-sm-6">
      <input
        type="text"
        className="form-control"
        placeholder="Applicant Name"
        required
      />
    </div>
    <div className="col-sm-4">
      <select className="form-select" required>
        <option value="">Select Role</option>
        <option>Chairman</option>
        <option>Owner</option>
        <option>Partner</option>
      </select>
    </div>
  </div>

  <p className="fst-italic mb-4 ps-1 text-muted">
    hereby declare that the particulars given herein are correct and I hereby apply for registration for Value Added Tax.
  </p>

  <div className="row g-3">
    <label className="col-sm-3 col-form-label fw-bold">
      Designation
    </label>
    <div className="col-sm-9">
      <input
        type="text"
        className="form-control"
        required
      />
    </div>
  </div>
</div>
          <div className="d-flex justify-content-center mt-4">
              <div className="d-flex" style={{ gap: "30px" }}>
                <button
                  type="button"
                  className="btn px-4"
                  style={{ backgroundColor: "rgb(30, 89, 168)", color: "white", width: "250px" }}
                  onClick={() => navigate("/part-b")}
                >
                  Previous
                </button>
                  <button type="submit" className="btn px-4" style={{ backgroundColor: "rgb(30, 89, 168)", color: "white", width: "250px" }} >
                   Save & Continue
            </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PartCForm;


