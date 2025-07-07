import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const DocumentUpload = () => {

    const navigate = useNavigate();
    const [documentType, setDocumentType] = useState('');
    const [fileType, setFileType] = useState('');
    const [file, setFile] = useState(null);
    const [uploadedDocs, setUploadedDocs] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Header />

            <div className="container mt-4">
                <div className="border p-4 mx-auto shadow d-flex flex-column align-items-center"
                    style={{ maxWidth: '950px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px' }}>

                    {/* Heading */}
                    <div className="fw-bold text-primary text-center mb-4" style={{ fontSize: '1.5rem', letterSpacing: '0.5px' }}>
                        <i className="bi bi-file-earmark-arrow-up-fill me-2"></i>
                        Documents
                    </div>

                    {/* Upload Form */}
                    <form onSubmit={handleUpload} style={{ width: '100%' }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <label className="fw-bold">Select Document</label>
                            <span className="px-3 py-1" style={{ backgroundColor: '#F8D7DA', borderRadius: '4px', color: '#842029', fontSize: '0.9rem' }}>
                                Max Size: 500 KB
                            </span>
                        </div>

                        <div className="mb-3">
                            <select className="form-select" value={documentType} onChange={(e) => setDocumentType(e.target.value)} required>
                                <option value="">Select Document Type</option>
                                <option value="Address Proof of Business Place">Address Proof of Business Place</option>
                                <option value="Identity Proof">Identity Proof</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <select className="form-select" value={fileType} onChange={(e) => setFileType(e.target.value)} required>
                                <option value="">Select File Type</option>
                                <option value=".pdf">.pdf</option>
                                <option value=".jpg">.jpg</option>
                                <option value=".png">.png</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <input type="file" className="form-control" onChange={handleFileChange} required />
                        </div>

                        <div className="d-flex align-items-center mb-4">
                            <button className="btn fw-bold px-4 me-3" style={{ backgroundColor: '#1E59A8', color: 'white' }}>
                                Upload
                            </button>
                            {file && (
                                <span>File Size: <span style={{ color: 'green' }}>{Math.round(file.size / 1024)} KB</span></span>
                            )}
                        </div>
                    </form>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="alert alert-success text-center fw-bold" role="alert">
                            <i className="bi bi-check-circle-fill me-2"></i>
                            {successMessage}
                        </div>
                    )}

                    {/* Document List */}
                    <div className="w-100">
                        <h6 className="text-primary fw-bold mt-4 mb-2">List of Document</h6>
                        <hr />

                        {uploadedDocs.length === 0 ? (
                            <div className="p-3 text-center text-muted" style={{ backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                                <i className="bi bi-folder-x me-2"></i>
                                No documents uploaded yet.
                            </div>
                        ) : (
                            <table className="table table-bordered mt-3">
                                <thead className="table-primary text-center" >
                                    <tr>
                                        <th>Delete</th>
                                        <th>View</th>
                                        <th>Document Name</th>
                                        <th>Document Type</th>
                                        <th>Size</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {uploadedDocs.map((doc, index) => (
                                        <tr key={index}>
                                            <td>
                                                <button className="btn btn-sm btn-danger" onClick={() => {
                                                    const updated = uploadedDocs.filter((_, i) => i !== index);
                                                    setUploadedDocs(updated);
                                                }}>Delete</button>
                                            </td>
                                            <td><i className="bi bi-eye-fill text-primary"></i></td>
                                            <td>{doc.name}</td>
                                            <td>{doc.type}</td>
                                            <td>{doc.size}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Bottom Buttons Centered */}
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <button
                            className="btn fw-bold px-4"
                            style={{ backgroundColor: '#1E59A8', color: 'white', width: '200px' }}
                            onClick={() => navigate('/business-partner-details')}
                        >
                            Prev
                        </button>
                        <button
                            className="btn fw-bold px-4"
                            style={{ backgroundColor: '#1E59A8', color: 'white', width: '200px' }}
                            onClick={() => navigate('/finish')}
                        >
                            Save & Continue
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DocumentUpload;