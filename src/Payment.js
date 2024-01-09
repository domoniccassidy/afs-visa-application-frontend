import React, { useContext, useState } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { IMaskInput } from "react-imask";
import { MaskedRange } from "imask";
import Checkbox from "./images/checkbox.png";
import Cross from "./images/cross.png";
import { useNavigate } from "react-router";
import { Context } from "./Context";
import { createApplication } from "./services/applicationService";

function Payment() {
  const { visaApplication } = useContext(Context);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    name: null,
    number: null,
    expiry: null,
    securityCode: null,
    fail: null,
  });
  const navigate = useNavigate();

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const handleCompleteApplication = () => {
    const application = {
      visaApplicationId: crypto.randomUUID(),
      originCountryId: visaApplication.homeCountryId,
      destinationCountryId: visaApplication.destinationCountryId,
      visaId: visaApplication.visa.visaId,
      arrivalDate: visaApplication.tripDetails.arrivalDate,
      departureDate: visaApplication.tripDetails.departureDate,
      email: visaApplication.tripDetails.email,
      phoneNumber: visaApplication.tripDetails.phoneNumber,
      branchId: visaApplication.appointment.branchId,
    };

    if (visaApplication.appointment.date == null) {
      const appointment = {
        appointmentId: crypto.randomUUID(),
        branchId: visaApplication.appointment.branchId,
        date: visaApplication.appointment.date,
      };
      // bookAppointment(appointment);
    }
    if (visaApplication.documentation.length > 0) {
      // This is not a real endpoint in the prototype, but this would upload the documentation to blob storage
      // uploadDocumentation();
    }
    console.log(application);
    createApplication(application);
  };

  return (
    <Container
      className="mt-5 ml-5 mr-5"
      style={{ padding: "2em 4em 0 4.5em" }}
    >
      <Modal
        show={paymentComplete}
        backdrop="static"
        centered
        dialogClassName="rounded"
      >
        <div className="align-items-center text-center">
          {" "}
          <img
            className={paymentDetails.fail && "d-none"}
            src={Checkbox}
            alt=""
            style={{ width: "100px" }}
          />
          <img
            className={!paymentDetails.fail && "d-none"}
            src={Cross}
            alt=""
            style={{ width: "100px" }}
          />
        </div>
        <Modal.Header className="justify-content-center pb-1">
          <Modal.Title className="font-weight-bold">
            Payment {paymentDetails.fail ? "Failed" : "Successful"}
          </Modal.Title>
        </Modal.Header>{" "}
        <Modal.Body className="text-center pt-0">
          <p>
            {paymentDetails.fail
              ? "There has been an error with your payment"
              : "Your application will be reviewed shortly"}
          </p>
          <Button
            className={paymentDetails.fail && "d-none"}
            onClick={() => navigate("/")}
          >
            Home Page
          </Button>
          <Button
            className={!paymentDetails.fail && "d-none"}
            onClick={() => setPaymentComplete(false)}
          >
            Try Again
          </Button>
        </Modal.Body>
      </Modal>
      <Row className="pb-5">
        <h1 style={{ fontWeight: "700" }}>
          {visaApplication.destinationCountryName} -{" "}
          {visaApplication.visa.visaType}
        </h1>
        <Col>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              var random = getRandomInt(0, 2);
              setPaymentDetails({
                ...paymentDetails,
                fail: random == 0 ? true : false,
              });
              if (random == 1) {
                handleCompleteApplication();
              }
              setPaymentComplete(true);
            }}
          >
            <div className="application-form mb-2">
              <h2 className="font-weight-bold mb-4">Payment</h2>
              <Form.Group className="mb-3">
                <Form.Label>Card Holder Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <div className="card-info">
                <Form.Group className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <IMaskInput
                    mask="0000-0000-0000-0000"
                    className="form-control"
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        number: e.target.value,
                      })
                    }
                  ></IMaskInput>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Expiry Date</Form.Label>
                  <IMaskInput
                    className="form-control"
                    mask="M{/}Y"
                    blocks={{
                      M: {
                        mask: MaskedRange,
                        from: 1,
                        to: 12,
                        maxLength: 2,
                      },
                      Y: {
                        mask: MaskedRange,
                        from: 0,
                        to: 99,
                        maxLength: 2,
                      },
                    }}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        expiry: e.target.value,
                      })
                    }
                  ></IMaskInput>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Security Code</Form.Label>
                  <IMaskInput
                    mask="000"
                    className="form-control"
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        securityCode: e.target.value,
                      })
                    }
                  ></IMaskInput>
                </Form.Group>
              </div>
            </div>
            <Button
              className="mt-5"
              variant="primary"
              type="submit"
              disabled={
                !paymentDetails.name ||
                !paymentDetails.number ||
                !paymentDetails.expiry ||
                !paymentDetails.securityCode
              }
            >
              Complete Application
            </Button>
          </Form>
        </Col>
        <Col>
          <div className="application-form ml-5">
            <h2 className="font-weight-bold mb-5">Costs</h2>
            <div className="cost mb-3">
              <span>
                {visaApplication.visa.offeringCountry.name} -{" "}
                {visaApplication.visa.visaType} (1)
              </span>
              <span>£{visaApplication.visa.price}</span>
            </div>
            <div className="cost mb-3">
              <span>AFS Processing Fee</span>
              <span>£50</span>
            </div>
            <div className="cost font-weight-bold mt-5">
              <span>Total</span>
              <span>£{visaApplication.visa.price + 50}</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;
