import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingButton from "../components/LoadingButton";
import CustomTable from "../components/CustomTable";
import SuccessMessage from "../components/SuccessMessage";
import Footer from "../components/Footer";

export default function AdditionalBusinessPlaces() {
  const [formData, setFormData] = useState({
    applicantName: "",
    businessLocation: "within",
    stateAct: "",
    cstAct: "",
    branchType: "Warehouse",
    name: "",
    street: "",
    area: "",
    city: "",
    district: "West Tripura",
    state: "Tripura",
    pinCode: "",
    tel: "",
    fdrDate: ""
  });

  const [records, setRecords] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const tableColumns = [
    { key: "name", label: "Branch" },
    { key: "city", label: "City" },
    { key: "pinCode", label: "PIN" },
    { key: "branchType", label: "Type" },
    { key: "tel", label: "Phone" },
  ];

  const tableActions = [
    {
      label: "Select",
      variant: "btn-outline-primary",
      onClick: (_, index) => handleSelect(index),
    },
  ];


  const resetForm = () => {
    setFormData({
      applicantName: "",
      businessLocation: "within",
      stateAct: "",
      cstAct: "",
      branchType: "Warehouse",
      name: "",
      street: "",
      area: "",
      city: "",
      district: "West Tripura",
      state: "Tripura",
      pinCode: "",
      tel: "",
      fdrDate: ""
    });
    setSelectedIndex(null);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setRecords([...records, formData]);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 2000);
    resetForm();
  };

  const handleSelect = (index) => {
    setFormData(records[index]);
    setSelectedIndex(index);
  };

  const handleUpdate = () => {
    if (selectedIndex === null) return;
    const updated = [...records];
    updated[selectedIndex] = formData;
    setRecords(updated);
    resetForm();
  };

  const handleDelete = () => {
    if (selectedIndex === null) return;
    const updated = records.filter((_, i) => i !== selectedIndex);
    setRecords(updated);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (records.length === 0) {
      alert("Please add at least one additional business place before submitting.");
      return;
    }

    const applicationNumber = localStorage.getItem("applicationNumber");
    const token = localStorage.getItem("token");

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

    setLoading(true);

    const payload = {
      applicationNumber,
      applicantName: records[0].applicantName,
      location: records[0].businessLocation === 'within' ? 'Within State' : 'Outside State',
      registrationNo: records[0].cstAct,
      underStateAct: records[0].stateAct,
      branchType: records[0].branchType,
      name: records[0].name,
      street: records[0].street,
      area: records[0].area,
      city: records[0].city,
      district: records[0].district,
      state: records[0].state,
      pinCode: records[0].pinCode,
      telephone: records[0].tel,
      edrDate: records[0].fdrDate,
    };

    try {
      const { data } = await axios.post(
        "https://tax-nic-1y21.onrender.com/registration/additional-business-place",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        alert("Additional Business Places added successfully!");
        navigate("/business-partner-details");
      }
    } catch (error) {
      alert("Error adding additional business places. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAdditionalBusinessPlaces = async () => {
  const token = localStorage.getItem("token");
  const applicationNumber = localStorage.getItem("applicationNumber");

  if (!token) {
    alert("You are not logged in. Please log in to continue.");
    navigate("/login");
    return;
  }

  if (!applicationNumber) {
    alert("Please complete Part A first to get the application number.");
    navigate("/part-a");
    return;
  }

  try {
    const response = await axios.get(
      `https://tax-nic-1y21.onrender.com/registration/additional-business-place?applicationNumber=${applicationNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (Array.isArray(response.data)) {
      const mapped = response.data.map((item) => ({
        applicantName: item.applicantName || "",
        businessLocation: item.location === "Within State" ? "within" : "outside",
        stateAct: item.underStateAct || "",
        cstAct: item.registrationNo || "",
        branchType: item.branchType || "",
        name: item.name || "",
        street: item.street || "",
        area: item.area || "",
        city: item.city || "",
        district: item.district || "West Tripura", // fallback value
        state: item.state || "Tripura",
        pinCode: item.pinCode?.toString().replace(/\.00$/, '') || "",
        tel: item.telephone || "",
        fdrDate: item.edrDate || "",
      }));

      setRecords(mapped);
    }
  } catch (error) {
    alert("Failed to fetch additional business places. Please try again later.");
  }
};


  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAdditionalBusinessPlaces();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mt-4 mb-5">
        <div className="card shadow-lg p-4">

          {/* Form START */}
          <form onSubmit={handleAdd} ref={formRef}>
            <div className="d-flex justify-content-center align-items-center mb-3">
              <i className="bi bi-building" style={{ fontSize: "1.5rem", color: "#2282C1", marginRight: "8px" }}></i>
              <h5 className="fw-bold mb-0" style={{ color: '#2282C1' }}>Additional Business Places</h5>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label fw-bold">Applicant Name<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" name="applicantName" value={formData.applicantName} onChange={handleChange} required />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label fw-bold">
                Location of Business<span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="businessLocation"
                    value="within"
                    checked={formData.businessLocation === "within"}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label">Within State</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="businessLocation"
                    value="outside"
                    checked={formData.businessLocation === "outside"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Outside State</label>
                </div>
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label fw-bold">Registration Number of Branch</label>
              <div className="col-sm-4">
                <label className="form-label">Under State Act</label>
                <input
                  type="text"
                  className="form-control"
                  name="stateAct"
                  value={formData.stateAct}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-4">
                <label className="form-label">Under CST Act, 1956</label>
                <input
                  type="text"
                  className="form-control"
                  name="cstAct"
                  value={formData.cstAct}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="fw-bold">Branch Type</label>
                <select required className="form-select" name="branchType" value={formData.branchType} onChange={handleChange}>
                  <option>Warehouse</option>
                  <option>Godown</option>
                  <option>Branch Office</option>
                  <option>Factory</option>
                </select>
              </div>
              <div className="col">
                <label className="fw-bold">Branch Name<span className="text-danger">*</span></label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="fw-bold">Number & Street</label>
                <input type="text" className="form-control" name="street" value={formData.street} onChange={handleChange} />
              </div>
              <div className="col">
                <label className="fw-bold">Area</label>
                <input type="text" className="form-control" name="area" value={formData.area} onChange={handleChange} />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="fw-bold">City</label>
                <input required type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
              </div>
              <div className="col">
                <label className="fw-bold">District</label>
                <input required type="text" className="form-control bg-light" name="district" value={formData.district} readOnly />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="fw-bold">PIN Code<span className="text-danger">*</span></label>
                <input required type="text" className="form-control" name="pinCode" value={formData.pinCode} onChange={handleChange} />
              </div>
              <div className="col">
                <label className="fw-bold">State</label>
                <input required type="text" className="form-control bg-light" name="state" value={formData.state} readOnly />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col">
                <label className="fw-bold">Telephone</label>
                <input type="text" className="form-control" name="tel" value={formData.tel} onChange={handleChange} />
              </div>
              <div className="col">
                <label className="fw-bold">ERD Date</label>
                <input type="date" className="form-control" name="fdrDate" value={formData.fdrDate} onChange={handleChange} />
              </div>
            </div>

            <div className="d-flex justify-content-center mb-3" style={{ gap: '30px' }}>
              <button className="btn" style={{ backgroundColor: 'rgb(30, 89, 168)', color: 'white', width: '125px' }} type="submit">[+] Add</button>
              <button className="btn" style={{ backgroundColor: 'rgb(30, 89, 168)', color: 'white', width: '125px' }} type="button" disabled={selectedIndex === null} onClick={handleUpdate}>[↓] Update</button>
              <button className="btn" style={{ backgroundColor: 'rgb(30, 89, 168)', color: 'white', width: '125px' }} type="button" disabled={selectedIndex === null} onClick={handleDelete}>[X] Delete</button>
            </div>
          </form>
          {/* Form END */}

          {isSubmitted && (
            <SuccessMessage message={"Details Inserted Successfully!!"} />
          )}

          <h6 className="fw-bold mb-1 mt-3" style={{ color: 'rgb(34, 130, 193)' }}>List of Additional Business Places</h6>
          <hr className="my-1" />

          <CustomTable
            data={records}
            columns={tableColumns}
            actions={tableActions}
          />

          {/* Buttons */}
          <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
            <button
              type="button"
              className="btn px-4"
              style={{
                backgroundColor: "#1E59A8",
                color: "white",
                width: "100%",
                maxWidth: "250px",
              }}
              onClick={() => navigate("/bank-info")}
            >
              Previous
            </button>

            <LoadingButton
              type="button"
              loading={loading}
              onClick={handleSubmit}
              style={{
                backgroundColor: "#1E59A8",
                color: "white",
                width: "250px",
              }}
            >
              Save & Continue
            </LoadingButton>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}