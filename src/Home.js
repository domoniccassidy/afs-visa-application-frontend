import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Woman from "./images/woman.png";
import { Context } from "./Context";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { getCountries } from "./services/countryService";
import { useState } from "react";

function Home() {
  const { darkMode, selectedLanguage, visaApplication, setVisaApplication } =
    useContext(Context);
  const [countries, setCountries] = useState([]);

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      getCountries().then((res) => {
        setCountries(res.data);
      });
    };
  }, []);

  return (
    <div>
      <Container className="mt-5 ml-5 mr-5">
        <Row style={{ padding: "2em 4em 0 4em" }}>
          <Col>
            <h1 style={{ fontWeight: "700" }}>
              {t("title")}... <br />
              {t("subtitle")}
            </h1>
            <div style={{ paddingRight: "15rem" }}>
              <p
                style={{ color: "#52525B" }}
                className={darkMode && "off-white-text"}
              >
                {t("description")}
              </p>
              <Form>
                <Form.Group className="mb-3" controlId="Origin-Country">
                  <Form.Label>Origin Country</Form.Label>
                  <Form.Select
                    aria-label="Origin Country"
                    className={darkMode && "dark-select"}
                    onChange={(e) =>
                      setVisaApplication({
                        ...visaApplication,
                        homeCountryId: e.target.value,
                        homeCountryName:
                          e.target.options[e.target.selectedIndex].text,
                      })
                    }
                  >
                    <option>{t("origin")}</option>
                    {countries.map((country) => {
                      return (
                        <option value={country.countryId}>
                          {t(country.name)}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Destination-Country">
                  <Form.Label>Destination Country</Form.Label>
                  <Form.Select
                    aria-label="Destination Country"
                    className={darkMode && "dark-select"}
                    onChange={(e) =>
                      setVisaApplication({
                        ...visaApplication,
                        destinationCountryId: e.target.value,
                        destinationCountryName:
                          e.target.options[e.target.selectedIndex].text,
                      })
                    }
                  >
                    <option>{t("destination")}</option>
                    {countries.map((country) => {
                      return (
                        <option value={country.countryId}>
                          {t(country.name)}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </Form>
              <div className="d-flex justify-content-between">
                <Button
                  variant="secondary"
                  onClick={() =>
                    navigate("/visa-check/?lng=" + selectedLanguage)
                  }
                >
                  {t("need_visa")}
                </Button>{" "}
                <Button
                  variant="primary"
                  onClick={() =>
                    navigate("/visa-selection/?lng=" + selectedLanguage)
                  }
                  disabled={
                    !visaApplication.homeCountryId ||
                    !visaApplication.destinationCountryId
                  }
                >
                  {t("begin")}
                </Button>
              </div>
            </div>
          </Col>
          <Col>
            <img style={{ width: "600px" }} src={Woman} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
