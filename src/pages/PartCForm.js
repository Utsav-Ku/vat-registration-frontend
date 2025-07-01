import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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

            {/* Accounting Year - From & To in Row Layout */}
            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">Accounting Year</label>
              <div className="col-sm-7 d-flex align-items-center">
                <input type="text" className="form-control me-2" placeholder="From (Month)" />
                <span className="fw-bold me-2">To</span>
                <input type="text" className="form-control" placeholder="To (Month)" />
              </div>
            </div>

            {/* Amount of Sale During Last Quarter and Last Year in One Row */}
            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">Amount of Sale During</label>
              <div className="col-sm-7 d-flex align-items-center">
                <span className="me-2">Last Quarter<span className="text-danger">*</span></span>
                <input type="number" className="form-control me-3" style={{ width: "150px" }} required />

                <span className="me-2">Last Year<span className="text-danger">*</span></span>
                <input type="number" className="form-control" style={{ width: "150px" }} required />
              </div>
            </div>

            {/* License Issued Under the Tripura Shops & Establishment Act */}
            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                License Issued Under the Tripura Shops & Establishment Act
              </label>
              <div className="col-sm-7 d-flex align-items-center">
                <input
                  type="text"
                  className="form-control me-3"
                  placeholder="Licence No."
                  style={{ maxWidth: "150px" }}
                />
                <span className="me-2">Date</span>
                <input
                  type="date"
                  className="form-control"
                  style={{ maxWidth: "200px" }}
                />
              </div>
            </div>


            {/* Food Staff Licence issued by Competent Authority */}
            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                Food Staff Licence issued by the Competent Authority
              </label>
              <div className="col-sm-7 d-flex align-items-center">
                <input
                  type="text"
                  className="form-control me-3"
                  placeholder="Licence No."
                  style={{ maxWidth: "150px" }}
                />
                <span className="me-2">Date</span>
                <input
                  type="date"
                  className="form-control"
                  style={{ maxWidth: "200px" }}
                />
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

            {/* Declaration Section */}
            <div className="p-4 border rounded shadow-sm mb-4" style={{ backgroundColor: "#F8F9FA" }}>
              <h6 className="fw-bold text-primary mb-3">
                <i className="bi bi-file-earmark-text-fill me-2"></i>
                Declaration
              </h6>

              <p className="mb-3">
                I,&nbsp;
                <input
                  type="text"
                  className="form-control d-inline-block"
                  style={{ width: "200px", display: "inline-block" }}
                  placeholder="Applicant Name"
                  required
                />
                &nbsp;
                <select className="form-select d-inline-block" style={{ width: "180px", display: "inline-block" }} required>
                  <option value="">Select Role</option>
                  <option>Chairman</option>
                  <option>Owner</option>
                  <option>Partner</option>
                </select>
                &nbsp; hereby declare that the particulars given herein are correct and I hereby apply for registration for Value Added Tax.
              </p>

              <div className="row g-3 mt-3">
                <label className="col-sm-3 col-form-label fw-bold">
                  Designation<span className="text-danger">*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your designation"
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