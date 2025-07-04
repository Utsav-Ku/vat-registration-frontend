import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const BankInfo = () => {
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [accountType, setAccountType] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const resetForm = () => {
    setBankName("");
    setBranchName("");
    setAccountNumber("");
    setBranchCode("");
    setAccountType("");
    setSelectedIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity(); 
      return;
    }
    navigate("/additional-business-places");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <>
      <Header />
      <div className="container mt-4 mb-5">
        <div className="card shadow-lg p-4">
          <form onSubmit={handleAdd}>
            <h5 className="fw-bold mb-1" style={{ color: '#2282C1' }}>Bank Info</h5>
            <hr />

            {/* Bank Name */}
            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label fw-bold">
                Bank Name<span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <select className="form-select" value={bankName} onChange={(e) => setBankName(e.target.value)} required>
                  <option value="" disabled>Select Your Bank</option>
                  <option>Agartala Cooperative Urban Bank Ltd.</option>
                  <option>Allahabad Bank</option>
                  <option>Andhra Bank</option>
                  <option>Axis Bank</option>
                  <option>Bank of Baroda</option>
                  <option>Bank of India</option>
                  <option>Bank of Maharashtra</option>
                  <option>Canara Bank</option>
                  <option>Central Bank of India</option>
                  <option>CITIBANK</option>
                  <option>Corporation Bank</option>
                  <option>Dena Bank</option>
                  <option>FEDERAL BANK</option>
                  <option>HDFC Bank</option>
                  <option>Hongkong Shanghai Banking Corp.Ltd.</option>
                  <option>ICICI Bank</option>
                  <option>IDBI Bank</option>
                  <option>Indian Bank</option>
                  <option>Indian Overseas Bank</option>
                  <option>Indus Bank</option>
                  <option>Oriental Bank of Commerce</option>
                  <option>Punjab and Sind Bank</option>
                  <option>Punjab National Bank</option>
                  <option>South Indian Bank Ltd.</option>
                  <option>Standard Chartered Bank</option>
                  <option>State Bank of India</option>
                  <option>Syndicate Bank</option>
                  <option>Tripura Gramin Bank</option>
                  <option>Tripura State Co-operative Bank Ltd.</option>
                  <option>Union Bank of India</option>
                  <option>United Bank of India</option>
                  <option>United Commercial Bank</option>
                  <option>Vijaya Bank</option>
                  <option>Yes Bank</option>
                </select>
              </div>
            </div>

            {/* Branch Name */}
            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label fw-bold">
                Branch Name, Address<span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <input type="text" placeholder="Enter Branch Name" className="form-control" value={branchName} onChange={(e) => setBranchName(e.target.value)} required />
              </div>
            </div>

            {/* Account Number */}
            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label fw-bold">
                Account Number<span className="text-danger">*</span>
              </label>
              <div className="col-sm-9">
                <input type="text" placeholder="Enter Account Number" className="form-control" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
              </div>
            </div>

            {/* Branch Code */}
            <div className="row mb-3 align-items-center">
              <label className="col-sm-3 col-form-label fw-bold">Branch Code</label>
              <div className="col-sm-9">
                <input type="text" placeholder="Enter Branch Code" className="form-control" value={branchCode} onChange={(e) => setBranchCode(e.target.value)} />
              </div>
            </div>

            {/* Account Type */}
            <div className="row mb-4 align-items-center">
              <label className="col-sm-3 col-form-label fw-bold">Type of Account</label>
              <div className="col-sm-9">
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
              <div className="text-center fw-bold py-2 mt-2 mx-auto" style={{ backgroundColor: '#ffffcc', border: '1px solid #cccc00', color: '#000', maxWidth: '400px', borderRadius: '4px' }}>
                ✅ Details Inserted Successfully !!
              </div>
            )}
          </form>

          {/* Bank Accounts List */}
          <h6 className="fw-bold mb-1 mt-2" style={{ color: 'rgb(34, 130, 193)' }}>List of Bank Accounts</h6>
          <hr className="my-1" />

          {bankAccounts.length === 0 ? (
            <div className="p-3 text-center text-muted fade-in mt-4" style={{ backgroundColor: 'rgb(248, 249, 250)', borderRadius: '6px' }}>
              <i className="bi bi-folder-x me-2"></i>
              No Bank Accounts Added Yet.
            </div>
          ) : (
            <table className="table table-bordered mt-4 fade-in">
              <thead className="table-primary text-center">
                <tr>
                  <th>Select</th>
                  <th>Bank</th>
                  <th>Branch</th>
                  <th>Account Number</th>
                  <th>Type Of Account</th>
                  <th>Branch Code</th>
                </tr>
              </thead>
              <tbody>
                {bankAccounts.map((acc, i) => (
                  <tr key={i} className="text-center align-middle">
                    <td>
                      <button className="btn btn-outline-primary btn-sm" onClick={() => handleSelect(i)} style={{ width: "80px" }}>
                        Select
                      </button>
                    </td>
                    <td>{acc.bankName}</td>
                    <td>{acc.branchName}</td>
                    <td>{acc.accountNumber}</td>
                    <td>{acc.accountType}</td>
                    <td>{acc.branchCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-center mt-4">
            <div className="d-flex" style={{ gap: '30px' }}>
              <button type="button" className="btn px-4" style={{ backgroundColor: 'rgb(30, 89, 168)', color: 'white', width: '250px' }} onClick={() => navigate('/part-c')}>
                Previous
              </button>
              <button type="button" className="btn px-4" style={{ backgroundColor: 'rgb(30, 89, 168)', color: 'white', width: '250px' }} onClick={handleSubmit}>
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