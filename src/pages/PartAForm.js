import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

import {
  registrationTypes,
  offices,
  businessStatuses,
  districtsByState,
  occupancies
} from "../constants/dropDowns.js";
import LoadingButton from "../components/LoadingButton";

const PartAForm = () => {
  const [form, setForm] = useState({
    registrationType: "",
    office: "",
    businessStatus: "",
    applicantName: "",
    fatherName: "",
    dob: "",
    gender: "",
    tradingName: "",
    pan: "",
    roomNo: "",
    area: "",
    city: "",
    district: "",
    pin: "",
    occupancy: "",
    telephone: "",
    mobile: "",
    fax: "",
    email: "",
  });

  const [pinError, setPinError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pin") {
      if (/^\d{0,6}$/.test(value)) {
        setForm({ ...form, pin: value });
        if (value.length === 6 || value.length === 0) {
          setPinError("");
        } else {
          setPinError("PIN Code is 6 Digit");
        }
      }
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.pin.length !== 6) {
      setPinError("PIN Code is 6 Digit");
      return;
    }

    setLoading(true);

    const payload = {
      typeOfRegistration: form.registrationType,
      office: form.office,
      businessConstitution: form.businessStatus,
      applicantName: form.applicantName,
      fathersName: form.fatherName,
      dateOfBirth: form.dob,
      gender: form.gender === "Male" ? "M" : form.gender === "Female" ? "F" : "",
      tradingName: form.tradingName,
      pan: form.pan.toUpperCase(),
      address: {
        roomNo: form.roomNo,
        area: form.area,
        village: form.city,
        district: form.district,
        pinCode: form.pin,
        occupancyStatus: form.occupancy,
      },
      contact: {
        telephone: form.telephone,
        fax: form.fax,
        email: form.email,
        mobile: form.mobile,
      }
    };

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const applicationNumber = localStorage.getItem("applicationNumber");
        const { data } = await axios.put("https://tax-nic-1y21.onrender.com/registration/part-a", {...payload, applicationNumber} ,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        )

        if(data.success) {
          alert("Part A saved successfully!");
          navigate("/part-b");
        } else {
          alert("Failed to save Part A. Please try again.");
        } 
        setLoading(false);
        return;
      }

      const { data } = await axios.post("https://tax-nic-1y21.onrender.com/registration/part-a", payload);

      if (data.success) {
        alert(`Registration Successful!\nApplication No: ${data.applicationNumber}\nPassword: ${data.password} \n Please log in to continue with your application.`);
        localStorage.setItem("applicationNumber", data.applicationNumber);
        navigate("/sign-in");
      } else {
        alert("Unexpected server response.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("An error occurred while submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
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

    try {
      const res = await axios.get(
        `https://tax-nic-1y21.onrender.com/registration/part-a?applicationNumber=${applicationNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;
      if (!data) {
        alert("No saved data found for this application.");
        return;
      }

      // Populate the form state with fetched data
      setForm({
        registrationType: data.typeOfRegistration || "",
        office: data.office || "",
        businessStatus: data.businessConstitution || "", // Not present in response, handle if needed
        applicantName: data.applicantName || "",
        fatherName: data.fathersName || "",
        dob: data.dateOfBirth || "",
        gender: data.gender === "M" ? "Male" : data.gender === "F" ? "Female" : "",
        tradingName: data.tradingName || "",
        pan: data.pan || "",

        // Address
        roomNo: data.address?.roomNo || "",
        area: data.address?.area || "",
        city: data.address?.village || "",  // Adjust if needed
        district: data.address?.district || "",
        pin: data.address?.pinCode ? String(parseInt(data.address.pinCode)) : "",
        occupancy: data.address?.occupancyStatus || "",

        // Contact
        telephone: data.contact?.telephone || "",
        mobile: data.contact?.mobile ? String(parseInt(data.contact.mobile)) : "",
        fax: data.contact?.fax || "",
        email: data.contact?.email || "",
      });

    } catch (err) {
      alert("Failed to load Part A data. Please try again.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("token");
    if(token){
      fetchData();
    }
    
  }, []);

  return (
    <div>
      <Header />
      <div className="container my-4">
        <form
          className="border p-4 rounded shadow bg-white"
          onSubmit={handleSubmit}
        >
          <div className="fw-bold text-primary text-center mb-4" style={{ fontSize: "1.5rem", letterSpacing: "0.5px" }}>
            <i className="bi bi-pencil-square me-2"></i>
            Part (A)
          </div>

          {/* Type of Registration */}
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Type of Registration<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-8">
              <select
                className="form-select"
                name="registrationType"
                value={form.registrationType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {registrationTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Select Office */}
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Select Office<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-8 d-flex align-items-center">
              <select
                className="form-select"
                name="office"
                value={form.office}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {offices.map((office) => (
                  <option key={office} value={office}>{office}</option>
                ))}
              </select>
              <a
                href="https://tripuravat.nic.in/Tripuraereg/Officesearch.aspx"
                className="ms-2"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1E59A8", fontSize: "0.9rem" }}
              >
                Click here to know your VAT Office
              </a>
            </div>
          </div>

          {/* Business Status */}
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Business Status/Constitution of Business<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-8">
              <select
                className="form-select"
                name="businessStatus"
                value={form.businessStatus}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {businessStatuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Applicant Name */}
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Name of Applicant Dealer<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                name="applicantName"
                value={form.applicantName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Father's/Mother's/Husband's Name */}
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold" style={{ whiteSpace: "normal" }}>
              Father's/Mother's/Husband's Name<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-8">
              <input
                required
                type="text"
                className="form-control"
                name="fatherName"
                value={form.fatherName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Date of Birth & Gender */}
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Date of Birth (DD/MM/YYYY)<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-4">
              <input
                type="date"
                className="form-control"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div className="col-12 col-md-4 d-flex align-items-center mt-2 mt-md-0">
              <span className="fw-bold me-2">Sex (M/F)<span style={{ color: "#dc3545" }}>*</span></span>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={form.gender === "Male"}
                onChange={handleChange}
                required
              />{" "}
              Male
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={form.gender === "Female"}
                onChange={handleChange}
                className="ms-3"
                required
              />{" "}
              Female
            </div>
          </div>

          {/* Trading Name */}
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Trading Name<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                name="tradingName"
                value={form.tradingName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* PAN */}
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              PAN<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-8">
              <input
                required
                type="text"
                className="form-control"
                name="pan"
                value={form.pan}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Business Address */}
          <hr className="my-4" />
          <h6 className="fw-bold mb-2" style={{ color: "#2282C1" }}>
            Business Address (Principal place of business)
          </h6>
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Room/Flat/Premises No.<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                name="roomNo"
                value={form.roomNo}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Area or Locality<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-8">
              <input
                required
                type="text"
                className="form-control"
                name="area"
                value={form.area}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Village/Town/City<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-8">
              <input
                required
                type="text"
                className="form-control"
                name="city"
                value={form.city}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              District<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-6 col-md-4">
              <select
                className="form-select"
                name="district"
                value={form.district}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {districtsByState.Tripura.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            <label className="col-6 col-md-2 col-form-label fw-bold mb-0">
              PIN Code<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-2">
              <input
                type="text"
                className="form-control"
                name="pin"
                value={form.pin}
                onChange={handleChange}
                maxLength={6}
                pattern="\d{6}"
                inputMode="numeric"
                autoComplete="off"
                placeholder="Enter 6-digit PIN Code"
                required
              />
              {pinError && (
                <div style={{ color: "red", fontSize: "0.95em", marginTop: 2 }}>
                  {pinError}
                </div>
              )}
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Occupancy Status<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-8">
              <select
                required
                className="form-select"
                name="occupancy"
                value={form.occupancy}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {occupancies.map((occ) => (
                  <option key={occ} value={occ}>{occ}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Instructional Note for Additional Places */}
          <div className="p-3 my-4" style={{ backgroundColor: "#E2E3E5", borderRadius: "6px", color: "#000", lineHeight: "1.5" }}>
            <i className="bi bi-info-circle-fill me-2 text-primary"></i>
            If you have more than one place of business, factory, godown, or warehouse, please fill the form for additional business places.
          </div>

          {/* Contact Details */}
          <hr className="my-4" />
          <h6 className="fw-bold mb-2" style={{ color: "#2282C1" }}>
            Contact Details
          </h6>
          <div className="mb-3 row">
            <label className="col-12 col-md-2 col-form-label fw-bold">
              Telephone
            </label>
            <div className="col-12 col-md-4">
              <input
                type="text"
                className="form-control"
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
              />
            </div>
            <label className="col-12 col-md-2 col-form-label fw-bold">
              FAX
            </label>
            <div className="col-12 col-md-4">
              <input
                type="text"
                className="form-control"
                name="fax"
                value={form.fax}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-12 col-md-2 col-form-label fw-bold">
              Mobile<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-4">
              <input
                required
                type="text"
                className="form-control"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
              />
            </div>
            <label className="col-12 col-md-2 col-form-label fw-bold">
              Email<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-4">
              <input
                required
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Save & Continue */}
          <div className="d-flex justify-content-center mt-4">
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
      <Footer />
    </div>
  );
};

export default PartAForm;