import React, { useEffect, useMemo, useRef, useState } from "react";
import AirportSuggestionItem from "./AirportSuggestion";

const AirportContainer = ({
  data,
  onSelect,
  type,
  setArrivalAirports = Function.prototype,
  setDepartureAirports = Function.prototype,
}) => {
  const [isVisible, setVisibility] = useState(false);
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState("");

  const departureAirport = type && type === "departure";
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchResultRef = useRef(null);
  const searchContainer = useRef(null);

  const scrollIntoView = (position) => {
    searchResultRef.current.parentNode.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  
  const suggestions = useMemo(() => {
    if (!search) return data;
    setCursor(-1);
    scrollIntoView(0);
    
    return data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  useEffect(() => {
    if (cursor < 0 || cursor > suggestions?.length || !searchResultRef) {
      return () => {};
    }

    let listItems = Array.from(searchResultRef.current.children);
    listItems[cursor] && scrollIntoView(listItems[cursor].offsetTop);
  }, [cursor]);
  
  const showSuggestion = () => setVisibility(true);
  const hideSuggestion = () => setVisibility(false);

  const handleClickOutside = (event) => {
    if (
      searchContainer.current &&
      !searchContainer.current.contains(event.target)
    ) {
      hideSuggestion();
    }
  };

  const keyBoardNavigation = (event) => {
    const key = event.key;
    if (key === "ArrowDown") {
      isVisible
        ? setCursor((c) => (suggestions.length - 1 ? c + 1 : c))
        : showSuggestion();
    }

    if (key === "ArrowUp") {
      setCursor((c) => (c > 0 ? c - 1 : 0));
    }

    if (key === "Escape") {
      hideSuggestion();
    }

    if (key === "Enter" && cursor > 0) {
      setSearch(suggestions[cursor].name);
      hideSuggestion();
      onSelect(suggestions[cursor]);
    }
  };

  const clearSearchValue = () => {
    departureAirport ? setDepartureAirports("") : setArrivalAirports("");
    setSearch("");
    showSuggestion();
  };

  return (
    <div className=" position-relative" ref={searchContainer}>
      <input
        type="text"
        name="search"
        className="form-control"
        autoComplete="off"
        value={search}
        placeholder={
          (departureAirport ? "Departure" : "Arrival") + " Airport"
        }
        onClick={showSuggestion}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => keyBoardNavigation(e)}
        data-testid="search-bar-input"
      />
      {search ? (
        <span
          className="position-absolute cross-icon"
          onClick={clearSearchValue}
        >
          X
        </span>
      ) : null}
      <div
        className={`search-result ${isVisible ? "visible" : "invisible"}`}
        data-testid={`search-result-${
          departureAirport ? "departure" : "arrival"
        }`}
      >
        <ul className="list-group" ref={searchResultRef}>
          {suggestions?.map((item, index) => {
            return (
              <AirportSuggestionItem
                key={item.name}
                onSelectItem={() => {
                  hideSuggestion();
                  setSearch(item.name);
                  onSelect(item);
                }}
                isHighlighted={cursor === index}
                {...item}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AirportContainer;
