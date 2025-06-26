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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <h5 className="fw-bold mb-3" style={{ color: "#2282C1" }}>
            Part(A)
          </h5>

          {/* Type of Registration */}
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Type of Registration*
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
                <option value="COMPULSORY">COMPULSORY</option>
              </select>
            </div>
          </div>

          {/* Select Office */}
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Select Office*
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
                <option value="HeadQuarter">HeadQuarter</option>
                <option value="Branch">Branch</option>
              </select>
              <a
                href="https://vatoffice.example.com"
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
              Business Status/Constitution of Business*
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
                <option value="Partnership">Partnership</option>
                <option value="Company">Company</option>
                {/* Add more as needed */}
              </select>
            </div>
          </div>

          {/* Applicant Name */}
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Name of Applicant Dealer*
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
              <span className="fw-bold me-2">Sex (M/F)*</span>
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
              Trading Name*
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
              Room/Flat/Premises No.*
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
              District*
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
                {/* Add more districts as needed */}
              </select>
            </div>
            <label className="col-6 col-md-2 col-form-label fw-bold">
              PIN Code*
            </label>
            <div className="col-12 col-md-2">
              <input
                type="text"
                className="form-control"
                name="pin"
                value={form.pin}
                onChange={handleChange}
                required
              />
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
              </select>
            </div>
          </div>

          {/* Instructional Note for Additional Places */}
          <div className="alert alert-info my-4" style={{ fontSize: "1rem" }}>
            If you have more than one place of
            business/factory/godown/warehouse, fill up form for additional
            business places.
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
