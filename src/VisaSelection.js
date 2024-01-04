import React, { useContext, useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router";
import { Context } from "./Context";
import { getVisasByHomeAndDestinationCountry } from "./services/visaService";
import Visa from "./components/Visa";

function VisaSelection() {
  const { selectedLanguage, visaApplication, setVisaApplication } =
    useContext(Context);
  const [availableVisas, setAvailableVisas] = useState([]);
  const [selectedVisa, setSelectedVisa] = useState({
    visaId: null,
  });
  const [visaRequired, setVisaRequired] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getVisasByHomeAndDestinationCountry(
      visaApplication.homeCountryId,
      visaApplication.destinationCountryId
    ).then((res) => {
      console.log(res.data);
      setAvailableVisas(res.data);
      if (res.data.length > 0) {
        setVisaRequired(true);
      } else {
        setVisaRequired(false);
      }
    });
  }, []);

  return (
    <Container
      className="mt-5 ml-5 mr-5"
      style={{ padding: "2em 4em 0 4.5em" }}
    >
      <Row className="pb-5">
        <Col>
          <h1 style={{ fontWeight: "700" }}>
            {visaApplication.destinationCountryName}
          </h1>
          <h2>From {visaApplication.homeCountryName}</h2>
        </Col>
        <Col></Col>
        <h2 style={{ fontWeight: "700", marginTop: "2em" }}>Visa</h2>
        <p className={!visaRequired && "d-none"} style={{ color: "red" }}>
          Required for Travel
        </p>
        <p
          className={(visaRequired == true || visaRequired == null) && "d-none"}
          style={{ color: "green" }}
        >
          No visa is required for travel
        </p>
        <div className="visas-container">
          {availableVisas.map((visa) => {
            return (
              <Visa
                visa={visa}
                visaSelected={selectedVisa.visaId == visa.visaId}
                handleVisaSelection={() => setSelectedVisa(visa)}
              />
            );
          })}
        </div>
      </Row>
      <Button
        variant="primary"
        className={"mt-5 " + (!visaRequired && "d-none")}
        disabled={!selectedVisa.visaId}
        onClick={() => {
          setVisaApplication({ ...visaApplication, visa: selectedVisa });
          navigate("/application/?lng=" + selectedLanguage);
        }}
      >
        Apply Now
      </Button>
    </Container>
  );
}

export default VisaSelection;
