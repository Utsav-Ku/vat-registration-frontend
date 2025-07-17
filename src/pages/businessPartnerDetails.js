import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingButton from '../components/LoadingButton';
import CustomTable from '../components/CustomTable';
import SuccessMessage from '../components/SuccessMessage';
import Footer from '../components/Footer';

const BusinessPartnerDetails = () => {
  const navigate = useNavigate();

  const [partnerType, setPartnerType] = useState('');
  const [personName, setPersonName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [dob, setDob] = useState('');
  const [designation, setDesignation] = useState('');
  const [education, setEducation] = useState('');
  const [pan, setPan] = useState('');
  const [presentAddress, setPresentAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [village, setVillage] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [tel, setTel] = useState('');
  const [fax, setFax] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [exitDate, setExitDate] = useState('');
  const [voterId, setVoterId] = useState('');
  const [residentialCert, setResidentialCert] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [fileType, setFileType] = useState('');
  const [file, setFile] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [tableRows, setTableRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const docsTableColumns = [
    { key: 'name', label: 'Document Name' },
    { key: 'type', label: 'Document Type' },
    { key: 'size', label: 'Size' },
  ];

  const docsTableActions = [
    {
      label: 'Delete',
      variant: 'btn-danger',
      onClick: (_, index) => {
        const updated = uploadedDocs.filter((_, i) => i !== index);
        setUploadedDocs(updated);
      },
    }
  ];

  const maxFileSize = 500 * 1024;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!documentType || !fileType || !file) {
      alert("Please select document type, file type, and upload a file.");
      return;
    }
    if (file.size > maxFileSize) {
      alert("File exceeds maximum size of 500KB.");
      return;
    }
    const newDoc = {
      name: documentType,
      type: fileType,
      size: `${Math.round(file.size / 1024)} KB`
    };
    setUploadedDocs([...uploadedDocs, newDoc]);
    setSuccessMessage("Document Uploaded Successfully !!");
    setDocumentType('');
    setFileType('');
    setFile(null);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target.form || e.target;
    const firstInvalid = form.querySelector(":invalid");

    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      firstInvalid.focus();
      form.reportValidity();
      return;
    }

    const newRow = {
      partnerType,
      personName,
      fatherName,
      presentAddress,
      locality,
      village,
      tel,
      dob,
      entryDate,
      exitDate,
    };

    setTableRows([...tableRows, newRow]);
    setSuccessMessage("Details Inserted Successfully !!");
  };

  const handleSubmission = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in to continue.");
      navigate("/sign-in");
      return;
    }

    const applicationNumber = localStorage.getItem("applicationNumber");
    if (!applicationNumber) {
      alert("Application number not found. Please start a new application.");
      navigate("/part-a");
      return;
    }

    setLoading(true);

    const payload = {
      applicationNumber: applicationNumber,
      partnerType,
      name: personName,
      fathersName: fatherName,
      dateOfBirth: dob,
      designation,
      qualification: education,
      pan,
      presentAddress,
      area: locality,
      village,
      permanentAddress,
      contact: {
        telephone: tel,
        fax,
        email,
      },
      interestPercent: parseFloat(interest) || 0,
      partnershipDates: {
        entryDate,
        exitDate,
      },
      electoralDetails: {
        voterId,
        residentialCertNo: residentialCert,
      },
    };

    try {
      const { data } = await axios.post("https://tax-nic-1y21.onrender.com/registration/partner", 
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      )

      if (data.success) {
        alert("Business Partner Details added successfully!");
        navigate("/upload-document");
      }

    } catch (error) {
      alert("An error occurred while submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fetchPartnerDetails = async () => {
    const applicationNumber = localStorage.getItem("applicationNumber");
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in. Please log in to continue.");
      navigate("/sign-in");
      return;
    }

    if (!applicationNumber) {
      alert("Application number not found. Please complete Part A first.");
      navigate("/part-a");
      return;
    }

    try {
      const response = await axios.get(
        `https://tax-nic-1y21.onrender.com/registration/partner?applicationNumber=${applicationNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data[0];
      if (data) {
        setLocality(data.area);
        setPartnerType(data.partnerType);
        setDob(data.dateOfBirth);
        setDesignation(data.designation);
        setFatherName(data.fathersName);
        setPersonName(data.name);
        setPan(data.pan);
        setInterest(data.interestPercent);
        setPermanentAddress(data.permanentAddress);
        setPresentAddress(data.presentAddress);
        setEducation(data.qualification);
        setVillage(data.village);
        setTel(data.contact.telephone);
        setFax(data.contact.fax);
        setEmail(data.contact.email);
        setResidentialCert(data.electoralDetails.residentialCertNo);
        setVoterId(data.electoralDetails.voterId);
        setEntryDate(data.partnershipDates.entryDate);
        setExitDate(data.partnershipDates.entryDate);
      }

    } catch (error) {
      alert("Unable to load previously saved data.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPartnerDetails();
  }, []);

  return (
    <div>
      <Header />
      <div className="container my-4">
        <form className="border p-4 rounded shadow bg-white" onSubmit={handleSubmission}>
          <div className="fw-bold text-primary text-center mb-4" style={{ fontSize: '1.5rem', letterSpacing: '0.5px' }}>
            <i className="bi bi-people-fill me-2"></i>
            Business Partner Details
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
                Type
            </label>
            <div className="col-12 col-md-8 d-flex align-items-center gap-4">
                <div className="form-check">
                <input
                    required
                    className="form-check-input"
                    type="checkbox"
                    id="contactPerson"
                    checked={partnerType === 'Contact Person'}
                    onChange={(e) => setPartnerType(e.target.checked ? 'Contact Person' : '')}
                />
                <label className="form-check-label" htmlFor="contactPerson">
                    Contact Person
                </label>
                </div>
                <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="partner"
                    checked={partnerType === 'Partner'}
                    onChange={(e) => setPartnerType(e.target.checked ? 'Partner' : '')}
                />
                <label className="form-check-label" htmlFor="partner">
                    Partner
                </label>
                </div>
            </div>
          </div>


          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Name of Person <span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                name="personName"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Father's Name
            </label>
            <div className="col-12 col-md-8">
              <input
                required
                type="text"
                className="form-control"
                name="fatherName"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Date of Birth (DD/MM/YYYY)
            </label>
            <div className="col-12 col-md-4">
              <input
                required
                type="date"
                className="form-control"
                name="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Partner Type/Designation
            </label>
            <div className="col-12 col-md-8">
              <select
                className="form-select"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                style={{ backgroundColor: '#f0f0f0' }}
              >
                <option value="">Select Type</option>
                <option value="Contact Person">Chairman</option>
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Educational Qualification
            </label>
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                name="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              PAN No.
            </label>
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                name="pan"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Present Address
            </label>
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                name="presentAddress"
                value={presentAddress}
                onChange={(e) => setPresentAddress(e.target.value)}
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
                name="locality"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Village/Town/City <span style={{ color: "#dc3545" }}>*</span>
            </label>
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                name="village"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Permanent Address
            </label>
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                name="permanentAddress"
                value={permanentAddress}
                onChange={(e) => setPermanentAddress(e.target.value)}
              />
            </div>
          </div>

          <hr className="my-4" />
          <h6 className="fw-bold mb-2" style={{ color: "#2282C1" }}>
            Contact Details
          </h6>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Tel Number
            </label>
            <div className="col-12 col-md-8">
              <input
                type="number"
                className="form-control"
                name="tel"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Fax Number
            </label>
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                name="fax"
                value={fax}
                onChange={(e) => setFax(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Email ID
            </label>
            <div className="col-12 col-md-8">
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Extent of Interest in Business(%)
            </label>
            <div className="col-12 col-md-8">
              <input
                type="number"
                className="form-control"
                name="interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              />
            </div>
          </div>

          {/* Date of Entry */}
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Date of Entry to Partnership/ Date from which associated
            </label>
            <div className="col-12 col-md-4">
              <input
                type="date"
                className="form-control"
                name="entryDate"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {/* Date of Leaving */}
          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Date of leaving Partnership/ Date upto which associated
            </label>
            <div className="col-12 col-md-4">
              <input
                type="date"
                className="form-control"
                name="exitDate"
                value={exitDate}
                onChange={(e) => setExitDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <hr className="my-4" />
          <h6 className="fw-bold mb-2" style={{ color: "#2282C1" }}>
            Electrolal Details
          </h6>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Voter's ID Card Number
            </label>
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                name="voterId"
                value={voterId}
                onChange={(e) => setVoterId(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Residential Certificate Number Issued by the jurisdictional revenew authority of the state in which the dealer resides
            </label>
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                name="residentialCert"
                value={residentialCert}
                onChange={(e) => setResidentialCert(e.target.value)}
              />
            </div>
          </div>

          <div className="fw-bold text-primary text-center mb-4" style={{ fontSize: '1.2rem' }}>
            <i className="bi bi-file-earmark-arrow-up-fill me-2"></i>
            Upload Supporting Documents
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Select Document
            </label>
            <div className="col-12 col-md-8">
              <select className="form-select" value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
                <option value="">Select Document Type</option>
                <option value="Address Proof of Business Place">Address Proof of Business Place</option>
                <option value="Identity Proof">Identity Proof</option>
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Select File Type
            </label>
            <div className="col-12 col-md-8">
              <select className="form-select" value={fileType} onChange={(e) => setFileType(e.target.value)}>
                <option value="">Select File Type</option>
                <option value=".pdf">.pdf</option>
                <option value=".jpg">.jpg</option>
                <option value=".png">.png</option>
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-12 col-md-4 col-form-label fw-bold">
              Upload File
            </label>
            <div className="col-12 col-md-8">
              <input type="file" className="form-control" onChange={handleFileChange} />
              {file && <small className="text-success">File Size: {Math.round(file.size / 1024)} KB</small>}
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button className="btn btn-success px-4 mb-4" onClick={handleUpload}>
              Upload Document
            </button>
          </div>

          {successMessage && (
            <SuccessMessage message={successMessage} />
          )}

          {uploadedDocs.length > 0 && (
            <div className="mt-4">
            <h6 className="text-primary fw-bold">List of Uploaded Documents</h6>
            <CustomTable
              data={uploadedDocs}
              columns={docsTableColumns}
              actions={docsTableActions}
            />
            </div>
          )}

          {tableRows.length > 0 && (
            <div className="mt-5">
              <h5 className="fw-bold text-primary">List of Partner Details/Contact Person</h5>
              <table className="table table-bordered text-center mt-3">
                <thead className="table-primary">
                  <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Father's Name</th>
                    <th>Street</th>
                    <th>Area</th>
                    <th>Place</th>
                    <th>Telephone</th>
                    <th>Date of Birth</th>
                    <th>Date of Entry</th>
                    <th>Date of Leaving</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, idx) => (
                    <tr key={idx} style={{ backgroundColor: '#dee2e6' }}>
                      <td>{row.partnerType}</td>
                      <td>{row.personName}</td>
                      <td>{row.fatherName}</td>
                      <td>{row.presentAddress}</td>
                      <td>{row.locality}</td>
                      <td>{row.village}</td>
                      <td>{row.tel}</td>
                      <td>{row.dob}</td>
                      <td>{row.entryDate}</td>
                      <td>{row.exitDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Buttons */}
          <div className="d-flex justify-content-center gap-4 mt-4">
            <button type="button" className="btn px-4" style={{
              backgroundColor: "#1E59A8",
              color: "white",
              width: "250px"
            }} onClick={() => navigate('/additional-business-places')}>Previous</button>

            <LoadingButton
              type="button"
              loading={loading}
              onClick={handleSubmission}
              style={{
                backgroundColor: "#1E59A8",
                color: "white",
                width: "250px",
              }}
            >
              Save & Continue
            </LoadingButton>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BusinessPartnerDetails;