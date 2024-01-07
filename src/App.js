import { Route, Routes, json } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import VisaSelection from "./VisaSelection";
import Application from "./Application";
import Payment from "./Payment";
import VisaCheck from "./VisaCheck";
import VisaResult from "./VisaResult";
import { useContext, useEffect, useState } from "react";
import { Context } from "./Context";

function App() {
  const { visaApplication, setVisaApplication } = useContext(Context);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const visaApplication = JSON.parse(localStorage.getItem("visaApplication"));
    console.log(visaApplication);
    if (visaApplication) setVisaApplication(visaApplication);
    setLoaded(true);
  }, []);

  return (
    loaded && (
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/visa-selection" element={<VisaSelection />}></Route>
        <Route path="/application" element={<Application />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/visa-check" element={<VisaCheck />}></Route>
        <Route path="/visa-result" element={<VisaResult />}></Route>
      </Routes>
    )
  );
}

export default App;
