import React from "react";

const SuccessMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="alert alert-success text-center fw-bold fade show"
      role="alert"
      style={{ transition: "opacity 0.5s ease" }}
    >
      <i className="bi bi-check-circle-fill me-2"></i>
      {message}
    </div>
  );
};

export default SuccessMessage;