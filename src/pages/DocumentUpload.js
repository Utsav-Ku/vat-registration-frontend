import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingButton from '../components/LoadingButton';
import CustomTable from '../components/CustomTable';
import SuccessMessage from '../components/SuccessMessage';
import Footer from '../components/Footer';

const DocumentUpload = () => {
    const navigate = useNavigate();
    const [documentType, setDocumentType] = useState('');
    const [fileType, setFileType] = useState('');
    const [file, setFile] = useState(null);
    const [uploadedDocs, setUploadedDocs] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [saving, setSaving] = useState(false);
    const maxFileSize = 500 * 1024;

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
    },
    ];


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
            size: `${Math.round(file.size / 1024)} KB`,
            file: file,
        };

        setUploadedDocs([...uploadedDocs, newDoc]);
        setSuccessMessage("Document Uploaded Successfully !!");

        setDocumentType('');
        setFileType('');
        setFile(null);

        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleSaveAndContinue = async () => {
        const applicationNumber = localStorage.getItem('applicationNumber');
        const token = localStorage.getItem('token');

        if (!token) {
            alert("You are not logged in. Please log in to continue.");
            navigate("/sign-in");
            return;
        }

        if (!applicationNumber) {
            alert("Application number not found. Please start a new application.");
            navigate("/part-a");
            return;
        }


        const formData = new FormData();
        formData.append('applicationNumber', applicationNumber);

        let hasIdProof = false;
        let hasAddressProof = false;

        uploadedDocs.forEach(doc => {
            if (doc.name === 'Identity Proof') {
                formData.append('idProof', doc.file);
                hasIdProof = true;
            } else if (doc.name === 'Address Proof of Business Place') {
                formData.append('addressProof', doc.file);
                hasAddressProof = true;
            }
        });

        if (!hasIdProof || !hasAddressProof) {
            alert("Please upload both Identity Proof and Address Proof before proceeding.");
            return;
        }

        setSaving(true);

        try {
            const response = await axios.post(
                'https://tax-nic-1y21.onrender.com/registration/documents',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data?.success) {
                alert("Documents uploaded successfully.");
                navigate('/finish');
            } else {
                alert(response.data?.message || "Upload failed. Try again.");
            }

        } catch (error) {
            alert(
                "An error occurred while submitting the form. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    const fetchUploadedDocuments = async () => {
        const token = localStorage.getItem('token');
        const applicationNumber = localStorage.getItem('applicationNumber');

        if(!token){
            alert("You are not logged in. Please log in to continue.");
            navigate("/sign-in");
            return;
        }
        if(!applicationNumber){
            alert("Application number not found. Please start a new application.");
            navigate("/part-a");
            return;
        }

        const mapDocTypeToLabel = (type) => {
            switch (type) {
                case "ID":
                    return "Identity Proof";
                case "ADDRESS":
                    return "Address Proof of Business Place";
                case "PAN":
                    return "PAN Card";
                case "PHOTO":
                    return "Photograph";
                default:
                    return type;
            }
        };

        const getFileExtension = (filename) => {
            return filename?.substring(filename.lastIndexOf(".")) || "";
        };

        try {
            const response = await axios.get(`https://tax-nic-1y21.onrender.com/registration/documents?applicationNumber=${applicationNumber}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if(response.status === 200 && Array.isArray(response.data)){
                const docs = response.data.map(doc => ({
                    name: mapDocTypeToLabel(doc.docType),
                    type: getFileExtension(doc.filename),
                    size: doc.docSize,
                    file: null,
                    filename: doc.filename,
                    uploadedOn: doc.uploadedOn
                }));
                setUploadedDocs(docs);
            }

        } catch (error) {
            alert("Failed to fetch uploaded documents. Please try again later.");
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchUploadedDocuments();
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
                        <SuccessMessage message={successMessage} />
                    )}

                    {/* Document List */}
                    <div className="w-100">
                        <h6 className="text-primary fw-bold mt-4 mb-2">List of Document</h6>
                        <hr />

                        <CustomTable
                            data={uploadedDocs}
                            columns={docsTableColumns}
                            actions={docsTableActions}
                        />

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
                        <LoadingButton
                            type="button"
                            loading={saving}
                            onClick={handleSaveAndContinue}
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

export default DocumentUpload;