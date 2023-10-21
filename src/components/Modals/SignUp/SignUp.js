import classes from "./SignUp.module.css";
import { useModal } from "../../../contexts/signInModalContext";
import { useState } from "react";
import clsx from "clsx";
export default function SignUp() {
  const { isModalVisible, closeModal } = useModal();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isOtpPage, setisOtpPage] = useState(false);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleSendVerification = (e) => {
    e.preventDefault();

    // Prepend "+91" to the phoneNumber
    const phoneNumberWithCountryCode = "+91" + phoneNumber;


    // Send the first request to Twilio to initiate verification
    fetch(
      "https://verify.twilio.com/v2/Services/VAee7f69837cf4dd1b8924753483d366c5/Verifications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            btoa(
              "ACf129193203a1d2fdac78a21fb0269184:58259ff6405612d263985df512cc22dd"
            ),
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
  
    fetch('https://verify.twilio.com/v2/Services/VAee7f69837cf4dd1b8924753483d366c5/VerificationCheck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('ACf129193203a1d2fdac78a21fb0269184:58259ff6405612d263985df512cc22dd'),
      },
      body: `To=%2B91${phoneNumber}&Code=${otpCode}`,
    })
      .then(response => {
        const resdata= response.json();
   
         const {valid} = resdata;
      })
      .catch(error => {
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
                  <span className={classes.backIcon} onClick={()=>setisOtpPage(false)}>&larr;</span>
                ) : (
                  <span className={classes.closeIcon} onClick={closeModal}>
                    &#10799;{" "}
                  </span>
                )}

                <h1 style={{ marginBottom: "10px" }}>
                  {isOtpPage ? "Enter OTP" : "Login"}
                </h1>

                {isOtpPage ? (
                  <div className={classes.createAccount}>
                    We've sent an OTP to your phone number.
                  </div>
                ) : (
                  <div className={classes.createAccount}>
                    or
                    <span className={classes.createAccountLink}>
                      {" "}
                      create an account
                    </span>
                  </div>
                )}
              </div>

              <img
                className={classes.foodIcon}
                alt="food-icon"
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
              />
            </div>
            <form >
              <div className={classes.form_group}>
                <input
                  name="mobile"
                  id="mobile"
                  type="tel"
                  maxLength={10}
                  autoComplete="off"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={classes.input}
                  disabled={isOtpPage}
                />
                <label htmlFor="mobile" className={clsx(classes.label)}>
                  Phone Number
                </label>
              </div>

              {isOtpPage && (
                <div className={classes.form_group}>
                  <input
                    name="otp"
                    id="otp"
                    type="text"
                    maxLength={10}
                    autoComplete="off"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className={classes.input}
                  />
                  <label htmlFor="otp" className={clsx(classes.label)}>
                    One Time Password
                  </label>
                </div>
              )}
              <div className={classes.loginButtonContainer}>
                {isOtpPage ? (
                  <button type="submit" className={classes.loginButton} onClick={handleVerifyOtp}>
                    VERIFY OTP
                  </button>
                ) : (
                  <button type="submit" className={classes.loginButton} onClick={handleSendVerification}>
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
