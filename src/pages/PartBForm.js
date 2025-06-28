import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const DISTRICTS = [
  "Dhalai", "Gomati", "Khowai", "North Tripura", "Outside Tripura",
  "Sepahijala", "South Tripura", "Unakoti", "West Tripura"
];

const STATES = ["TRIPURA"];
const COUNTRIES = ["INDIA"];

const STATUTORY_AUTHORITIES = [
  "REGISTER OF COMPANIES", "OTHER"
];

const VAT_TYPES = [
  { value: "Normal VAT", label: "Normal VAT" },
  { value: "Composition Scheme", label: "Composition Scheme" }
];

const COMMODITIES = [
  "Battery water, De-mineralised water",
  // ...add more as per your backend
];

const PartBForm = () => {
  const navigate = useNavigate();

  // Example: get ackNo/otp from localStorage or context
  const ackNo = localStorage.getItem("ackNo");
  const otp = localStorage.getItem("otp");

  useEffect(() => {
    if (!ackNo || !otp) {
      navigate("/signin"); // or your ACK/OTP entry page
    }
  }, [ackNo, otp, navigate]);

  // State for form fields
  const [resi, setResi] = useState({
    street: "", city: "", district: "", state: "TRIPURA", pin: "", country: "INDIA"
  });
  const [perm, setPerm] = useState({
    street: "", city: "", district: "", state: "TRIPURA", pin: "", country: "INDIA"
  });
  const [statAuth, setStatAuth] = useState("");
  const [economic, setEconomic] = useState({
    Manufacturer: false, Trader: false, Seller: false, Reseller: false, Importer: false
  });
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
    // Validate PINs
    let resiPinErr = validatePin(resi.pin) ? "" : "PIN Code is 6 Digit";
    let permPinErr = validatePin(perm.pin) ? "" : "PIN Code is 6 Digit";
    setPinError({ resi: resiPinErr, perm: permPinErr });
    if (resiPinErr || permPinErr) return;

    // Prepare data and call backend API with ackNo
    // Example:
    // fetch(`/api/part-b/${ackNo}`, { method: "POST", ... })

    // On success:
    navigate("/part-c"); // or next step
  };

  return (
    <div>
      <Header />
      <div className="container my-4" style={{ maxWidth: 900 }}>
        <form className="border p-4 rounded shadow bg-white" onSubmit={handleSubmit}>
          <h5 className="fw-bold mb-3" style={{ color: "#2282C1" }}>Part(B)</h5>

          {/* Address Section */}
          <h6 className="fw-bold" style={{ color: "#2282C1" }}>Address</h6>
          <div className="mb-2" style={{ color: "#2282C1", fontWeight: 600 }}>Residential Address / Address for service of notice</div>
          <div className="row mb-3">
            <div className="col-md-6">
              <input className="form-control mb-2" placeholder="Number & Street" value={resi.street} onChange={e => setResi({ ...resi, street: e.target.value })} required />
              <input className="form-control mb-2" placeholder="Locality / Village / Town / City" value={resi.city} onChange={e => setResi({ ...resi, city: e.target.value })} required />
              <select className="form-select mb-2" value={resi.district} onChange={e => setResi({ ...resi, district: e.target.value })} required>
                <option value="">District</option>
                {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <input className="form-control mb-2" placeholder="PIN code" value={resi.pin}
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
              <select className="form-select mb-2" value={resi.state} onChange={e => setResi({ ...resi, state: e.target.value })} required>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select mb-2" value={resi.country} onChange={e => setResi({ ...resi, country: e.target.value })} required>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Permanent Address */}
          <div className="mb-2" style={{ color: "#2282C1", fontWeight: 600 }}>Permanent Address</div>
          <div className="row mb-3">
            <div className="col-md-6">
              <input className="form-control mb-2" placeholder="Number & Street" value={perm.street} onChange={e => setPerm({ ...perm, street: e.target.value })} required />
              <input className="form-control mb-2" placeholder="Locality / Village / Town / City" value={perm.city} onChange={e => setPerm({ ...perm, city: e.target.value })} required />
              <select className="form-select mb-2" value={perm.district} onChange={e => setPerm({ ...perm, district: e.target.value })} required>
                <option value="">District</option>
                {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <input className="form-control mb-2" placeholder="PIN code" value={perm.pin}
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
              <select className="form-select mb-2" value={perm.state} onChange={e => setPerm({ ...perm, state: e.target.value })} required>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select mb-2" value={perm.country} onChange={e => setPerm({ ...perm, country: e.target.value })} required>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Statutory Authority */}
          <div className="mb-3">
            <label className="fw-bold">Name of the Statutory Authority with whom already registered</label>
            <select className="form-select" value={statAuth} onChange={e => setStatAuth(e.target.value)} required>
              <option value="">Select</option>
              {STATUTORY_AUTHORITIES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          {/* Economic Activity */}
          <div className="mb-3">
            <label className="fw-bold">Economic Activity Code*</label>
            <div>
              {Object.keys(economic).map(key => (
                <label key={key} className="me-3">
                  <input
                    type="checkbox"
                    checked={economic[key]}
                    onChange={e => setEconomic({ ...economic, [key]: e.target.checked })}
                  />{" "}
                  {key}
                </label>
              ))}
            </div>
          </div>

          {/* Commodity Section */}
          <div className="mb-3">
            <label className="fw-bold">Major Commodity Traded / Manufactured / You deal / Propose to deal</label>
            <div className="row">
              <div className="col-md-6">
                <select className="form-select mb-2" value={commodity} onChange={e => setCommodity(e.target.value)}>
                  <option value="">Select Commodity</option>
                  {COMMODITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <input className="form-control mb-2" placeholder="Dealer's description of commodity" value={commodityDesc} onChange={e => setCommodityDesc(e.target.value)} />
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
          <div className="mb-3 row">
            <div className="col-md-4">
              <label className="fw-bold">Date of first Taxable Sale (DD/MM/YYYY)*</label>
              <input type="date" className="form-control" value={taxDate} onChange={e => setTaxDate(e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label className="fw-bold">Do you wish to register for VAT, Composition Scheme (COT)..?*</label>
              <select className="form-select" value={vatType} onChange={e => setVatType(e.target.value)} required>
                <option value="">Select</option>
                {VAT_TYPES.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
              </select>
            </div>
            <div className="col-md-4">
              <label className="fw-bold">Turnover estimated for 12 months/Quarters*</label>
              <input type="number" className="form-control" value={turnover} onChange={e => setTurnover(e.target.value)} required />
            </div>
          </div>

          {/* Frequency of filing returns */}
          <div className="mb-3">
            <label className="fw-bold">Frequency of filing returns</label>
            <div>
              <label className="me-3">
                <input type="radio" name="returnFreq" value="Monthly" checked={returnFreq === "Monthly"} onChange={e => setReturnFreq(e.target.value)} /> Monthly
              </label>
              <label>
                <input type="radio" name="returnFreq" value="Quarterly" checked={returnFreq === "Quarterly"} onChange={e => setReturnFreq(e.target.value)} /> Quarterly
              </label>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/part-a")}>Prev</button>
            <button type="submit" className="btn btn-primary">Save & Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartBForm;
