import React, { useState, useEffect } from "react";
import classes from "./Location.module.css";
import { ReactComponent as LocationIcon } from "../../../assets/LocationIcon.svg";
import { ReactComponent as PinCodeIcon } from "../../../assets/pincodeIcon.svg";
import { useLocationContext } from "../../../contexts/locationModalContext";
import { City } from "country-state-city";
import { createPortal } from "react-dom";

const LocationModal = () => {

  const [inputText, setInputText] = useState("");

  const {
    setLocation,
    setLatitude,
    setLongitude,
    islocationModalVisible,
    closeLocationModal,
  } = useLocationContext();

  const [suggestions, setSuggestions] = useState([]);

  const reverseGeocode = async (latitude, longitude) => {
    const data = await fetch(
      `https://apis.mappls.com/advancedmaps/v1/b9b5654ced874cfc9b71f2ed60eb6542/rev_geocode?lat=${latitude}&lng=${longitude}&region=IND`
    );
    const resdata = await data.json();
    const { city, state, area } = resdata.results[0];
    setLocation(city, state, area);
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          reverseGeocode(position.coords.latitude, position.coords.longitude);
          closeLocationModal();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  const fetchSuggestions = () => {
    if (inputText.length >= 3) {
      const cities = City.getCitiesOfCountry("IN");
      const filteredCities = cities.filter((city) =>
        city.name.toLowerCase().startsWith(inputText.toLowerCase())
      );
      setSuggestions(filteredCities);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeLocationModal();
    }
  };

  const fetchCityDetails = (city) => {
    setLatitude(city.latitude);
    setLongitude(city.longitude);
    reverseGeocode(city.latitude, city.longitude);
    closeLocationModal();
  };

  useEffect(() => {
    fetchSuggestions();
  }, [inputText]);

  return (
    <>
      {islocationModalVisible && (
        <div className={classes.backdrop} onClick={handleBackdropClick}>
          <div className={classes.locationContainer}>
            <div className={classes.locationHeader}>
              <div className={classes.closeIcon} onClick={closeLocationModal}>
                <span>&#10799; </span>
              </div>

              <div className={classes.locationInputContainer}>
                <input
                  className={classes.locationInput}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Search for area, street name.."
                />
              </div>
            </div>

            <div
              className={classes.currentLocationContainer}
              onClick={() => {
                fetchCurrentLocation();
              }}
            >
              <div className={classes.currentLocation}>
                <div className={classes.currentLocationIcon}>
                  <LocationIcon />
                </div>
                <div>
                  <p className={classes.currentLocationText}>
                    Get Current Location
                  </p>
                  <p className={classes.usingGps}>Using GPS</p>
                </div>
              </div>
            </div>

            <div className={classes.suggestionContainer}>
              {suggestions &&
                suggestions.map((suggestion, index) => (
                  <div
                    className={classes.suggestion}
                    key={index}
                    onClick={() => fetchCityDetails(suggestion)}
                  >
                    <div className={classes.currentLocation}>
                      <div className={classes.currentLocationIcon}>
                        <PinCodeIcon />
                      </div>
                      <div>
                        <p className={classes.currentLocationText}>
                          {suggestion.name}
                        </p>
                        <span className={classes.usingGps}>
                          {suggestion.stateCode},{" "}
                        </span>
                        <span className={classes.usingGps}>
                          {suggestion.countryCode}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default LocationModal;
