import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import LoadingButton from "../components/LoadingButton";
import Footer from "../components/Footer";

const PartCForm = () => {
  const navigate = useNavigate();
  const [isCitizen, setIsCitizen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [centralExciseRegNo, setCentralExciseRegNo] = useState("");
  const [tradeLicenseNo, setTradeLicenseNo] = useState("");
  const [tradeLicenseIssueDate, setTradeLicenseIssueDate] = useState("");
  const [tradeLicenseRenewalDate, setTradeLicenseRenewalDate] = useState("");
  const [accountLanguage, setAccountLanguage] = useState("");
  const [accountingYearFrom, setAccountingYearFrom] = useState("");
  const [accountingYearTo, setAccountingYearTo] = useState("");
  const [saleLastQuarter, setSaleLastQuarter] = useState("");
  const [saleLastYear, setSaleLastYear] = useState("");
  const [shopLicenseNo, setShopLicenseNo] = useState("");
  const [shopIssueDate, setShopIssueDate] = useState("");
  const [foodLicenseNo, setFoodLicenseNo] = useState("");
  const [foodIssueDate, setFoodIssueDate] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [role, setRole] = useState("");
  const [designation, setDesignation] = useState("");

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const applicationNumber = localStorage.getItem("applicationNumber");

    if (!token) {
      alert("You are not logged in. Please log in to continue.");
      navigate("/sign-in");
      return;
    }

    if (!applicationNumber) {
      alert("Please complete Part A first to get the application number.");
      navigate("/part-a");
      return;
    }

    try {
      const res = await axios.get(`https://tax-nic-1y21.onrender.com/registration/part-c?applicationNumber=${applicationNumber}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = res.data;
      console.log("Fetched Part C Data:", data);
      if (data) {
        setCentralExciseRegNo(data.centralExciseRegNo || "");
        setTradeLicenseNo(data.tradeLicenseNo || "");
        setTradeLicenseIssueDate(data.tradeLicenseIssueDate || "");
        setTradeLicenseRenewalDate(data.tradeLicenseRenewalDate || "");
        setAccountLanguage(data.accountLanguage || "");
        setAccountingYearFrom(data.accountingYearFrom|| ""); 
        setAccountingYearTo(data.accountingYearTo || "");    
        setSaleLastQuarter(data.saleLastQuarter || "");
        setSaleLastYear(data.saleLastYear || "");
        setShopLicenseNo(data.shopLicense.licenseNo || "");  
        setShopIssueDate(data.shopLicense.issueDate || "");
        setFoodLicenseNo(data.foodLicense.licenseNo || "");   
        setFoodIssueDate(data.foodLicense.issueDate || "");
        setIsCitizen(data.isIndianCitizen ?? true);
        setApplicantName(data.declaration.applicantName || ""); 
        setRole(data.declaration.designation || "");                   
        setDesignation(data.declaration.designation || "");
      }

    } catch (err) {
      alert("Failed to load Part C data. Please try again.")
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const applicationNumber = localStorage.getItem("applicationNumber");
    const token = localStorage.getItem("token");

    if (!applicationNumber) {
      alert("Application number not found. Please complete Part A first.");
      return;
    }

    if (!token) {
      alert("Authorization token not found. Please login again.");
      return;
    }

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
            Authorization: `Bearer ${token}`,
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
      alert("An error occurred while submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
                <input type="text" className="form-control" onChange={(e) => setCentralExciseRegNo(e.target.value)} value={centralExciseRegNo} />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                Trade License issued by Municipality / Local Body
              </label>
              <div className="col-sm-7">
                <input type="text" className="form-control" onChange={(e) => setTradeLicenseNo(e.target.value)} value={tradeLicenseNo} />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                Date of issue of Trade License Certificate
              </label>
              <div className="col-sm-7">
                <input type="date" className="form-control" onChange={(e) => setTradeLicenseIssueDate(e.target.value)} value={tradeLicenseIssueDate} />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                Date of last Renewal of Trade License Certificate
              </label>
              <div className="col-sm-7">
                <input type="date" className="form-control" onChange={(e) => setTradeLicenseRenewalDate(e.target.value)} value={tradeLicenseRenewalDate} />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                Language to be used in maintaining accounts
              </label>
              <div className="col-sm-7">
                <input type="text" className="form-control" onChange={(e) => setAccountLanguage(e.target.value)} value={accountLanguage} />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">Accounting Year</label>
              <div className="col-sm-7 d-flex align-items-center">
                <input type="text" className="form-control me-2" placeholder="From (Month)" onChange={(e) => setAccountingYearFrom(e.target.value)} value={accountingYearFrom} />
                <span className="fw-bold me-2">To</span>
                <input type="text" className="form-control" placeholder="To (Month)" onChange={(e) => setAccountingYearTo(e.target.value)} value={accountingYearTo} />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">Amount of Sale During</label>
              <div className="col-sm-7 d-flex align-items-center">
                <span className="me-2">Last Quarter<span className="text-danger">*</span></span>
                <input type="number" className="form-control me-3" style={{ width: "150px" }} required onChange={(e) => setSaleLastQuarter(e.target.value)} value={saleLastQuarter} />
                <span className="me-2">Last Year<span className="text-danger">*</span></span>
                <input type="number" className="form-control" style={{ width: "150px" }} required  onChange={(e) => setSaleLastYear(e.target.value)} value={saleLastYear}/>
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                License Issued Under the Tripura Shops & Establishment Act
              </label>
              <div className="col-sm-7 d-flex align-items-center">
                <input type="text" className="form-control me-3" placeholder="Licence No." style={{ maxWidth: "150px" }} onChange={(e) => setShopLicenseNo(e.target.value)} value={shopLicenseNo} />
                <span className="me-2">Date</span>
                <input type="date" className="form-control" style={{ maxWidth: "200px" }} onChange={(e) => setShopIssueDate(e.target.value)} value={shopIssueDate} />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-5 col-form-label fw-bold">
                Food Staff Licence issued by the Competent Authority
              </label>
              <div className="col-sm-7 d-flex align-items-center">
                <input type="text" className="form-control me-3" placeholder="Licence No." style={{ maxWidth: "150px" }} onChange={(e) => setFoodLicenseNo(e.target.value)} value={foodLicenseNo} />
                <span className="me-2">Date</span>
                <input type="date" className="form-control" style={{ maxWidth: "200px" }} onChange={(e) => setFoodIssueDate(e.target.value)} value={foodIssueDate} />
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
                <input type="text" className="form-control d-inline-block" style={{ width: "200px" }} placeholder="Applicant Name" required onChange={(e) => setApplicantName(e.target.value)} value={applicantName} />
                &nbsp;
                <select className="form-select d-inline-block" style={{ width: "180px" }} required onChange={(e) => setRole(e.target.value)} value={role}>
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
                  <input type="text" className="form-control" placeholder="Enter your designation" required onChange={(e) => setDesignation(e.target.value)} value={designation} />
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
              <button
                type="button"
                className="btn px-4"
                style={{
                  backgroundColor: "rgb(30, 89, 168)",
                  color: "white",
                  width: "100%",
                  maxWidth: "250px",
                }}
                onClick={() => navigate("/part-b")}
              >
                Previous
              </button>

              <LoadingButton
                type="submit"
                loading={loading}
                style={{
                  backgroundColor: "#1E59A8",
                  color: "white",
                  width: "250px",
                }}
              >
                Save & Continue
              </LoadingButton>
            </div>

          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PartCForm;