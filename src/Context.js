import { createContext, useState } from "react";

export const Context = createContext("");

export const Provider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    new URLSearchParams(window.location.search).get("lng")
  );
  const [visaApplication, setVisaApplication] = useState({
    visaApplicationId: null,
    homeCountryId: null,
    destinationCountryId: null,
    homeCountryName: null,
    destinationCountryName: null,
    visa: null,
  });

  const languages = [
    { value: "en", text: "English" },
    { value: "it", text: "Italian" },
  ];

  return (
    <Context.Provider
      value={{
        darkMode,
        selectedLanguage,
        visaApplication,
        setDarkMode,
        setSelectedLanguage,
        setVisaApplication,
        languages,
      }}
    >
      {children}{" "}
    </Context.Provider>
  );
};
