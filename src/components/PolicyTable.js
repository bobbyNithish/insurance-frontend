import React from 'react';

const PolicyTable = ({ 
  policies, 
  currentPage, 
  totalPages, 
  pageSize, 
  totalElements, 
  onPageChange, 
  onPageSizeChange 
}) => {
  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="table-container">
        {policies.length === 0 ? (
          <div className="no-results">No policies found matching your criteria.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Premium (₹)</th>
                <th>Coverage (₹)</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <tr key={policy.id}>
                  <td>{policy.name}</td>
                  <td>{policy.type}</td>
                  <td><span className="currency">₹</span>{policy.premium.toLocaleString()}</td>
                  <td><span className="currency">₹</span>{policy.coverage.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 0 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Showing {policies.length} of {totalElements} policies
          </div>
          <div className="pagination-controls">
            <button 
              className="pagination-button" 
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            
            {pageNumbers.map(number => (
              <button
                key={number}
                className={`pagination-button ${currentPage === number ? 'active' : ''}`}
                onClick={() => onPageChange(number)}
              >
                {number + 1}
              </button>
            ))}
            
            <button 
              className="pagination-button" 
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
          
          <div className="page-size-selector">
            Items per page:
            <select 
              value={pageSize} 
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyTable;
