import React, { useState } from "react";
import Header from "../components/Header";

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for PIN code field
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.pin.length !== 6) {
      setPinError("PIN Code is 6 Digit");
      return;
    }
    alert("Form submitted!\n" + JSON.stringify(form, null, 2));
  };

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
                <option value="VOLUNTARY">VOLUNTARY</option>
                <option value="MANDATORY">MANDATORY</option>
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
                <option value="Supdt.of Taxes,Ambassa">
                  Supdt.of Taxes,Ambassa
                </option>
                <option value="Supdt.of Taxes,Belonia">
                  Supdt.of Taxes,Belonia
                </option>
                <option value="Supdt.of Taxes,Bishalgarh">
                  Supdt.of Taxes,Bishalgarh
                </option>
                <option value="Supdt.of Taxes,Charge-I">
                  Supdt.of Taxes,Charge-I
                </option>
                <option value="Supdt.of Taxes,Charge-II">
                  Supdt.of Taxes,Charge-II
                </option>
                <option value="Supdt.of Taxes,Charge-III">
                  Supdt.of Taxes,Charge-III
                </option>
                <option value="Supdt.of Taxes,Charge-IV">
                  Supdt.of Taxes,Charge-IV
                </option>
                <option value="Supdt.of Taxes,Charge-V">
                  Supdt.of Taxes,Charge-V
                </option>
                <option value="Supdt.of Taxes,Charge-VI">
                  Supdt.of Taxes,Charge-VI
                </option>
                <option value="Supdt.of Taxes,Charge-VII">
                  Supdt.of Taxes,Charge-VII
                </option>
                <option value="Supdt.of Taxes,Charge-VIII">
                  Supdt.of Taxes,Charge-VIII
                </option>
                <option value="Supdt.of Taxes,Dharmanagar">
                  Supdt.of Taxes,Dharmanagar
                </option>
                <option value="Supdt.of Taxes,Kailashahar">
                  Supdt.of Taxes,Kailashahar
                </option>
                <option value="Supdt.of Taxes,Khowai">
                  Supdt.of Taxes,Khowai
                </option>
                <option value="Supdt.of Taxes,Sonamura">
                  Supdt.of Taxes,Sonamura
                </option>
                <option value="Supdt.of Taxes,Teliamura">
                  Supdt.of Taxes,Teliamura
                </option>
                <option value="Supdt.of Taxes,Udaipur">
                  Supdt.of Taxes,Udaipur
                </option>
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
                <option value="Proprietary">Proprietary</option>
                <option value="Unregistered Partnership">
                  Unregistered Partnership
                </option>
                <option value="Registered Partnership">
                  Registered Partnership
                </option>
                <option value="Private Limited Company">
                  Private Limited Company
                </option>
                <option value="Public Limited Company">
                  Public Limited Company
                </option>
                <option value="Public Sector Undertaking">
                  Public Sector Undertaking
                </option>
                <option value="Statutory Body">Statutory Body</option>
                <option value="Co-operative Society">
                  Co-operative Society
                </option>
                <option value="Trust">Trust</option>
                <option value="Hindu Undivided Family(HUF)">
                  Hindu Undivided Family(HUF)
                </option>
                <option value="Other">Other</option>
                <option value="Government Department">
                  Government Department
                </option>
                <option value="Association of Persons">
                  Association of Persons
                </option>
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
            <label
              className="col-12 col-md-4 col-form-label fw-bold"
              style={{ whiteSpace: "normal" }}
            >
              Father's/Mother's/Husband's Name
            </label>
            <div className="col-12 col-md-8">
              <input
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
              Date of Birth (DD/MM/YYYY)
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
              PAN
            </label>
            <div className="col-12 col-md-8">
              <input
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
              Area or Locality
            </label>
            <div className="col-12 col-md-8">
              <input
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
              Village/Town/City
            </label>
            <div className="col-12 col-md-8">
              <input
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
                <option value="Dhalai">Dhalai</option>
                <option value="Gomati">Gomati</option>
                <option value="Khowai">Khowai</option>
                <option value="North Tripura">North Tripura</option>
                <option value="Outside Tripura">Outside Tripura</option>
                <option value="Sepahijala">Sepahijala</option>
                <option value="South Tripura">South Tripura</option>
                <option value="Unakoti">Unakoti</option>
                <option value="West Tripura">West Tripura</option>
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
              Occupancy Status
            </label>
            <div className="col-12 col-md-8">
              <select
                className="form-select"
                name="occupancy"
                value={form.occupancy}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Owned">Owned</option>
                <option value="Rented">Rented</option>
                <option value="Leased">Leased</option>
                <option value="Rent-Free">Rent-Free</option>
                <option value="Others">Others</option>
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
              Mobile
            </label>
            <div className="col-12 col-md-4">
              <input
                type="text"
                className="form-control"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
              />
            </div>
            <label className="col-12 col-md-2 col-form-label fw-bold">
              Email
            </label>
            <div className="col-12 col-md-4">
              <input
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
            <button
              type="submit"
              className="btn px-4"
              style={{
                backgroundColor: "#1E59A8",
                color: "white",
                width: "250px",
              }}
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartAForm;