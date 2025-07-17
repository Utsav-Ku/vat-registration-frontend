import React from 'react';

const CustomTable = ({ data, columns, actions = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-3 text-center text-muted" style={{ backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
        <i className="bi bi-folder-x me-2"></i>
        No records available.
      </div>
    );
  }

  return (
    <div className="table-responsive mt-4">
      <table className="table table-bordered table-striped align-middle mb-0">
        <thead className="table-primary text-center">
          <tr>
            {actions.length > 0 && <th scope="col">Action</th>}
            {columns.map((col) => (
              <th key={col.key} scope="col">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {actions.length > 0 && (
                <td>
                  {actions.map((action, idx) => (
                    <button
                      key={idx}
                      className={`btn btn-sm ${action.variant || 'btn-outline-primary'} me-2 mb-1`}
                      onClick={() => action.onClick(row, rowIndex)}
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;