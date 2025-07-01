import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity(); 
      return;
    }
    navigate("/business-partner-details");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-4 mb-5">
        <div className="card shadow-lg p-4">
          <form onSubmit={handleAdd}>
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
              <label className="col-sm-3 col-form-label fw-bold">Location of Business</label>
              <div className="col-sm-9">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="businessLocation" value="within" checked={formData.businessLocation === "within"} onChange={handleChange} />
                  <label className="form-check-label">Within State</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="businessLocation" value="outside" checked={formData.businessLocation === "outside"} onChange={handleChange} />
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
                <select className="form-select" name="branchType" value={formData.branchType} onChange={handleChange}>
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
                <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
              </div>
              <div className="col">
                <label className="fw-bold">District</label>
                <input type="text" className="form-control bg-light" name="district" value={formData.district} readOnly />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="fw-bold">PIN Code<span className="text-danger">*</span></label>
                <input type="text" className="form-control" name="pinCode" value={formData.pinCode} onChange={handleChange} required />
              </div>
              <div className="col">
                <label className="fw-bold">State</label>
                <input type="text" className="form-control bg-light" name="state" value={formData.state} readOnly />
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

            {isSubmitted && (
              <div className="text-center fw-bold py-2 mt-2 mx-auto" style={{ backgroundColor: '#ffffcc', border: '1px solid #cccc00', color: '#000', maxWidth: '400px', borderRadius: '4px' }}>
                ✅ Business Place Added Successfully !!
              </div>
            )}
          </form>

          <h6 className="fw-bold mb-1 mt-3" style={{ color: 'rgb(34, 130, 193)' }}>List of Additional Business Places</h6>
          <hr className="my-1" />

          {records.length === 0 ? (
            <div className="p-3 text-center text-muted fade-in mt-4" style={{ backgroundColor: 'rgb(248, 249, 250)', borderRadius: '6px' }}>
              No Additional Business Places Added Yet.
            </div>
          ) : (
            <table className="table table-bordered mt-4 fade-in">
              <thead className="table-primary text-center">
                <tr>
                  <th>Select</th>
                  <th>Branch</th>
                  <th>City</th>
                  <th>PIN</th>
                  <th>Type</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec, i) => (
                  <tr key={i} className="text-center align-middle">
                    <td><button className="btn btn-outline-primary btn-sm" onClick={() => handleSelect(i)}>Select</button></td>
                    <td>{rec.name}</td>
                    <td>{rec.city}</td>
                    <td>{rec.pinCode}</td>
                    <td>{rec.branchType}</td>
                    <td>{rec.tel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="d-flex justify-content-center mt-4" style={{ gap: '30px' }}>
            <button className="btn px-4" style={{ backgroundColor: 'rgb(30, 89, 168)', color: 'white', width: '250px' }} onClick={() => navigate('/bank-info')}>Previous</button>
            <button className="btn px-4" style={{ backgroundColor: 'rgb(30, 89, 168)', color: 'white', width: '250px' }} onClick={handleSubmit}>Save & Continue</button>
          </div>
        </div>
      </div>
    </>
  );
}