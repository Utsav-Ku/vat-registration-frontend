import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const DISTRICTS = [
  "Dhalai", "Gomati", "Khowai", "North Tripura", "Outside Tripura",
  "Sepahijala", "South Tripura", "Unakoti", "West Tripura"
];

const STATUTORY_AUTHORITIES = [
  "REGISTER OF COMPANIES", "OTHER"
];

const VAT_TYPES = [
  { value: "Normal VAT", label: "Normal VAT" },
  { value: "Composition Scheme", label: "Composition Scheme" }
];

const COMMODITIES = [
  "Battery water, De-mineralised water",
  "Agricultural products",
  "Textiles and garments", 
  "Electronics and electrical goods",
  "Furniture and fixtures",
  "Pharmaceuticals and medicines",
  "Construction materials",
  "Food and beverages"
];

const ECONOMIC_ACTIVITIES = [
  "Manufacturer", "Trader", "Seller", "Reseller", "Importer"
];

const PartBForm = () => {
  const navigate = useNavigate();

  // Form state management
  const [formData, setFormData] = useState({
    resi: {
      street: "",
      city: "",
      district: "",
      pin: "",
      state: "TRIPURA",
      country: "INDIA"
    },
    perm: {
      street: "",
      city: "",
      district: "",
      pin: "",
      state: "TRIPURA", 
      country: "INDIA"
    },
    statAuth: "",
    economic: {},
    commodity: "",
    commodityDesc: "",
    commodityList: [],
    taxDate: "",
    vatType: "",
    turnover: "",
    returnFreq: "Monthly"
  });

  const [pinError, setPinError] = useState({ resi: "", perm: "" });

  // PIN validation function
  const validatePin = (pin) => /^\d{6}$/.test(pin);

  // Handle form field changes
  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle PIN input with validation
  const handlePinChange = (type, value) => {
    if (!/^\d{0,6}$/.test(value)) return;
    
    handleInputChange(type, "pin", value);
    
    const errorMsg = value.length > 0 && value.length !== 6 ? "PIN Code is 6 Digit" : "";
    setPinError(prev => ({ ...prev, [type]: errorMsg }));
  };

  // Handle economic activity checkbox changes
  const handleEconomicChange = (activity, checked) => {
    setFormData(prev => ({
      ...prev,
      economic: {
        ...prev.economic,
        [activity]: checked
      }
    }));
  };

  // Add commodity to list
  const handleAddCommodity = () => {
    if (!formData.commodity || !formData.commodityDesc) return;
    
    setFormData(prev => ({
      ...prev,
      commodityList: [
        ...prev.commodityList,
        { 
          commodity: prev.commodity, 
          description: prev.commodityDesc 
        }
      ],
      commodity: "",
      commodityDesc: ""
    }));
  };

  // Remove commodity from list
  const handleRemoveCommodity = (index) => {
    setFormData(prev => ({
      ...prev,
      commodityList: prev.commodityList.filter((_, i) => i !== index)
    }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate PIN codes
    const resiPinValid = validatePin(formData.resi.pin);
    const permPinValid = validatePin(formData.perm.pin);
    
    if (!resiPinValid || !permPinValid) {
      setPinError({
        resi: resiPinValid ? "" : "PIN Code is 6 Digit",
        perm: permPinValid ? "" : "PIN Code is 6 Digit"
      });
      return;
    }
    
    // Clear errors and proceed
    setPinError({ resi: "", perm: "" });
    
    // Save form data (integrate with your backend API here)
    console.log("Part B Form Data:", formData);
    
    // Navigate to next step
    navigate("/part-c");
  };

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <Header />
      <div className="container my-4">
        <div 
          className="border rounded shadow bg-white p-5" 
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          {/* Form Header */}
          <h5 className="fw-bold mb-3 text-center" style={{ color: "#2282C1" }}>
            Part (B)
          </h5>
          
          {/* HR after header */}
          <hr className="mb-4" />
          
          <form onSubmit={handleSubmit}>
            {/* Address Section */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3" style={{ color: "#2282C1" }}>Address</h6>
              <hr className="mb-3" />
              
              {/* Residential Address */}
              <div className="mb-4">
                <div className="fw-bold mb-3" style={{ color: "#2282C1" }}>
                  Residential Address / Address for service of notice
                </div>
                <hr className="mb-3" />
                
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label className="form-label fw-bold">Number & Street</label>
                  </div>
                  <div className="col-md-9">
                    <input 
                      type="text"
                      className="form-control"
                      value={formData.resi.street}
                      onChange={(e) => handleInputChange("resi", "street", e.target.value)}
                      placeholder="ROAD 12"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-3">
                    <label className="form-label fw-bold">Locality/ Village/ Town/ City</label>
                  </div>
                  <div className="col-md-9">
                    <input 
                      type="text"
                      className="form-control"
                      value={formData.resi.city}
                      onChange={(e) => handleInputChange("resi", "city", e.target.value)}
                      placeholder="AGARTALA"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3 align-items-end">
                  <div className="col-md-2">
                    <label className="form-label fw-bold">District</label>
                    <select 
                      className="form-select"
                      value={formData.resi.district}
                      onChange={(e) => handleInputChange("resi", "district", e.target.value)}
                      required
                    >
                      <option value="">WEST TRIPURA</option>
                      {DISTRICTS.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label fw-bold">State</label>
                    <select 
                      className="form-select"
                      value={formData.resi.state}
                      onChange={(e) => handleInputChange("resi", "state", e.target.value)}
                      required
                    >
                      <option value="TRIPURA">TRIPURA</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label fw-bold">PIN Code</label>
                    <input 
                      type="text"
                      className="form-control"
                      value={formData.resi.pin}
                      onChange={(e) => handlePinChange("resi", e.target.value)}
                      maxLength={6}
                      placeholder="799001"
                      required
                    />
                    {pinError.resi && (
                      <div className="text-danger small mt-1">{pinError.resi}</div>
                    )}
                  </div>
                  <div className="col-md-2">
                    <label className="form-label fw-bold">Country</label>
                    <select 
                      className="form-select"
                      value={formData.resi.country}
                      onChange={(e) => handleInputChange("resi", "country", e.target.value)}
                      required
                    >
                      <option value="INDIA">INDIA</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Permanent Address */}
              <div className="mb-4">
                <div className="fw-bold mb-3" style={{ color: "#2282C1" }}>
                  Permanent Address
                </div>
                <hr className="mb-3" />
                
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label className="form-label fw-bold">Number & Street</label>
                  </div>
                  <div className="col-md-9">
                    <input 
                      type="text"
                      className="form-control"
                      value={formData.perm.street}
                      onChange={(e) => handleInputChange("perm", "street", e.target.value)}
                      placeholder="ROAD 12"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-3">
                    <label className="form-label fw-bold">Locality/ Village/ Town/ City</label>
                  </div>
                  <div className="col-md-9">
                    <input 
                      type="text"
                      className="form-control"
                      value={formData.perm.city}
                      onChange={(e) => handleInputChange("perm", "city", e.target.value)}
                      placeholder="AGARTALA"
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3 align-items-end">
                  <div className="col-md-2">
                    <label className="form-label fw-bold">District</label>
                    <select 
                      className="form-select"
                      value={formData.perm.district}
                      onChange={(e) => handleInputChange("perm", "district", e.target.value)}
                      required
                    >
                      <option value="">WEST TRIPURA</option>
                      {DISTRICTS.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label fw-bold">State</label>
                    <select 
                      className="form-select"
                      value={formData.perm.state}
                      onChange={(e) => handleInputChange("perm", "state", e.target.value)}
                      required
                    >
                      <option value="TRIPURA">TRIPURA</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label fw-bold">PIN Code</label>
                    <input 
                      type="text"
                      className="form-control"
                      value={formData.perm.pin}
                      onChange={(e) => handlePinChange("perm", e.target.value)}
                      maxLength={6}
                      placeholder="799001"
                      required
                    />
                    {pinError.perm && (
                      <div className="text-danger small mt-1">{pinError.perm}</div>
                    )}
                  </div>
                  <div className="col-md-2">
                    <label className="form-label fw-bold">Country</label>
                    <select 
                      className="form-select"
                      value={formData.perm.country}
                      onChange={(e) => handleInputChange("perm", "country", e.target.value)}
                      required
                    >
                      <option value="INDIA">INDIA</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Statutory Authority */}
            <div className="row mb-4">
              <div className="col-md-4">
                <label className="form-label fw-bold">
                  Name of the Statutory Authority with whom already registered
                </label>
              </div>
              <div className="col-md-8">
                <select 
                  className="form-select"
                  value={formData.statAuth}
                  onChange={(e) => setFormData(prev => ({ ...prev, statAuth: e.target.value }))}
                >
                  <option value="">REGISTER OF COMPANIES</option>
                  {STATUTORY_AUTHORITIES.map(auth => (
                    <option key={auth} value={auth}>{auth}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Economic Activity */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3" style={{ color: "#2282C1" }}>
                Economic Activity Code<span style={{ color: "red" }}>*</span>
              </h6>
              <hr className="mb-3" />
              <div className="d-flex flex-wrap gap-4">
                {ECONOMIC_ACTIVITIES.map(activity => (
                  <label key={activity} className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      className="me-2"
                      style={{ accentColor: "#2282C1" }}
                      checked={!!formData.economic[activity]}
                      onChange={(e) => handleEconomicChange(activity, e.target.checked)}
                    />
                    <span style={{ color: "#2282C1", fontWeight: "500" }}>{activity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Major Commodity */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3" style={{ color: "#2282C1" }}>
                Major Commodity Traded / Manufactured / You deal / Propose to deal
              </h6>
              <hr className="mb-3" />
              
              {/* Commodity selection in same row */}
              <div className="row mb-3 align-items-end">
                <div className="col-md-4">
                  <label className="form-label fw-bold">Select Commodity</label>
                  <select 
                    className="form-select"
                    value={formData.commodity}
                    onChange={(e) => setFormData(prev => ({ ...prev, commodity: e.target.value }))}
                    style={{ fontSize: "0.9rem" }}
                  >
                    <option value="">Battery water, De-mineralised water</option>
                    {COMMODITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Dealer's description of commodity</label>
                  <textarea 
                    className="form-control"
                    rows={2}
                    placeholder="DEALER'S DESCRIPTION OF COMMODITY"
                    value={formData.commodityDesc}
                    onChange={(e) => setFormData(prev => ({ ...prev, commodityDesc: e.target.value }))}
                    style={{ fontSize: "0.9rem" }}
                  />
                </div>
                <div className="col-md-2">
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleAddCommodity}
                    style={{ backgroundColor: "#1E59A8", width: "100%", height: "38px" }}
                  >
                    [+] Add
                  </button>
                </div>
              </div>

              {formData.commodityList.length > 0 && (
                <div className="mb-3">
                  <ul className="list-group">
                    {formData.commodityList.map((item, idx) => (
                      <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                        <span><strong>{item.commodity}</strong> - {item.description}</span>
                        <button 
                          type="button" 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleRemoveCommodity(idx)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Tax Registration Details */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">
                  Date of first Taxable Sale (DD/MM/YYYY)<span style={{ color: "red" }}>*</span>
                </label>
              </div>
              <div className="col-md-8">
                <input 
                  type="date"
                  className="form-control"
                  value={formData.taxDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, taxDate: e.target.value }))}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">
                  Do you wish to register for VAT, Composition Scheme (COT)..?<span style={{ color: "red" }}>*</span>
                </label>
              </div>
              <div className="col-md-8">
                <select 
                  className="form-select"
                  value={formData.vatType}
                  onChange={(e) => setFormData(prev => ({ ...prev, vatType: e.target.value }))}
                  required
                >
                  <option value="">Normal VAT</option>
                  {VAT_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">
                  Turnover estimated for 12 months/Quarters<span style={{ color: "red" }}>*</span>
                </label>
              </div>
              <div className="col-md-8">
                <input 
                  type="number"
                  className="form-control"
                  placeholder="12000"
                  value={formData.turnover}
                  onChange={(e) => setFormData(prev => ({ ...prev, turnover: e.target.value }))}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-4">
                <label className="form-label fw-bold">Frequency of filing returns</label>
              </div>
              <div className="col-md-8">
                <div>
                  <label className="me-4">
                    <input 
                      type="radio"
                      name="returnFreq"
                      value="Monthly"
                      checked={formData.returnFreq === "Monthly"}
                      onChange={(e) => setFormData(prev => ({ ...prev, returnFreq: e.target.value }))}
                      className="me-2"
                      style={{ accentColor: "#2282C1" }}
                    />
                    Monthly
                  </label>
                  <label>
                    <input 
                      type="radio"
                      name="returnFreq"
                      value="Quarterly"
                      checked={formData.returnFreq === "Quarterly"}
                      onChange={(e) => setFormData(prev => ({ ...prev, returnFreq: e.target.value }))}
                      className="me-2"
                      style={{ accentColor: "#2282C1" }}
                    />
                    Quarterly
                  </label>
                </div>
              </div>
            </div>

            {/* Navigation Buttons - BOTH SAME COLOR */}
            <div className="d-flex justify-content-between">
              <button 
                type="button" 
                className="btn px-4"
                onClick={() => navigate("/part-a")}
                style={{ backgroundColor: "#1E59A8", color: "white" }}
              >
                Prev
              </button>
              <button 
                type="submit" 
                className="btn px-4"
                style={{ backgroundColor: "#1E59A8", color: "white" }}
              >
                Save & Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartBForm;
