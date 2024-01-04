import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function VisaResult() {
  const navigate = useNavigate();
  return (
    <Container
      className="mt-5 ml-5 mr-5"
      style={{ padding: "2em 4em 0 4.5em" }}
    >
      <h1 className="font-weight-bold">
        You need a visa to join your family or partner in the UK
      </h1>
      <h3>The visa you need depends on their situation</h3>
      <h2 className="font-weight-bold mt-5">
        They’re working or studying in the UK
      </h2>
      <h3 className="mb-5">
        You may be able to apply as a ‘dependant’ of your family member’s visa
        category.
      </h3>
      <h2 className="font-weight-bold">
        They’re not working or studying in the UK
      </h2>
      <h3>
        You can apply for a Standard Visitor visa. Your visit must be for 6
        months or less.
      </h3>
      <div className="d-flex justify-content-start gap-5 mt-5">
        <Button variant="secondary" onClick={() => navigate("/visa-check/")}>
          Start Again
        </Button>
        <Button variant="primary" onClick={() => navigate("/")}>
          Continue
        </Button>
      </div>
    </Container>
  );
}

export default VisaResult;
