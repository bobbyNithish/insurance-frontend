// Base URL for API calls
const API_BASE_URL = "http://localhost:8080/api/policies";

// Get all policies with pagination
export const getAllPolicies = async (page = 0, size = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}?page=${page}&size=${size}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching all policies:", error);
    throw error;
  }
};

// Search policies by name with pagination
export const searchPoliciesByName = async (name, page = 0, size = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?name=${encodeURIComponent(name)}&page=${page}&size=${size}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error searching policies:", error);
    throw error;
  }
};

// Filter policies by type with pagination
export const filterPoliciesByType = async (type, page = 0, size = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/filterByType?type=${encodeURIComponent(type)}&page=${page}&size=${size}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error filtering policies by type:", error);
    throw error;
  }
};

// Filter policies by premium range (keeping this as is since it's not in your updated controller)
export const filterPoliciesByPremium = async (min, max, page = 0, size = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/filterByPremium?min=${min}&max=${max}&page=${page}&size=${size}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error filtering policies by premium:", error);
    throw error;
  }
};
