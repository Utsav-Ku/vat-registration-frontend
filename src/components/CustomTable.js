// components/CustomTable.js
import React from 'react';

const CustomTable = ({ data, columns, actions = [] }) => {
  if (!data || data.length === 0) {
    return (
        <div className="p-3 text-center text-muted" style={{ backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
            <i className="bi bi-folder-x me-2"></i>
            No documents uploaded yet.
        </div>
    );
  }

  return (
    <table className="table table-bordered mt-4">
      <thead className="table-primary text-center">
        <tr>
          {actions.length > 0 && <th>Action</th>}
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
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
                    className={`btn btn-sm ${action.variant || 'btn-primary'} me-2`}
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
  );
};

export default CustomTable;