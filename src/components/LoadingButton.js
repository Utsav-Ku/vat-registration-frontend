const LoadingButton = ({ loading, onClick, children, ...props }) => (
  <button
    className="btn d-flex align-items-center justify-content-center"
    onClick={onClick}
    disabled={loading}
    {...props}
  >
    {loading ? (
      <>
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Processing...
      </>
    ) : (
      children
    )}
  </button>
);

export default LoadingButton;