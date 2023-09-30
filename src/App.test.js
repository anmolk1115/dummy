/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen, fireEvent } from "@testing-library/react";
import AirportContainer from "./components/AirportContainer";
import AirportData from "../public/resources/dummy-airport-list.json";

test("DepartureAirport country should available in dropdown", () => {
  const { container } = render(
    <AirportContainer type={"departure"} data={AirportData} />
  );

  const airportCountry = container.querySelector(
    '[data-testid="airport-country"]'
  );
  console.log("airportCountry =>", airportCountry);
  expect(airportCountry).toBeDefined();
});

test("To test whether airport name is there in suggestions list for departure airport", () => {
  const { container } = render(
    <AirportContainer type={"departure"} data={AirportData} />
  );

  const searchBarInput = container.querySelector(
    '[data-testid="search-bar-input"]'
  );
  fireEvent.click(searchBarInput);
  expect(screen.getByText("Anaa Airport")).toBeDefined();
});

test("Arrival Airport country should available in dropdown", () => {
  const { container } = render(
    <AirportContainer type={"arrival"} data={AirportData} />
  );

  const airportCountry = container.querySelector(
    '[data-testid="airport-country"]'
  );
  console.log("airportCountry =>", airportCountry);
  expect(airportCountry).toBeDefined();
});

test("To test whether airport name is there in suggestions list for arrival airport", () => {
  const { container } = render(
    <AirportContainer type={"arrival"} data={AirportData} />
  );

  const searchBarInput = container.querySelector(
    '[data-testid="search-bar-input"]'
  );
  fireEvent.click(searchBarInput);
  expect(screen.getByText("Anaa Airport")).toBeDefined();
});
