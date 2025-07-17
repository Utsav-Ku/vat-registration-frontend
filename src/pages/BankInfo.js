import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { bankOptions } from '../constants/dropDowns';
import LoadingButton from '../components/LoadingButton';
import CustomTable from '../components/CustomTable';
import SuccessMessage from '../components/SuccessMessage';
import Footer from '../components/Footer';

const BankInfo = () => {
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [accountType, setAccountType] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setBankName("");
    setBranchName("");
    setAccountNumber("");
    setBranchCode("");
    setAccountType("");
    setSelectedIndex(null);
  };

  const tableColumns = [
    { key: "bankName", label: "Bank" },
    { key: "branchName", label: "Branch" },
    { key: "accountNumber", label: "Account Number" },
    { key: "accountType", label: "Type Of Account" },
    { key: "branchCode", label: "Branch Code" },
  ];

  const tableActions = [
    {
      label: "Select",
      variant: "btn-outline-primary",
      onClick: (_, index) => handleSelect(index),
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (bankAccounts.length === 0) {
      alert("Please add at least one bank account before continuing.");
      return;
    }

    const applicationNumber = localStorage.getItem("applicationNumber");
    const token = localStorage.getItem("token"); // 👈 Retrieve token

    if (!applicationNumber) {
      alert("Application number not found. Please complete Part A first.");
      return;
    }

    if (!token) {
      alert("Authorization token not found. Please login again.");
      return;
    }

    setLoading(true);

    const firstBank = bankAccounts[0];

    if (!firstBank.bankName || !firstBank.branchName || !firstBank.accountNumber || !firstBank.accountType || !firstBank.branchCode) {
      alert("Incomplete bank account details.");
      setLoading(false);
      return;
    }

    const payload = {
      applicationNumber,
      bankName: firstBank.bankName,
      branchAddress: firstBank.branchName,
      accountNumber: firstBank.accountNumber,
      branchCode: firstBank.branchCode,
      accountType: firstBank.accountType,
    };

    try {
      const { data } = await axios.post(
        "https://tax-nic-1y21.onrender.com/registration/bank-info",
        payload
      );

      if (data.success) {
        alert("Bank Info saved successfully.");
        navigate("/additional-business-places");
      } else {
        alert(data.message || "Failed to save Bank Info.");
      }
    } catch (err) {
      alert("An error occurred while submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBankInfoData = async () => {
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

    try {
      const res = await axios.get(
        `https://tax-nic-1y21.onrender.com/registration/bank-info?applicationNumber=${applicationNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;
      if (data.bankName && data.accountNumber) {
        const entry = {
          bankName: data.bankName ?? "",
          branchName: data.branchAddress ?? "",
          accountNumber: data.accountNumber ?? "",
          accountType: data.accountType ?? "",
          branchCode: data.branchCode ?? "",
        };
        setBankAccounts([entry]);
      }
    } catch (err) {
      alert("Failed to fetch bank info data.Please try again later.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBankInfoData();
  }, []);

  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    const newEntry = { bankName, branchName, accountNumber, accountType, branchCode };
    const exists = bankAccounts.some(acc => acc.accountNumber === accountNumber);

    if (exists) {
      alert("Account number already exists!");
      return;
    }

    setBankAccounts([...bankAccounts, newEntry]);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    resetForm();
  };

  const handleUpdate = () => {
    if (selectedIndex === null) return;
    const updated = [...bankAccounts];
    updated[selectedIndex] = { bankName, branchName, accountNumber, accountType, branchCode };
    setBankAccounts(updated);
    resetForm();
  };

  const handleDelete = () => {
    if (selectedIndex === null) return;
    const updated = bankAccounts.filter((_, i) => i !== selectedIndex);
    setBankAccounts(updated);
    resetForm();
  };

  const handleSelect = (index) => {
    const selected = bankAccounts[index];
    setBankName(selected.bankName);
    setBranchName(selected.branchName);
    setAccountNumber(selected.accountNumber);
    setBranchCode(selected.branchCode);
    setAccountType(selected.accountType);
    setSelectedIndex(index);
  };

  return (
    <div>
      <Header />
      <div className="container mt-4 mb-5">
        <div className="card shadow-lg p-4">
          <form onSubmit={handleAdd}>
            <div className="fw-bold text-primary text-center mb-4" style={{ fontSize: "1.5rem", letterSpacing: "0.5px" }}>
              <i className="bi bi-bank2 me-2"></i> Bank Information
            </div>

            {/* Bank Name */}
            <div className="mb-3 row">
              <label className="col-12 col-md-4 col-form-label fw-bold">
                Bank Name<span className="text-danger">*</span>
              </label>
              <div className="col-12 col-md-8">
                <select 
                  className="form-select" 
                  value={bankName} 
                  onChange={(e) => setBankName(e.target.value)} 
                  required
                >
                  <option value="" disabled>Select Your Bank</option>
                  {bankOptions.map((bank, index) => (
                    <option key={index} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Branch Name */}
            <div className="mb-3 row">
              <label className="col-12 col-md-4 col-form-label fw-bold">
                Branch Name, Address<span className="text-danger">*</span>
              </label>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  placeholder="Enter Branch Name"
                  className="form-control"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Account Number */}
            <div className="mb-3 row">
              <label className="col-12 col-md-4 col-form-label fw-bold">
                Account Number<span className="text-danger">*</span>
              </label>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  placeholder="Enter Account Number"
                  className="form-control"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Branch Code */}
            <div className="mb-3 row">
              <label className="col-12 col-md-4 col-form-label fw-bold">
                Branch Code
              </label>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  placeholder="Enter Branch Code"
                  className="form-control"
                  value={branchCode}
                  onChange={(e) => setBranchCode(e.target.value)}
                />
              </div>
            </div>

            {/* Account Type */}
            <div className="mb-3 row">
              <label className="col-12 col-md-4 col-form-label fw-bold">
                Type of Account
              </label>
              <div className="col-12 col-md-8">
                <select className="form-select" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                  <option value="" disabled>Select Your Account Type</option>
                  <option>Savings Account</option>
                  <option>Current Account</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="row mb-4 justify-content-center">
              <div className="col-sm-3 d-grid">
                <button className="btn" type="submit" style={{ backgroundColor: 'rgb(30, 89, 168)', color: 'white', width: '125px' }}>
                  [+] Add
                </button>
              </div>
              <div className="col-sm-3 d-grid">
                <button className="btn" type="button" onClick={handleUpdate} disabled={selectedIndex === null} style={{ backgroundColor: 'rgb(30, 89, 168)', color: 'white', width: '125px' }}>
                  [↓] Update
                </button>
              </div>
              <div className="col-sm-3 d-grid">
                <button className="btn" type="button" onClick={handleDelete} disabled={selectedIndex === null} style={{ backgroundColor: 'rgb(30, 89, 168)', color: 'white', width: '125px' }}>
                  [X] Delete
                </button>
              </div>
            </div>

            {isSubmitted && (
              <SuccessMessage message={"Details Inserted Successfully!!"} />
            )}
          </form>

          {/* Bank Accounts List */}
          <h6 className="fw-bold mb-1 mt-2" style={{ color: 'rgb(34, 130, 193)' }}>List of Bank Accounts</h6>
          <hr className="my-1" />

          <CustomTable
            data={bankAccounts}
            columns={tableColumns}
            actions={tableActions}
          />

          {/* Navigation Buttons */}
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
              onClick={() => navigate("/part-c")}
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
};

export default BankInfo;