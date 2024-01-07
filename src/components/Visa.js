import React from "react";

function Visa({ visa, visaSelected, handleVisaSelection }) {
  return (
    <div onClick={handleVisaSelection}>
      <div className={"visa " + (visaSelected && "selected-visa")}>
        {visa.daysValid <= 365 ? (
          <span>Valid for {visa.daysValid / 31} months</span>
        ) : (
          <span>Valid for {visa.daysValid / 365} years</span>
        )}
        <h4 style={{ fontWeight: "700" }}>{visa.visaType}</h4>
        <span className={visa.entryTimes && "d-none"}>Unlimited Entry</span>
        <span className={visa.entryTimes != 1 && "d-none"}>Single Entry</span>
        <span className={visa.entryTimes != 2 && "d-none"}>Double Entry</span>

        <h4 style={{ fontWeight: "700" }}>£{visa.price}</h4>
        <input
          type="radio"
          style={{
            width: "2em",
            height: "2em",
          }}
          checked={visaSelected}
        />
      </div>
    </div>
  );
}

export default Visa;
