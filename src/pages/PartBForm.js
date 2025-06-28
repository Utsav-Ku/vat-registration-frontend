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
  // Add more as needed
];

const STATES = ["TRIPURA"];
const COUNTRIES = ["INDIA"];

const ECONOMIC_ACTIVITIES = [
  "Manufacturer", "Trader", "Seller", "Reseller", "Importer"
];

const PartBForm = () => {
  const navigate = useNavigate();

  // Address states
  const [resi, setResi] = useState({
    street: "", city: "", district: "", state: "TRIPURA", pin: "", country: "INDIA"
  });
  const [perm, setPerm] = useState({
    street: "", city: "", district: "", state: "TRIPURA", pin: "", country: "INDIA"
  });

  // Other states
  const [statAuth, setStatAuth] = useState("");
  const [economic, setEconomic] = useState({});
  const [commodity, setCommodity] = useState("");
  const [commodityDesc, setCommodityDesc] = useState("");
  const [commodityList, setCommodityList] = useState([]);
  const [taxDate, setTaxDate] = useState("");
  const [vatType, setVatType] = useState("");
  const [turnover, setTurnover] = useState("");
  const [returnFreq, setReturnFreq] = useState("Monthly");
  const [pinError, setPinError] = useState({ resi: "", perm: "" });

  // PIN validation
  const validatePin = (pin) => /^\d{6}$/.test(pin);

  // Add commodity
  const handleAddCommodity = () => {
    if (commodity && commodityDesc) {
      setCommodityList([...commodityList, { commodity, commodityDesc }]);
      setCommodity(""); setCommodityDesc("");
    }
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let resiPinErr = validatePin(resi.pin) ? "" : "PIN Code is 6 Digit";
    let permPinErr = validatePin(perm.pin) ? "" : "PIN Code is 6 Digit";
    setPinError({ resi: resiPinErr, perm: permPinErr });
    if (resiPinErr || permPinErr) return;
    // TODO: Save data and navigate
    navigate("/part-c");
  };

  // For blue section headings
  const sectionHeadingStyle = {
    color: "#2282C1",
    fontWeight: 700,
    fontSize: "1.05rem"
  };

  // For blue label
  const blueLabel = { color: "#2282C1", fontWeight: 700 };

  return (
    <div style={{ background: "#f7faff", minHeight: "100vh" }}>
      <Header />
      <div className="container" style={{ maxWidth: 900, background: "#fff", marginTop: 24, borderRadius: 8, boxShadow: "0 0 8px #ddd" }}>
        <form className="p-4" onSubmit={handleSubmit}>
          <h5 className="fw-bold mb-3" style={{ color: "#2282C1" }}>Part(B)</h5>
          <hr />

          {/* Address Section */}
          <div className="mb-2" style={sectionHeadingStyle}>Address</div>
          <div className="mb-2" style={blueLabel}>Residential Address / Address for service of notice</div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Number & Street</label>
              <input className="form-control mb-2" value={resi.street} onChange={e => setResi({ ...resi, street: e.target.value })} required />
              <label className="form-label fw-bold">Locality/ Village/ Town/ City</label>
              <input className="form-control mb-2" value={resi.city} onChange={e => setResi({ ...resi, city: e.target.value })} required />
              <label className="form-label fw-bold">District</label>
              <select className="form-select mb-2" value={resi.district} onChange={e => setResi({ ...resi, district: e.target.value })} required>
                <option value="">Select</option>
                {DISTRICTS.map(d => <option key={d} value={d}>{d.toUpperCase()}</option>)}
              </select>
              <label className="form-label fw-bold">PIN code</label>
              <input className="form-control mb-2" value={resi.pin}
                onChange={e => {
                  const val = e.target.value;
                  if (/^\d{0,6}$/.test(val)) setResi({ ...resi, pin: val });
                }}
                maxLength={6}
                required
              />
              {pinError.resi && <div style={{ color: "red", fontSize: "0.95em" }}>{pinError.resi}</div>}
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">State</label>
              <select className="form-select mb-2" value={resi.state} onChange={e => setResi({ ...resi, state: e.target.value })} required>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Country</label>
              <select className="form-select mb-2" value={resi.country} onChange={e => setResi({ ...resi, country: e.target.value })} required>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Permanent Address */}
          <div className="mb-2" style={blueLabel}>Permanent Address</div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Number & Street</label>
              <input className="form-control mb-2" value={perm.street} onChange={e => setPerm({ ...perm, street: e.target.value })} required />
              <label className="form-label fw-bold">Locality/ Village/ Town/ City</label>
              <input className="form-control mb-2" value={perm.city} onChange={e => setPerm({ ...perm, city: e.target.value })} required />
              <label className="form-label fw-bold">District</label>
              <select className="form-select mb-2" value={perm.district} onChange={e => setPerm({ ...perm, district: e.target.value })} required>
                <option value="">Select</option>
                {DISTRICTS.map(d => <option key={d} value={d}>{d.toUpperCase()}</option>)}
              </select>
              <label className="form-label fw-bold">PIN code</label>
              <input className="form-control mb-2" value={perm.pin}
                onChange={e => {
                  const val = e.target.value;
                  if (/^\d{0,6}$/.test(val)) setPerm({ ...perm, pin: val });
                }}
                maxLength={6}
                required
              />
              {pinError.perm && <div style={{ color: "red", fontSize: "0.95em" }}>{pinError.perm}</div>}
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">State</label>
              <select className="form-select mb-2" value={perm.state} onChange={e => setPerm({ ...perm, state: e.target.value })} required>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Country</label>
              <select className="form-select mb-2" value={perm.country} onChange={e => setPerm({ ...perm, country: e.target.value })} required>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Statutory Authority */}
          <div className="mb-3">
            <label className="form-label fw-bold">Name of the Statutory Authority with whom already registered</label>
            <select className="form-select" value={statAuth} onChange={e => setStatAuth(e.target.value)} required>
              <option value="">Select</option>
              {STATUTORY_AUTHORITIES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          {/* Economic Activity */}
          <div className="mb-3">
            <label className="form-label fw-bold">Economic Activity Code<span style={{ color: "#2282C1" }}>*</span></label>
            <div>
              {ECONOMIC_ACTIVITIES.map(key => (
                <label key={key} className="me-3" style={{ fontWeight: 500, color: "#2282C1" }}>
                  <input
                    type="checkbox"
                    checked={!!economic[key]}
                    onChange={e => setEconomic({ ...economic, [key]: e.target.checked })}
                    style={{ accentColor: "#2282C1", marginRight: 4 }}
                  />
                  {key}
                </label>
              ))}
            </div>
          </div>

          {/* Major Commodity */}
          <div className="mb-3">
            <div style={sectionHeadingStyle}>Major Commodity Traded / Manufactured / You deal / Propose to deal</div>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label fw-bold">Select Commodity</label>
                <select className="form-select mb-2" value={commodity} onChange={e => setCommodity(e.target.value)}>
                  <option value="">Select Commodity</option>
                  {COMMODITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Dealer's description of commodity</label>
                <textarea className="form-control mb-2" value={commodityDesc} onChange={e => setCommodityDesc(e.target.value)} />
              </div>
            </div>
            <button type="button" className="btn btn-primary btn-sm" onClick={handleAddCommodity}>[+] Add</button>
            <ul>
              {commodityList.map((item, idx) => (
                <li key={idx}>{item.commodity} - {item.commodityDesc}</li>
              ))}
            </ul>
          </div>

          {/* Tax Details */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label fw-bold">Date of first Taxable Sale (DD/MM/YYYY)<span style={{ color: "red" }}>*</span></label>
              <input type="date" className="form-control" value={taxDate} onChange={e => setTaxDate(e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Do you wish to register for VAT, Composition Scheme (COT)..?<span style={{ color: "red" }}>*</span></label>
              <select className="form-select" value={vatType} onChange={e => setVatType(e.target.value)} required>
                <option value="">Select</option>
                {VAT_TYPES.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Turnover estimated for 12 months/Quarters<span style={{ color: "red" }}>*</span></label>
              <input type="number" className="form-control" value={turnover} onChange={e => setTurnover(e.target.value)} required />
            </div>
          </div>

          {/* Frequency of filing returns */}
          <div className="mb-3">
            <label className="form-label fw-bold">Frequency of filing returns</label>
            <div>
              <label className="me-3">
                <input type="radio" name="returnFreq" value="Monthly" checked={returnFreq === "Monthly"} onChange={e => setReturnFreq(e.target.value)} style={{ accentColor: "#2282C1" }} /> Monthly
              </label>
              <label>
                <input type="radio" name="returnFreq" value="Quarterly" checked={returnFreq === "Quarterly"} onChange={e => setReturnFreq(e.target.value)} style={{ accentColor: "#2282C1" }} /> Quarterly
              </label>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn btn-outline-primary px-4" onClick={() => navigate("/part-a")}>Prev</button>
            <button type="submit" className="btn btn-primary px-4">Save & Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartBForm;
