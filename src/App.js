import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import VisaSelection from "./VisaSelection";
import Application from "./Application";
import Payment from "./Payment";
import VisaCheck from "./VisaCheck";
import VisaResult from "./VisaResult";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/visa-selection" element={<VisaSelection />}></Route>
      <Route path="/application" element={<Application />}></Route>
      <Route path="/payment" element={<Payment />}></Route>
      <Route path="/visa-check" element={<VisaCheck />}></Route>
      <Route path="/visa-result" element={<VisaResult />}></Route>
    </Routes>
  );
}

export default App;
