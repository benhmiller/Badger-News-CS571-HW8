import { createContext, useContext, useState } from 'react';

// Create New Context for Preference
const PreferencesContext = createContext();

// Define a provider component for managing user preferences
// Define Provider Component to Manage User Preferences
export const PreferencesProvider = ({ children }) => {
  // State to store user preferences
  const [userPreferences, setUserPreferences] = useState({});

  // Function to Toggle a Preference
  const togglePreference = (tag) => {
    setUserPreferences((prevPreferences) => ({
      ...prevPreferences,
      [tag]: !prevPreferences[tag],
    }));
  };

  // Function to Add Tags to Preferences
  const addTags = (tags) => {
    const newPreferences = { ...userPreferences };
    tags.forEach((tag) => {
      newPreferences[tag] = true;
    });
    setUserPreferences(newPreferences);
  };

  // Create Sharable Object of Values and Functions
  const contextValue = {
    userPreferences,
    togglePreference,
    addTags,
  };

  // Provide Context Values to Children Components
  return (
    <PreferencesContext.Provider value={contextValue}>
      {children}
    </PreferencesContext.Provider>
  );
};

// Define New Hook for Using Preferences Context
export const usePreferences = () => {
  return useContext(PreferencesContext);
};