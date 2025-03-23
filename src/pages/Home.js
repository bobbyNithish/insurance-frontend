import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import PolicyTable from "../components/PolicyTable";
import { 
  getAllPolicies, 
  searchPoliciesByName, 
  filterPoliciesByType, 
  filterPoliciesByPremium 
} from "../services/api";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [minPremium, setMinPremium] = useState("");
  const [maxPremium, setMaxPremium] = useState("");
  const [minCoverage, setMinCoverage] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  
  const fetchAllPolicies = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getAllPolicies(currentPage, pageSize);
      setPolicies(data.content); // Spring Boot returns content array
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      console.error("Error fetching all policies:", err);
      setError("Failed to fetch policies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch policies based on current filters
  const fetchFilteredPolicies = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let data;
      
      // Determine which API endpoint to use based on filters
      if (searchQuery) {
        data = await searchPoliciesByName(searchQuery, currentPage, pageSize);
      } else if (filterType) {
        data = await filterPoliciesByType(filterType, currentPage, pageSize);
      } else if (minPremium && maxPremium) {
        data = await filterPoliciesByPremium(minPremium, maxPremium, currentPage, pageSize);
      } else {
        data = await getAllPolicies(currentPage, pageSize);
      }
      
      // Set policies from the paginated response
      setPolicies(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      
      // Apply client-side filtering for coverage since there's no API endpoint for it
      if (minCoverage) {
        const filteredData = data.content.filter(policy => policy.coverage >= parseInt(minCoverage));
        setPolicies(filteredData);
      }
      
      // Apply client-side sorting
      if (sortOrder) {
        const sortedData = [...data.content].sort((a, b) => {
          if (sortOrder === 'asc') {
            return a.premium - b.premium;
          } else {
            return b.premium - a.premium;
          }
        });
        setPolicies(sortedData);
      }
      
    } catch (err) {
      console.error("Error fetching filtered policies:", err);
      setError("Failed to fetch policies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load policies on initial render and when pagination changes
  useEffect(() => {
    if (!searchQuery && !filterType && !minPremium && !maxPremium) {
      fetchAllPolicies();
    } else {
      fetchFilteredPolicies();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize]);

  // Function to handle search
  const handleSearch = () => {
    setCurrentPage(0); // Reset to first page when searching
    fetchFilteredPolicies();
  };

  // Function to handle filter submission
  const handleSubmit = () => {
    setCurrentPage(0); // Reset to first page when applying filters
    fetchFilteredPolicies();
  };

  // Function to reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setFilterType("");
    setMinPremium("");
    setMaxPremium("");
    setMinCoverage("");
    setSortOrder("");
    setCurrentPage(0); // Reset to first page
    
    // Fetch all policies after reset
    fetchAllPolicies();
  };

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to handle page size change
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(0); // Reset to first page when changing page size
  };

  return (
    <div className="home-container">
      <Header title="Insurance Policy Manager" />
      <div className="main-content">
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
        <Filters
          filterType={filterType}
          setFilterType={setFilterType}
          minPremium={minPremium}
          setMinPremium={setMinPremium}
          maxPremium={maxPremium}
          setMaxPremium={setMaxPremium}
          minCoverage={minCoverage}
          setMinCoverage={setMinCoverage}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          onSubmit={handleSubmit}
          onReset={resetFilters}
        />
        {loading ? (
          <div className="loading-message">Loading policies...</div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <button className="retry-button" onClick={fetchAllPolicies}>
              Retry
            </button>
          </div>
        ) : (
          <PolicyTable
            policies={policies}
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalElements={totalElements}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>
    </div>
  );
};

export default Home;