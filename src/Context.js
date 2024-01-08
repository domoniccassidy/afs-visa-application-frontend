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
    tripDetails: {
      arrivalDate: null,
      departureDate: null,
      phoneNumber: null,
      email: null,
    },
    homeCountryName: null,
    destinationCountryName: null,
    visa: null,
    additionalInformation: [],
  });

  const languages = [
    { value: "en", text: "English" },
    { value: "it", text: "Italian" },
  ];

  const saveVisaApplication = (visaApplication) => {
    setVisaApplication(visaApplication);
    console.log(visaApplication);
    localStorage.setItem("visaApplication", JSON.stringify(visaApplication));
  };

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
        saveVisaApplication,
      }}
    >
      {children}{" "}
    </Context.Provider>
  );
};
