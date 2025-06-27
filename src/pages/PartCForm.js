import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; 

const PartCForm = () => {
  const navigate = useNavigate();
  const [isCitizen, setIsCitizen] = useState(true);

  return (
    <>
      <Header />
      <div className="container mt-4 mb-5">
        <div className="card shadow-lg p-4">
          <h5 className="fw-bold mb-1" style={{color: '#2282C1' }}>Part (C)</h5><hr></hr>
          <form>
            <div className="mb-3">
              <label className="form-label fw-bold">
                Regd No. under Central Excise and Tariff Act (if any)
              </label>
              <input type="text" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                Trade License issued by the Municipality office / Nagar panchayet / Local body
              </label>
              <input type="text" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Date of issue of Trade License Certificate</label>
              <input type="date" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Date of last Renewal of Trade License Certificate</label>
              <input type="date" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Language to be used in maintaining accounts</label>
              <input type="text" className="form-control border border-primary" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Accounting Year - From</label>
              <input type="text" className="form-control" placeholder="From" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Accounting Year - To</label>
              <input type="text" className="form-control" placeholder="To" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                Amount of sale During Last Quarter <span className="text-danger">*</span>
              </label>
              <input type="number" className="form-control" defaultValue="1000" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Amount of sale During Last Year</label>
              <input type="number" className="form-control" defaultValue="1000" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                License issued under Tripura's Shop's & Establishment Act - No.
              </label>
              <input type="text" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                License issued under Tripura's Shop's & Establishment Act - Date
              </label>
              <input type="date" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                Food Staff License issued by the competent Authority - No.
              </label>
              <input type="text" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                Food Staff License issued by the competent Authority - Date
              </label>
              <input type="date" className="form-control" />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">
                Whether Citizen of India or Not (Y/N)
              </label>
              <div>
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

            <h6 className="fw-bold text-primary">Declaration</h6>
            <hr />

            <div className="row mb-3">
              <div className="col-md-2">
                <input type="text" className="form-control" value="I" readOnly />
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Applicant Name" />
              </div>
              <div className="col-md-4">
                <select className="form-select">
                  <option>Chairman</option>
                  <option>Owner</option>
                  <option>Partner</option>
                </select>
              </div>
            </div>

            <p className="mb-3">
              hereby declare that the particulars given herein are correct and I hereby apply for registration for Value Added Tax.
            </p>

            <div className="mb-4" style={{ maxWidth: '300px' }}>
              <label className="form-label fw-bold">Designation</label>
              <input type="text" className="form-control" defaultValue="Director" />
            </div>

            <div className="d-flex justify-content-center mt-4">
              <div className="d-flex" style={{ gap: '30px' }}>
                <button
                  type="button"
                  className="btn px-4"
                  style={{ backgroundColor: 'rgb(30, 89, 168)', color: 'white', width: '250px' }}
                  onClick={() => navigate('/part-b')}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="btn px-4"
                  style={{ backgroundColor: 'rgb(30, 89, 168)', color: 'white', width: '250px' }}
                  onClick={() => navigate('/bank-info')}
                >
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