import React, { useContext, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Context } from "./Context";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const {
    darkMode,
    selectedLanguage,
    setDarkMode,
    setSelectedLanguage,
    languages,
  } = useContext(Context);
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    document.body.className = darkMode && "dark-mode";
  }, [darkMode]);
  return (
    <Navbar
      expand="lg"
      className={
        "bg-body-tertiary justify-content-between " +
        (darkMode == true && "dark-mode-nav")
      }
    >
      <Container>
        <Navbar.Brand className={darkMode && "white-text"}>
          /Advanced Foreign Services
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className={darkMode && "white-text"}>
            <Link to={"/" + "?lng=" + selectedLanguage}> {t("home")}</Link>
          </Nav.Link>
          <Nav.Link href="#" className={darkMode && "white-text"}>
            {t("applications")}
          </Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end gap-3">
          <div className="dropdown ">
            <FontAwesomeIcon icon={faGear} className="dropdown-link" />
            <div
              className={
                "dropdown-box" + (darkMode ? " dark-mode-container" : "")
              }
            >
              <div className="setting">
                <div className="setting-text">{t("dark")}</div>
                <div className="setting-value form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    selected={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                </div>
              </div>
              <div className="setting ">
                <div className="setting-text">{t("language")}</div>
                <div className="setting-value">
                  <select
                    className="form-select custom-select"
                    style={{
                      background: "black",
                      padding: "0 2.25rem 0 0.75rem",
                      color: "white",
                    }}
                    onChange={(e) => {
                      setSelectedLanguage(e.target.value);
                      console.log(e.target.value);
                      let loc = "http://localhost:3000" + location.pathname;
                      window.location.replace(loc + "?lng=" + e.target.value);
                    }}
                  >
                    {languages.map((l) => {
                      return (
                        <option
                          selected={l.value == selectedLanguage}
                          value={l.value}
                        >
                          {t(l.text)}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <Navbar.Text className={darkMode && "white-text"}>
            {t("welcome")}, Domonic
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
