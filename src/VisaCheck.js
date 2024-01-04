import React, { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useNavigate } from "react-router";

function VisaCheck() {
  const [selectedReasonForTravel, setSelectedReasonForTravel] = useState(null);
  const [extraVisaInformation, setExtraVisaInformation] = useState({
    familyImmigrationStatus: null,
    familyCitizenship: null,
  });
  const [isSelectedReasonForTravel, setIsSelectedReasonForTravel] =
    useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!isSelectedReasonForTravel) {
      setIsSelectedReasonForTravel(true);
    } else {
      navigate("/visa-result");
    }
  };

  return (
    <Container className="m-5" style={{ padding: "2em 4em 0 4.5em" }}>
      <Row>
        <h1 className="font-weight-bold">Check if you need a visa</h1>
        <div className={isSelectedReasonForTravel && "d-none"}>
          <h3>What is your reason for travel to The United Kingdom?</h3>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={selectedReasonForTravel}
            onChange={(e) => setSelectedReasonForTravel(e.target.value)}
            className="mt-3"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 36,
                color: "black",
              },
            }}
          >
            <FormControlLabel
              control={<Radio />}
              value="Tourism"
              label="Tourism"
            />
            <FormControlLabel
              control={<Radio />}
              value="Work, Acadmeic"
              label="Work, Acadmeic"
            />
            <FormControlLabel
              control={<Radio />}
              value="Join partner or family for a long stay"
              label="Join partner or family for a long stay"
            />
            <FormControlLabel
              control={<Radio />}
              value="Get married or enter into a civil partnership"
              label="Get married or enter into a civil partnership"
            />
            <FormControlLabel
              control={<Radio />}
              value="Stay with your child, if they’re at school"
              label="Stay with your child, if they’re at school"
            />
            <FormControlLabel
              control={<Radio />}
              value="Have medical treatment"
              label="Have medical treatment"
            />
            <FormControlLabel
              control={<Radio />}
              value="For official diplomatic or government business"
              label="For official diplomatic or government business"
            />
          </RadioGroup>
        </div>
        <div className={!isSelectedReasonForTravel && "d-none"}>
          <h3>
            Does your partner or family member have any of the following types
            of UK immigration status?
          </h3>
          <ul style={{ fontSize: "20px" }}>
            <li>British citizenship</li>
            <li>settlement (called having ‘indefinite leave to remain’)</li>
            <li>
              settled or pre-settled status under the EU Settlement Scheme
            </li>
            <li>a Turkish worker or businessperson visa</li>
          </ul>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={extraVisaInformation.familyImmigrationStatus}
            onChange={(e) =>
              setExtraVisaInformation({
                ...extraVisaInformation,
                familyImmigrationStatus: e.target.value,
              })
            }
            className="mt-3"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 36,
                color: "black",
              },
            }}
          >
            <FormControlLabel control={<Radio />} value="Yes" label="Yes" />
            <FormControlLabel control={<Radio />} value="No" label="No" />
          </RadioGroup>
          <h3>
            Is your partner or family member from the EU, Switzerland, Norway,
            Iceland or Liechtenstein?
          </h3>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={extraVisaInformation.familyCitizenship}
            onChange={(e) =>
              setSelectedReasonForTravel(
                setExtraVisaInformation({
                  ...extraVisaInformation,
                  familyCitizenship: e.target.value,
                })
              )
            }
            className="mt-3"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 36,
                color: "black",
              },
            }}
          >
            <FormControlLabel control={<Radio />} value="Yes" label="Yes" />
            <FormControlLabel control={<Radio />} value="No" label="No" />
          </RadioGroup>
        </div>
      </Row>
      <Button
        variant="primary"
        onClick={handleContinue}
        style={{ width: "100px", marginTop: "1em" }}
      >
        Continue
      </Button>
    </Container>
  );
}

export default VisaCheck;
