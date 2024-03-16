import React, { useState, useEffect } from 'react';
import classes from './Location.module.css';
import { useLocationContext } from '../../../contexts/locationModalContext';
import { City } from 'country-state-city';
import { setUserLocation } from '../../../utils/utils';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineGpsFixed } from 'react-icons/md';

const LocationModal = () => {
  const [inputText, setInputText] = useState('');
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const navigate = useNavigate();

  const {
    setLatitude,
    setLongitude,
    setLocation,
    islocationModalVisible,
    closeLocationModal,
  } = useLocationContext();

  const [suggestions, setSuggestions] = useState([]);

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://apis.mappls.com/advancedmaps/v1/b9b5654ced874cfc9b71f2ed60eb6542/rev_geocode?lat=${latitude}&lng=${longitude}&region=IND`
      );

      if (!response.ok) {
        throw new Error(
          `Error fetching reverse geocode API: ${response.statusText}`
        );
      }

      const resData = await response.json();
      const { locality, formatted_address } = resData.results[0];

      const userLocationObject = {
        lat: latitude,
        lng: longitude,
        address: formatted_address,
        area: locality,
      };
      setUserLocation(userLocationObject);
      setLocation(formatted_address);
      setLatitude(latitude);
      setLongitude(longitude);
      setIsFetchingLocation(false);
    } catch (err) {
      toast.error('Failed to fetch location! Please try again.', {
        duration: 4000,
        position: 'bottom-center',
      });
      console.error(err);
    }
  };

  const fetchCurrentLocation = () => {
    setIsFetchingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          reverseGeocode(position.coords.latitude, position.coords.longitude);
          closeLocationModal();
          navigate('/');
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser.', {
        duration: 4000,
        position: 'bottom-center',
      });
      setIsFetchingLocation(false);
    }
  };

  const fetchSuggestions = () => {
    if (inputText.length >= 3) {
      const cities = City.getCitiesOfCountry('IN');
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

  const fetchCityDetails = async (city) => {
    setIsFetchingLocation(true);
    await reverseGeocode(city.latitude, city.longitude);
    setInputText('');
    navigate('/');
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
            {isFetchingLocation ? (
              <div>Fetching Location...</div>
            ) : (
              <>
                <div
                  className={classes.currentLocationContainer}
                  onClick={() => {
                    fetchCurrentLocation();
                  }}
                >
                  <div className={classes.currentLocation}>
                    <div className={classes.currentLocationIcon}>
                      <MdOutlineGpsFixed />
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
                            <IoLocationOutline />
                          </div>
                          <div>
                            <p className={classes.currentLocationText}>
                              {suggestion.name}
                            </p>
                            <span className={classes.usingGps}>
                              {suggestion.stateCode},{' '}
                            </span>
                            <span className={classes.usingGps}>
                              {suggestion.countryCode}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LocationModal;
