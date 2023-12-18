import classes from "./SignUp.module.css";
import { useModal } from "../../../contexts/signInModalContext";
import { useLocationContext } from "../../../contexts/locationModalContext";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { isInteger } from "formik";
export default function SignUp() {
  const { isModalVisible, closeModal } = useModal();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isOtpPage, setisOtpPage] = useState(false);
  const [isSignUpPage, setisSignUpPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

  const handleRegisterUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      data: {
        name: name,
        email: email,
        phone: phoneNumber,
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:1337/api/swiggy-users", requestOptions)
      .then((response) => response.text())
      .then((result) => {

        handleSendVerification(e);
      
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false);
     
      });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleSendVerification = (e) => {
    e.preventDefault();

    fetch(
      "https://verify.twilio.com/v2/Services/VAee7f69837cf4dd1b8924753483d366c5/Verifications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(`${twilioAccountSid}:${twilioAuthToken}`),
        },
        body: `To=%2B91${phoneNumber}&Channel=sms`,
      }
    )
      .then((response) => {
        // Handle the response, you can add error handling here
        console.log(response);
        setisOtpPage(true);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  const handleVerifyOtp = () => {
    fetch(
      "https://verify.twilio.com/v2/Services/VAee7f69837cf4dd1b8924753483d366c5/VerificationCheck",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(`${twilioAccountSid}:${twilioAuthToken}`),
        },
        body: `To=%2B91${phoneNumber}&Code=${otpCode}`,
      }
    )
      .then((response) => {
        const resdata = response.json();
          console.log(resdata);
        const { valid } = resdata;
        closeModal();

      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  return (
    <>
      {isModalVisible && (
        <div className={classes.backdrop} onClick={handleBackdropClick}>
          <div className={classes.signUpContainer}>
            <div className={classes.loginHeader}>
              <div>
                {isOtpPage ? (
                  <span
                    className={classes.backIcon}
                    onClick={() => setisOtpPage(false)}
                  >
                    &larr;
                  </span>
                ) : (
                  <span className={classes.closeIcon} onClick={closeModal}>
                    &#10799;{" "}
                  </span>
                )}

                <h1 style={{ marginBottom: "10px" }}>
                  {isSignUpPage ? "Sign Up" : isOtpPage ? "Enter OTP" : "Login"}
                </h1>

                {isOtpPage ? (
                  <div className={classes.createAccount}>
                    We've sent an OTP to your phone number.
                  </div>
                ) : (
                  <div className={classes.createAccount}>
                    or
                    {isSignUpPage ? (
                      <span
                        className={classes.createAccountLink}
                        onClick={() => setisSignUpPage(false)}
                      >
                        {" "}
                        login to your account
                      </span>
                    ) : (
                      <span
                        className={classes.createAccountLink}
                        onClick={() => setisSignUpPage(true)}
                      >
                        {" "}
                        create an account
                      </span>
                    )}
                  </div>
                )}
              </div>

              <img
                className={classes.foodIcon}
                alt="food-icon"
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
              />
            </div>

            <form>
              <div className={classes.form_group}>
                <input
                  name="mobile"
                  id="mobile"
                  type="text"
                  maxLength={10}
                  minLength={10}
                  autoComplete="off"
                  value={phoneNumber}
                  onChange={(e) => {
                      const value = e.target.value;
                  
                      // Use a regular expression to check if the value is numeric
                      if (/^\d*$/.test(value)) {
                        setPhoneNumber(value);
                      }
                    }}
                  className={classes.input}
                  disabled={isOtpPage}
                  required
                />
                <label htmlFor="mobile" className={clsx(classes.label)}>
                  Phone Number
                </label>
              </div>

              {isSignUpPage && (
                <>
                  <div className={classes.form_group}>
                    {" "}
                    <input
                      name="name"
                      id="name"
                      type="text"
                      autoComplete="off"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={classes.input}
                      required
                      disabled={isOtpPage}
                    />
                    <label htmlFor="name" className={clsx(classes.label)}>
                      Name
                    </label>
                  </div>
                  <div className={classes.form_group}>
                    <input
                      name="email"
                      id="email"
                      type="email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={classes.input}
                      required
                      disabled={isOtpPage}
                    />
                    <label htmlFor="email" className={clsx(classes.label)}>
                      Email
                    </label>
                  </div>
                </>
              )}

              {isOtpPage && (
                <div className={classes.form_group}>
                  <input
                    name="otp"
                    id="otp"
                    type="text"
                    maxLength={6}
                    autoComplete="off"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className={classes.input}
                    required
                  />
                  <label htmlFor="otp" className={clsx(classes.label)}>
                    One Time Password
                  </label>
                </div>
              )}
              <div className={classes.loginButtonContainer}>
                {isOtpPage ? (
                  <button
                    type="submit"
                    className={classes.loginButton}
                    onClick={handleVerifyOtp}
                  >
                    VERIFY OTP
                  </button>
                ) : isSignUpPage ? (
                  <>
                    <button
                      type="submit"
                      className={clsx(
                        classes.loginButton,
                        isLoading && classes.loading
                      )}
                      onClick={handleRegisterUser}
                    >
                      CONTINUE
                    </button>
                  { isLoading &&  <div className={classes.progressBar}>
                      <div className={clsx(classes.filler)}></div>
                    </div>}
                  </>
                ) : (
                  <button
                    type="submit"
                    className={classes.loginButton}
                    onClick={handleSendVerification}
                  >
                    LOGIN
                  </button>
                )}
              </div>
            </form>
            {!isOtpPage && (
              <div className={classes.termsContainer}>
                By clicking on Login, I accept the{" "}
                <span className={classes.terms}>Terms &amp; Conditions </span>
                &amp; <span className={classes.terms}>Privacy Policy</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
