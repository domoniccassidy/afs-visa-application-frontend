import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { IMaskInput } from "react-imask";
import { MaskedRange } from "imask";
import Checkbox from "./images/checkbox.png";
import { useNavigate } from "react-router";

function Payment() {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    name: null,
    number: null,
    expiry: null,
    securityCode: null,
  });
  const navigate = useNavigate();
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
          <img src={Checkbox} alt="" style={{ width: "100px" }} />
        </div>
        <Modal.Header className="justify-content-center pb-1">
          <Modal.Title className="font-weight-bold">
            Payment Successful
          </Modal.Title>
        </Modal.Header>{" "}
        <Modal.Body className="text-center pt-0">
          <p>Your application will be reviewed shortly</p>
          <Button onClick={() => navigate("/")}>Home Page</Button>
        </Modal.Body>
      </Modal>
      <Row className="pb-5">
        <h1 style={{ fontWeight: "700" }}>United Kingdom - Visitor Visa</h1>
        <Col>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
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
              <span>United Kingdom - Visitor Visa (1)</span>
              <span>£115</span>
            </div>
            <div className="cost mb-3">
              <span>AFS Processing Fee</span>
              <span>£50</span>
            </div>
            <div className="cost font-weight-bold mt-5">
              <span>Total</span>
              <span>£165</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;
