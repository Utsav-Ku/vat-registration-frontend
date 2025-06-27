import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const BankInfo = () => {
  const [bankName, setBankName] = useState("Agartala Cooperative Urban Bank Ltd");
  const [branchName, setBranchName] = useState("AGARTALA");
  const [accountNumber, setAccountNumber] = useState("1234567890");
  const [branchCode, setBranchCode] = useState("001");
  const [accountType, setAccountType] = useState("Savings Account");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const resetForm = () => {
    setBankName("Agartala Cooperative Urban Bank Ltd");
    setBranchName("AGARTALA");
    setAccountNumber("1234567890");
    setBranchCode("001");
    setAccountType("Savings Account");
    setSelectedIndex(null);
  };

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
    <>
      <Header />
      <div className="container mt-4 mb-5">
        <div className="card shadow-lg p-4">
          <form onSubmit={handleAdd}>
            <h5 className="fw-bold mb-1" style={{ color: '#2282C1' }}>Bank Info</h5>
            <hr />
            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label fw-bold">Bank Name<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <select className="form-select" value={bankName} onChange={(e) => setBankName(e.target.value)} required>
                  <option>Agartala Cooperative Urban Bank Ltd</option>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                </select>
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label fw-bold">Branch Name, Address<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" value={branchName} onChange={(e) => setBranchName(e.target.value)} required />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label fw-bold">Account Number<span className="text-danger">*</span></label>
              <div className="col-sm-9">
                <input type="text" className="form-control" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label fw-bold">Branch Code</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" value={branchCode} onChange={(e) => setBranchCode(e.target.value)} />
              </div>
            </div>

            <div className="row mb-4 align-items-center">
              <label className="col-sm-3 col-form-label fw-bold">Type of Account</label>
              <div className="col-sm-9">
                <select className="form-select" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                  <option>Savings Account</option>
                  <option>Current Account</option>
                </select>
              </div>
            </div>

            <div className="row mb-4 justify-content-center">
              <div className="col-sm-3 d-grid">
                <button
                  className="btn"
                  type="submit"
                  style={{ backgroundColor: 'rgb(30, 89, 168)', color: 'white', width: '125px' }}
                >
                  [+] Add
                </button>
              </div>
              <div className="col-sm-3 d-grid">
                <button
                  className="btn"
                  type="button"
                  onClick={handleUpdate}
                  disabled={selectedIndex === null}
                  style={{ backgroundColor: 'rgb(30, 89, 168)', color: 'white', width: '125px' }}
                >
                  [↓] Update
                </button>
              </div>
              <div className="col-sm-3 d-grid">
                <button
                  className="btn"
                  type="button"
                  onClick={handleDelete}
                  disabled={selectedIndex === null}
                  style={{ backgroundColor: 'rgb(30, 89, 168)', color: 'white', width: '125px' }}
                >
                  [X] Delete
                </button>
              </div>
            </div>

            {isSubmitted && (
              <div
                className="text-center fw-bold py-2 mt-2 mx-auto"
                style={{
                  backgroundColor: '#ffffcc',
                  border: '1px solid #cccc00',
                  color: '#000',
                  maxWidth: '400px',
                  borderRadius: '4px'
                }}
              >
                ✅ Details Inserted Successfully !!
              </div>
            )}
          </form>

          <h6 className="fw-bold mb-3 mt-4">List of Bank Accounts</h6>
          <table className="table table-bordered">
            <thead className="table-primary text-center">
              <tr>
                <th>Select</th>
                <th>Bank</th>
                <th>Branch</th>
                <th>AccountNumber</th>
                <th>TypeOfAccount</th>
                <th>BranchCode</th>
              </tr>
            </thead>
            <tbody>
              {bankAccounts.map((acc, i) => (
                <tr key={i} className="text-center align-middle">
                  <td>
                    <button className="btn btn-link p-0" onClick={() => handleSelect(i)}>Select</button>
                  </td>
                  <td>{acc.bankName}</td>
                  <td>{acc.branchName}</td>
                  <td>{acc.accountNumber}</td>
                  <td>{acc.accountType}</td>
                  <td>{acc.branchCode}</td>
                </tr>
              ))}
              {bankAccounts.length === 0 && (
                <tr><td colSpan={6} className="text-center">No accounts added yet.</td></tr>
              )}
            </tbody>
          </table>

          <div className="d-flex justify-content-center mt-4">
            <div className="d-flex" style={{ gap: '30px' }}>
              <button
                type="button"
                className="btn px-4"
                style={{ backgroundColor: 'rgb(30, 89, 168)', color: 'white', width: '250px' }}
                onClick={() => navigate('/previous-page')}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn px-4"
                style={{ backgroundColor: 'rgb(30, 89, 168)', color: 'white', width: '250px' }}
                onClick={() => navigate('/next-page')}
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankInfo;