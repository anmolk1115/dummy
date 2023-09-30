import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { airportActions } from "./actions/airportAction";
import AirportContainer from "./components/AirportContainer";

const SearchBar = () => {
  const [departureAirport, setDepartureAirports] = useState("");
  const [arrivalAirports, setArrivalAirports] = useState("");
  const [showModal, setShowModal] = useState(false);
  const airportModalLabels = {
    airport: 'Airport',
    country: 'Country',
    closeCTA: 'Close'
  };

  const initModal = () => {
    setShowModal(!showModal);
  };
  const dispatch = useDispatch();
  const airportResponseData = useSelector((state) => state?.reducer?.Details);

  useEffect(() => {
    dispatch(airportActions());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <div className="card col-lg-12">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-5 col-md-6">
                <div
                  className="search-element-container"
                  data-testid="custom-element"
                >
                  <AirportContainer
                    type={"departure"}
                    data={airportResponseData}
                    onSelect={(depAirport) => setDepartureAirports(depAirport)}
                    setDepartureAirports={setDepartureAirports}
                  />
                </div>
              </div>
              <div className="col-lg-5 col-md-6">
                <div className="search-element-container">
                  <AirportContainer
                    type={"arrival"}
                    data={[...airportResponseData].reverse()}
                    onSelect={(airport) => setArrivalAirports(airport)}
                    setArrivalAirports={setArrivalAirports}
                  />
                </div>
              </div>
              <div className="col-lg-2 col-md-12">
                <div className="search-element-container">
                  <button
                    type="button"
                    disabled={!arrivalAirports || !departureAirport}
                    onClick={initModal}
                    className="continue-btn"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>Airport Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <p>{airportModalLabels.airport}: {departureAirport.name}</p>
                <p>{airportModalLabels.country}: {departureAirport.country}</p>
              </div>
              <div className="col-lg-2"></div>
              <div className="col-lg-5">
                <p>{airportModalLabels.airport}: {arrivalAirports.name}</p>
                <p>{airportModalLabels.country}: {arrivalAirports.country}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="continue-btn" onClick={initModal}>
            {airportModalLabels.closeCTA}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SearchBar;
