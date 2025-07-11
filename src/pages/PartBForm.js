import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  states,
  districtsByState,
  statutoryAuthorities,
  commodities,
} from "../contants/dropdowns.js";
import Header from "../components/Header.js";
import axios from "axios";

const PartBForm = () => {
  const navigate = useNavigate();

  const [resStreet, setResStreet] = useState("");
  const [resCity, setResCity] = useState("");
  const [resDistrict, setResDistrict] = useState("WEST TRIPURA");
  const [resState, setResState] = useState("TRIPURA");
  const [resPincode, setResPincode] = useState("");
  const [resCountry, setResCountry] = useState("INDIA");

  const [permStreet, setPermStreet] = useState("");
  const [permCity, setPermCity] = useState("");
  const [permDistrict, setPermDistrict] = useState("WEST TRIPURA");
  const [permState, setPermState] = useState("TRIPURA");
  const [permPincode, setPermPincode] = useState("");
  const [permCountry, setPermCountry] = useState("INDIA");

  const [authority, setAuthority] = useState("REGISTER OF COMPANIES");
  const [econActivity, setEconActivity] = useState("");
  const [commodity, setCommodity] = useState("");
  const [commodityDesc, setCommodityDesc] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [vatType, setVatType] = useState("Normal VAT");
  const [turnover, setTurnover] = useState("");
  const [returnFreq, setReturnFreq] = useState("Monthly");

  const [commodityTable, setCommodityTable] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const applicationNumber = localStorage.getItem("applicationNumber") || "202400461707";

    if (!token) {
      alert("Authorization token missing. Please log in again.");
      setLoading(false);
      return;
    }

    const payload = {
      applicationNumber,
      residentialAddress: {
        street: resStreet.trim(),
        city: resCity.trim(),
        district: resDistrict,
        state: resState,
        country: resCountry,
        pinCode: resPincode
      },
      permanentAddress: {
        street: permStreet.trim(),
        city: permCity.trim(),
        district: permDistrict,
        state: permState,
        country: permCountry,
        pinCode: permPincode
      },
      statutoryAuthority: authority,
      economicActivity: {
        activityCode: "001",
        roles: [econActivity]
      },
      commodity: commodityTable.length > 0
        ? {
            name: commodityTable[0].name,
            description: commodityTable[0].desc
          }
        : {
            name: "",
            description: ""
          },
      firstTaxableSaleDate: saleDate,
      vatOption: vatType,
      estimatedTurnover: parseFloat(turnover),
      filingFrequency: returnFreq
    };

    console.log("Final Payload:", JSON.stringify(payload, null, 2));

    try {
      const { data } = await axios.post(
        "https://tax-nic-1y21.onrender.com/registration/part-b",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (data.success) {
        alert("Form submitted successfully!");
        navigate("/part-c");
      } else {
        alert(data.message || "Failed to submit Part B.");
      }
    } catch (error) {
      console.error("Submission error:", error.message);
      alert("An error occurred while submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCommodity = () => {

    if (!commodity || !commodityDesc) {
      alert("Please select a commodity and enter its description.");
      return;
    }
    const newCommodity = {
      act: "VAT",
      code:
        commodity === "Battery water, De-mineralised water"
          ? "218601"
          : "608600",
      name: commodity,
      desc: commodityDesc,
    };
    setCommodityTable((prev) => [...prev, newCommodity]);
    setCommodity("");
    setCommodityDesc("");
    setSuccessMessage("Commodity Inserted !");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const fetchData = async () => {
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
    const { data } = await axios.get(
      `https://tax-nic-1y21.onrender.com/registration/part-b?applicationNumber=${applicationNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    const dealer = data?.dealer;
      if (!dealer) return;

      //Commodity
      setCommodityDesc(dealer.commodityDescription);
      setCommodity(dealer.commodityName || "");

      // Statutory Authority
      setAuthority(dealer.regCentralExcise || "REGISTER OF COMPANIES");

      // Economic Activity
      setEconActivity(dealer.activityCode || "");

      const mapDistrictCodeToName = (code) => {
        const map = {
          1: "Dhalai",
          2: "Gomati",
          3: "Khowai",
          4: "North Tripura",
          5: "Sepahijala",
          6: "South Tripura",
          7: "Unakoti",
          8: "West Tripura",
        };
        return map[code] || "";
      };

      const branchAddresses = data?.branchAddresses;

      if (Array.isArray(branchAddresses)) {
        // Residential Address from first object
        const res = branchAddresses[0] || {};
        setResStreet(res.addr1 || "");
        setResCity(res.place || "");
        setResDistrict(res.distCd || "");
        setResState(res.stCode || "");
        setResPincode(res.pin?.toString() || "");
        setResDistrict(mapDistrictCodeToName(res.distCd));

        // Permanent Address from second object
        const perm = branchAddresses[1] || {};
        setPermStreet(perm.addr1 || "");
        setPermCity(perm.place || "");
        setPermDistrict(perm.distCd || "");
        setPermState(perm.stCode || "");
        setPermPincode(perm.pin?.toString() || "");
        setPermDistrict(mapDistrictCodeToName(perm.distCd));
      }

      

      // Commodity
      if (dealer.commodityName && dealer.commodityDescription) {
        setCommodityTable([
          {
            act: "VAT",
            code:
              dealer.commodityName ===
              "Battery water, De-mineralised water"
                ? "218601"
                : "608600",
            name: dealer.commodityName,
            desc: dealer.commodityDescription,
          },
        ]);
      }

      // Sale date
      setSaleDate(dealer.firstTaxableSaleDate || "");

      // VAT Option
      setVatType(dealer.vatOption || "Normal VAT");

      // Estimated Turnover
      setTurnover(String(dealer.estimatedTurnover || ""));

      // Filing Frequency
      setReturnFreq(dealer.filingFrequency || "Monthly");
    } catch (error) {
      console.error("Error fetching Part B data:", error.message);
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="container my-4">
        <form
          className="border p-4 rounded shadow bg-white"
          onSubmit={handleSubmit}
        >
          <div
            className="fw-bold text-primary text-center mb-4"
            style={{ fontSize: "1.5rem", letterSpacing: "0.5px" }}
          >
            <i className="bi bi-pencil-square me-2"></i>
            Part (B)
          </div>

          <h6 className="fw-bold mb-2" style={{ color: "#2282C1" }}>
            Residential Address / Address for service of notice
          </h6>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Number & Street
            </label>
            <div className="col-12 col-md-8">
              <input
                required
                type="text"
                className="form-control"
                value={resStreet}
                onChange={(e) => setResStreet(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Locality/ Village/ Town/ City
            </label>
            <div className="col-12 col-md-8">
              <input
                required
                type="text"
                className="form-control"
                value={resCity}
                onChange={(e) => setResCity(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              State
            </label>
            <div className="col-12 col-md-8">
              <select
                required
                className="form-select"
                value={resState}
                onChange={(e) => {
                  setResState(e.target.value);
                  setResDistrict("");
                }}
                style={{ backgroundColor: "#f0f0f0" }}
              >
                <option value="">Select</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              District
            </label>
            <div className="col-12 col-md-8">
              <select
                required
                className="form-select"
                value={resDistrict}
                onChange={(e) => setResDistrict(e.target.value)}
                style={{ backgroundColor: "#f0f0f0" }}
              >
                <option value="">Select</option>
                {resState &&
                  districtsByState[resState]?.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              PIN code
            </label>
            <div className="col-12 col-md-8">
              <input
                required
                type="text"
                className="form-control"
                value={resPincode}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d{0,6}$/.test(input)) {
                    setResPincode(input);
                  }
                }}
                maxLength="6"
                pattern="\d{6}"
                title="PIN code must be exactly 6 digits"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Country
            </label>
            <div className="col-12 col-md-8">
              <select
                required
                className="form-select"
                value="India"
                disabled
                style={{ backgroundColor: "#f0f0f0" }}
              >
                <option value="India">India</option>
              </select>
            </div>
          </div>

          <hr className="my-4" />
          <h6 className="fw-bold mb-2" style={{ color: "#2282C1" }}>
            Permanent Address
          </h6>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Number & Street
            </label>
            <div className="col-12 col-md-8">
              <input
                required
                type="text"
                className="form-control"
                value={permStreet}
                onChange={(e) => setPermStreet(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Locality/ Village/ Town/ City
            </label>
            <div className="col-12 col-md-8">
              <input
                required
                type="text"
                className="form-control"
                value={permCity}
                onChange={(e) => setPermCity(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              State
            </label>
            <div className="col-12 col-md-8">
              <select
                required
                className="form-select"
                value={permState}
                onChange={(e) => {
                  setPermState(e.target.value);
                  setPermDistrict("");
                }}
                style={{ backgroundColor: "#f0f0f0" }}
              >
                <option value="">Select</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              District
            </label>
            <div className="col-12 col-md-8">
              <select
                required
                className="form-select"
                value={permDistrict}
                onChange={(e) => setPermDistrict(e.target.value)}
                style={{ backgroundColor: "#f0f0f0" }}
              >
                <option value="">Select</option>
                {resState &&
                  districtsByState[permState]?.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              PIN code
            </label>
            <div className="col-12 col-md-8">
              <input
                required
                type="text"
                className="form-control"
                value={permPincode}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d{0,6}$/.test(input)) {
                    setPermPincode(input);
                  }
                }}
                maxLength="6"
                pattern="\d{6}"
                title="PIN code must be exactly 6 digits"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Country
            </label>
            <div className="col-12 col-md-8">
              <select
                required
                className="form-select"
                value="India"
                disabled
                style={{ backgroundColor: "#f0f0f0" }}
              >
                <option value="India">India</option>
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Name of the Statutory Authority with whom already registered
            </label>
            <div className="col-12 col-md-8">
              <select
                required
                className="form-select"
                value={authority}
                onChange={(e) => setAuthority(e.target.value)}
                style={{ backgroundColor: "#f0f0f0" }}
              >
                <option value="">Select</option>
                {statutoryAuthorities.map((auth) => (
                  <option key={auth} value={auth}>
                    {auth}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Economic Activity Code<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-8 d-flex flex-wrap">
              {["Manufacturer", "Trader", "Seller", "Reseller", "Importer"].map(
                (type) => (
                  <div key={type} className="form-check me-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      value={type}
                      checked={econActivity === type}
                      onChange={(e) => setEconActivity(e.target.value)}
                      name="econActivity"
                      required
                    />
                    <label className="form-check-label">{type}</label>
                  </div>
                )
              )}
            </div>
          </div>

          <hr className="my-4" />
          <h6 className="fw-bold mb-2" style={{ color: "#2282C1" }}>
            Major Commodity Traded / Manufactured / You deal / Propose to deal
          </h6>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Select Commodity
            </label>
            <div className="col-12 col-md-8">
              <select
                required
                className="form-select"
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                style={{ backgroundColor: "#f0f0f0" }}
              >
                <option value="">Select</option>
                {commodities.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Dealer’s Description of Commodity
            </label>
            <div className="col-12 col-md-8">
              <textarea
                required
                className="form-control"
                value={commodityDesc}
                placeholder="DEALER’S DESCRIPTION OF COMMODITY"
                onChange={(e) => setCommodityDesc(e.target.value)}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddCommodity}
              style={{
                backgroundColor: "#1E59A8",
                color: "white",
              }}
            >
              [+] Add
            </button>
          </div>

          {successMessage === 'Commodity Inserted !' && (
            <div className="alert alert-success text-center fw-bold mb-3" role="alert">
              <i className="bi bi-check-circle-fill me-2"></i>
              Details Inserted Successfully !!
            </div>
          )}

          {commodityTable.length > 0 && (
            <table className="table table-bordered text-center">
              <thead className="table-primary">
                <tr>
                  <th>Action</th>
                  <th>Act</th>
                  <th>Code</th>
                  <th>Commodity</th>
                  <th>Dealer's description</th>
                </tr>
              </thead>
              <tbody>
                {commodityTable.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <button
                        type="button"
                        className="btn btn-link text-danger"
                        onClick={() =>
                          setCommodityTable((prev) =>
                            prev.filter((_, i) => i !== idx)
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                    <td>{item.act}</td>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Date of First Taxable Sale (DD/MM/YYYY)<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-4">
              <input
                type="date"
                className="form-control"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Do you wish to register for VAT, Composition Scheme (COT)..?<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-8">
              <select
                className="form-select"
                value={vatType}
                onChange={(e) => setVatType(e.target.value)}
                style={{ backgroundColor: "#f0f0f0" }}
                required
              >
                <option value="Normal VAT">Normal VAT</option>
                <option value="Composition Scheme">Composition Scheme</option>
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Estimated Turnover for 12 Months/Quarters<span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-8">
              <input
                className="form-control"
                value={turnover}
                onChange={(e) => setTurnover(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Frequency of Filing Returns
            </label>
            <div className="col-12 col-md-8 d-flex">
              {["Monthly", "Quarterly"].map((freq) => (
                <div key={freq} className="form-check me-4">
                  <input
                    type="radio"
                    className="form-check-input"
                    value={freq}
                    checked={returnFreq === freq}
                    onChange={(e) => setReturnFreq(e.target.value)}
                    name="returnFreq"
                  />
                  <label className="form-check-label">{freq}</label>
                </div>
              ))}
            </div>
          </div>

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
              onClick={() => navigate("/part-a")}
            >
              Previous
            </button>

            <button
              type="submit"
              className="btn px-4 d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "#1E59A8",
                color: "white",
                width: "100%",
                maxWidth: "250px",
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

        </form>
      </div>
    </div>
  );
};

export default PartBForm;