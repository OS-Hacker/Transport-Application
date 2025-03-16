import React, { useState, useCallback } from "react";

const FiltersContext = React.createContext();

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    vehicleType: [],
    load: "",
    location: "",
    ratings: "",
    quickResponse: false,
    popular: false,
  });

  const setSelectedFilters = useCallback((updater) => {
    setFilters((prevFilters) => {
      const updatedFilters =
        typeof updater === "function" ? updater(prevFilters) : updater;
      return updatedFilters;
    });
  }, []);

  console.log("useFilters context updated:", filters); // Debugging

  return (
    <FiltersContext.Provider value={{ selectedFilters: filters, setSelectedFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => React.useContext(FiltersContext);