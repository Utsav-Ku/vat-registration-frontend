import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

const PartCForm = () => {
  const navigate = useNavigate();
  const [isCitizen, setIsCitizen] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const applicationNumber = localStorage.getItem("applicationNumber");
    const token = localStorage.getItem("token"); // 👈 Get token from localStorage

    if (!applicationNumber) {
      alert("Application number not found. Please complete Part A first.");
      return;
    }

    if (!token) {
      alert("Authorization token not found. Please login again.");
      return;
    }

    console.log(token);

    const payload = {
      applicationNumber,
      centralExciseRegNo: form[0].value,
      tradeLicenseNo: form[1].value,
      tradeLicenseIssueDate: form[2].value,
      tradeLicenseRenewalDate: form[3].value,
      accountLanguage: form[4].value,
      accountingYearFrom: form[5].value,
      accountingYearTo: form[6].value,
      saleLastQuarter: form[7].value,
      saleLastYear: form[8].value,
      shopLicense: {
        licenseNo: form[9].value,
        issueDate: form[10].value,
      },
      foodLicense: {
        licenseNo: form[11].value,
        issueDate: form[12].value,
      },
      isIndianCitizen: isCitizen,
      declaration: {
        applicantName: form[13].value,
        designation: form[15].value,
      },
    };

    try {
      setLoading(true);
      const res = await axios.post(
        "https://tax-nic-1y21.onrender.com/registration/part-c",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 Send token in header
            "Content-Type": "application/json"
          }
        }
      );

      if (res.data.success) {
        alert("Part-C saved successfully.");
        navigate("/bank-info");
      } else {
        alert(res.data.message || "Failed to save Part-C.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4 mb-5">
        <div className="card shadow-lg p-4">
          <form onSubmit={handleSubmit}>

            <div className="fw-bold text-primary text-center mb-4" style={{ fontSize: "1.5rem", letterSpacing: "0.5px" }}>
              <i className="bi bi-pencil-square me-2"></i> Part (C)
            </div>

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
                <input type="text" className="form-control" />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">Accounting Year</label>
              <div className="col-sm-7 d-flex align-items-center">
                <input type="text" className="form-control me-2" placeholder="From (Month)" />
                <span className="fw-bold me-2">To</span>
                <input type="text" className="form-control" placeholder="To (Month)" />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">Amount of Sale During</label>
              <div className="col-sm-7 d-flex align-items-center">
                <span className="me-2">Last Quarter<span className="text-danger">*</span></span>
                <input type="number" className="form-control me-3" style={{ width: "150px" }} required />
                <span className="me-2">Last Year<span className="text-danger">*</span></span>
                <input type="number" className="form-control" style={{ width: "150px" }} required />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                License Issued Under the Tripura Shops & Establishment Act
              </label>
              <div className="col-sm-7 d-flex align-items-center">
                <input type="text" className="form-control me-3" placeholder="Licence No." style={{ maxWidth: "150px" }} />
                <span className="me-2">Date</span>
                <input type="date" className="form-control" style={{ maxWidth: "200px" }} />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                Food Staff Licence issued by the Competent Authority
              </label>
              <div className="col-sm-7 d-flex align-items-center">
                <input type="text" className="form-control me-3" placeholder="Licence No." style={{ maxWidth: "150px" }} />
                <span className="me-2">Date</span>
                <input type="date" className="form-control" style={{ maxWidth: "200px" }} />
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

            <div className="p-4 border rounded shadow-sm mb-4" style={{ backgroundColor: "#F8F9FA" }}>
              <h6 className="fw-bold text-primary mb-3">
                <i className="bi bi-file-earmark-text-fill me-2"></i> Declaration
              </h6>
              <p className="mb-3">
                I,&nbsp;
                <input type="text" className="form-control d-inline-block" style={{ width: "200px" }} placeholder="Applicant Name" required />
                &nbsp;
                <select className="form-select d-inline-block" style={{ width: "180px" }} required>
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
                  <input type="text" className="form-control" placeholder="Enter your designation" required />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-4">
              <div className="d-flex" style={{ gap: "30px" }}>
                <button type="button" className="btn px-4" style={{ backgroundColor: "rgb(30, 89, 168)", color: "white", width: "250px" }} onClick={() => navigate("/part-b")}>
                  Previous
                </button>
                <button
                  type="submit"
                  className="btn px-4 d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "#1E59A8",
                    color: "white",
                    width: "250px",
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing...
                    </>
                  ) : (
                    "Save & Continue"
                  )}
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