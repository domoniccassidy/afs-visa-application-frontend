import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useContext } from "react";
import { Context } from "./Context";

function Application() {
  const { visaApplication, saveVisaApplication } = useContext(Context);
  const [isTripDetails, setIsTripDetails] = useState(true);
  const [tripDetails, setTripDetails] = useState({
    arrivalDate: null,
    departureDate: null,
    phoneNumber: null,
    email: null,
  });
  const [documentation, setDocumentation] = useState(null);
  const [appointment, setAppointment] = useState({
    location: null,
    date: null,
  });

  const navigate = useNavigate();

  const onSubmitTripDetails = (e) => {
    e.preventDefault();
    setIsTripDetails(false);
    if (
      visaApplication.visa.documentationRequired.length === 0 &&
      !visaApplication.visa.appointmentRequired
    ) {
      navigate("/payment");
    }
  };

  const onSubmitSupportingItems = (e) => {
    e.preventDefault();
    navigate("/payment");
  };

  return (
    <Container
      className="mt-5 ml-5 mr-5"
      style={{ padding: "2em 4em 0 4.5em" }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <Row className="pb-5">
          <h1 style={{ fontWeight: "700" }}>
            {visaApplication.destinationCountryName} -{" "}
            {visaApplication.visa.visaType}
          </h1>
          <Col>
            <Form
              className={!isTripDetails && "d-none"}
              onSubmit={onSubmitTripDetails}
            >
              <div className="application-form mb-2">
                {" "}
                <h2 className="font-weight-bold mb-4">Trip-Details</h2>
                <Form.Group className="mb-3 d-flex flex-column">
                  <Form.Label>
                    When do you arrive at your destination?
                  </Form.Label>
                  <DatePicker
                    className="date-picker"
                    value={tripDetails.arrivalDate}
                    onChange={(newValue) =>
                      setTripDetails({
                        ...tripDetails,
                        arrivalDate: newValue,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3 d-flex flex-column">
                  <Form.Label>
                    When do you depart from your destination?
                  </Form.Label>
                  <DatePicker
                    className="date-picker"
                    value={tripDetails.departureDate}
                    onChange={(newValue) =>
                      setTripDetails({
                        ...tripDetails,
                        departureDate: newValue,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    value={tripDetails.phoneNumber}
                    type="tel"
                    onChange={(e) => {
                      const re = /^[0-9\b]+$/;
                      if (e.target.value === "" || re.test(e.target.value)) {
                        setTripDetails({
                          ...tripDetails,
                          phoneNumber: e.target.value,
                        });
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={tripDetails.email}
                    onChange={(e) =>
                      setTripDetails({
                        ...tripDetails,
                        email: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                {visaApplication.visa.additionalInformation.map((info, key) => {
                  console.log(info);
                  return (
                    <Form.Group className="mb-3">
                      <Form.Label>{info.informationTitle}</Form.Label>
                      <Form.Control
                        value={visaApplication.additionalInformation[key]}
                        onChange={(e) => {
                          var tempArray = [
                            ...visaApplication.additionalInformation,
                          ];
                          tempArray[key] = e.target.value;
                          saveVisaApplication({
                            ...visaApplication,
                            additionalInformation: tempArray,
                          });
                        }}
                        type={info.informationDataType}
                      />
                    </Form.Group>
                  );
                })}
              </div>

              <Button
                className="mt-5"
                variant="primary"
                type="submit"
                disabled={
                  tripDetails.arrivalDate == null ||
                  tripDetails.departureDate == null ||
                  tripDetails.phoneNumber == null ||
                  tripDetails.email == null
                }
              >
                Save and Continue
              </Button>
            </Form>
            <Form
              className={isTripDetails && "d-none"}
              onSubmit={onSubmitSupportingItems}
            >
              <div
                className={
                  "application-form " +
                  (visaApplication.visa.documentationRequired.length == 0 &&
                    "d-none")
                }
              >
                <Form.Group className="mb-3">
                  <h2 className="font-weight-bold mb-4">Documentation</h2>
                  <Form.Label>Passport Details</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setDocumentation(e.target.files[0])}
                  />
                </Form.Group>
              </div>
              <div
                className={
                  "application-form " +
                  (!visaApplication.visa.appointmentRequired && "d-none")
                }
              >
                <Form.Group className="mb-3">
                  <h2 className="font-weight-bold mb-4">Appointment</h2>
                  <Form.Label>Appointment Location</Form.Label>
                  <Form.Select
                    value={appointment.location}
                    onChange={(e) =>
                      setAppointment({
                        ...appointment,
                        location: e.target.value,
                      })
                    }
                    aria-label="Appointment Location"
                  >
                    <option>Choose a Location</option>
                    <option>Beijing Branch</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 d-flex flex-column">
                  <Form.Label>Appointment Date</Form.Label>
                  <DatePicker
                    className="date-picker"
                    value={appointment.date}
                    onChange={(value) =>
                      setAppointment({ ...appointment, date: value })
                    }
                  />
                </Form.Group>
                <Form.Group className="d-flex flex-column">
                  <Form.Label>Appointment Time</Form.Label>
                  <TimePicker className="date-picker"></TimePicker>
                </Form.Group>
              </div>
              <Button
                className="mt-5"
                variant="primary"
                type="submit"
                disabled={
                  (documentation == null &&
                    visaApplication.visa.documentationRequired.length > 0) ||
                  ((appointment.date == null || appointment.location == null) &&
                    visaApplication.visa.appointmentRequired)
                }
              >
                Save and Continue
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </LocalizationProvider>
    </Container>
  );
}

export default Application;
