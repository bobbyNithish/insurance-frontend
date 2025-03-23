import React from 'react';

const Filters = ({
  filterType,
  setFilterType,
  minPremium,
  setMinPremium,
  maxPremium,
  setMaxPremium,
  minCoverage,
  setMinCoverage,
  sortOrder,
  setSortOrder,
  onSubmit,
  onReset,
  errors = {} // Default to empty object if not provided
}) => {
  return (
    <div className="filters">
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className={errors.filterType ? 'input-error' : ''}
      >
        <option value="">Select Policy Type</option>
        <option value="Term Life">Term Life</option>
        <option value="Health">Health</option>
        <option value="Vehicle">Vehicle</option>
      </select>
      
      <input
        type="text"
        placeholder="Min Premium"
        value={minPremium}
        onChange={(e) => setMinPremium(e.target.value)}
        className={errors.minPremium || errors.premiumRange ? 'input-error' : ''}
      />
      {errors.minPremium && <div className="error-message">{errors.minPremium}</div>}
      
      <input
        type="text"
        placeholder="Max Premium"
        value={maxPremium}
        onChange={(e) => setMaxPremium(e.target.value)}
        className={errors.maxPremium || errors.premiumRange ? 'input-error' : ''}
      />
      {errors.maxPremium && <div className="error-message">{errors.maxPremium}</div>}
      {errors.premiumRange && <div className="error-message">{errors.premiumRange}</div>}
      
      <input
        type="text"
        placeholder="Min Coverage"
        value={minCoverage}
        onChange={(e) => setMinCoverage(e.target.value)}
        className={errors.minCoverage ? 'input-error' : ''}
      />
      {errors.minCoverage && <div className="error-message">{errors.minCoverage}</div>}
      
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="">Sort by Premium</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
      
      <button className="filter-button" onClick={onSubmit}>Apply Filters</button>
      <button className="filter-button" onClick={onReset}>Reset</button>
    </div>
  );
};

export default Filters;
