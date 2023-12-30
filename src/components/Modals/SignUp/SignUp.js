import classes from './SignUp.module.css';
import { useModal } from '../../../contexts/signInModalContext';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { supabase } from '../../../client';
import toast, { Toaster } from 'react-hot-toast';
import { useUserContext } from '../../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
export default function SignUp() {
  const { isModalVisible, closeModal } = useModal();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpPage, setIsSignUpPage] = useState(false);
  const [isResetPasswordPage, setIsResetPasswordPage] = useState(false);
  const [isLoginUserPage, setIsLoginUserPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setEmail('');
      setName('');
      setPassword('');
      setIsLoginUserPage(true);
      setIsSignUpPage(false);
      setIsResetPasswordPage(false);
      closeModal();
    }
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        redirectTo: 'http://localhost:3000',
        data: {
          full_name: name,
        },
      },
    });

    if (
      data.user &&
      data.user.identities &&
      data.user.identities.length === 0
    ) {
      toast('User already exists', {
        duration: 4000,
        position: 'bottom-center',
      });
    } else if (error) {
      console.log(error?.message);
      toast(error?.message, {
        duration: 4000,
        position: 'bottom-center',
      });
    } else {
      setEmail('');
      setName('');
      setPassword('');

      toast.success('Verification Link sent', {
        duration: 4000,
        position: 'top-center',
      });
    }

    setIsLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/reset-password',
    });

    if(error){
      
      toast(error?.message, {
        duration: 4000,
        position: 'bottom-center',
      });
    }
    else{
      toast.success('Password Reset link sent', {
        duration: 4000,
        position: 'top-center',
      });
    }
  };

  const handleLoginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error);
      toast(error?.message, {
        duration: 4000,
        position: 'bottom-center',
      });
    } else {
      setUser({
        id: data?.user?.id,
        name: data?.user?.user_metadata?.full_name,
        email: data?.user?.email,
      });
      navigate('/');
      // window.location.reload();
      closeModal();

      toast.success(`Welcome back ${data?.user?.user_metadata?.full_name}`, {
        duration: 4000,
        position: 'bottom-center',
      });
    }
    setIsLoading(false);
  };


  return (
    <>
      {isModalVisible && (
        <div className={classes.backdrop} onClick={handleBackdropClick}>
          <div className={classes.signUpContainer}>
            <div className={classes.loginHeader}>
              <div>
                <span className={classes.closeIcon} onClick={closeModal}>
                  &#10799;{' '}
                </span>

                <h1 style={{ marginBottom: '10px' }}>
                  {isSignUpPage
                    ? 'Sign Up'
                    : isResetPasswordPage
                    ? 'Reset'
                    : isLoginUserPage
                    ? 'Login'
                    : null}
                </h1>

                <div className={classes.createAccount}>
                  or
                  {isSignUpPage || isResetPasswordPage ? (
                    <span
                      className={classes.createAccountLink}
                      onClick={() => {
                        setIsLoginUserPage(true);
                        setIsSignUpPage(false);
                        setIsResetPasswordPage(false);
                      }}
                    >
                      {' '}
                      login to your account
                    </span>
                  ) : (
                    <span
                      className={classes.createAccountLink}
                      onClick={() => {
                        setIsSignUpPage(true);
                        setIsLoginUserPage(false);
                        setIsResetPasswordPage(false);
                      }}
                    >
                      {' '}
                      create an account
                    </span>
                  )}
                </div>
              </div>

              <img
                className={classes.foodIcon}
                alt="food-icon"
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
              />
            </div>

            <div>
              {isSignUpPage && !isResetPasswordPage && !isLoginUserPage && (
                <form onSubmit={handleRegisterUser}>
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
                    />
                    <label htmlFor="email" className={classes.label}>
                      Email
                    </label>
                  </div>
                  <div className={classes.form_group}>
                    <input
                      name="password"
                      id="password"
                      type="password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={classes.input}
                      required
                    />
                    <label htmlFor="password" className={classes.label}>
                      Password
                    </label>
                  </div>
                  <div className={classes.form_group}>
                    {' '}
                    <input
                      name="name"
                      id="name"
                      type="text"
                      autoComplete="off"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={classes.input}
                      required
                    />
                    <label htmlFor="name" className={classes.label}>
                      Username
                    </label>
                  </div>
                  <button
                    type="submit"
                    className={clsx(
                      classes.loginButton,
                      isLoading && classes.loading
                    )}
                  >
                    CONTINUE
                  </button>
                  {isLoading && (
                    <div className={classes.progressBar}>
                      <div className={clsx(classes.filler)}></div>
                    </div>
                  )}
                </form>
              )}

              {isResetPasswordPage && !isSignUpPage && !isLoginUserPage && (
                <form onSubmit={handleResetPassword}>
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
                    />
                    <label htmlFor="email" className={classes.label}>
                      Email
                    </label>
                  </div>
                  <button
                    type="submit"
                    className={clsx(
                      classes.loginButton,
                      isLoading && classes.loading
                    )}
                  >
                    RESET
                  </button>
                  {isLoading && (
                    <div className={classes.progressBar}>
                      <div className={clsx(classes.filler)}></div>
                    </div>
                  )}
                </form>
              )}

              {isLoginUserPage && !isSignUpPage && !isResetPasswordPage && (
                <>
                  <form onSubmit={handleLoginUser}>
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
                      />
                      <label htmlFor="email" className={classes.label}>
                        Email
                      </label>
                    </div>
                    <div className={classes.form_group}>
                      <input
                        name="password"
                        id="password"
                        type="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={classes.input}
                        required
                      />
                      <label htmlFor="password" className={classes.label}>
                        Password
                      </label>
                    </div>
                    <button
                      type="submit"
                      className={clsx(
                        classes.loginButton,
                        isLoading && classes.loading
                      )}
                    >
                      LOGIN
                    </button>
                    {isLoading && (
                      <div className={classes.progressBar}>
                        <div className={clsx(classes.filler)}></div>
                      </div>
                    )}
                  </form>
                  <p
                    className={classes.createAccountLink}
                    onClick={() => {
                      setIsResetPasswordPage(true);
                      setIsSignUpPage(false);
                      setIsLoginUserPage(false);
                    }}
                  >
                    Forgot password?
                  </p>
                </>
              )}
            </div>

            {isLoginUserPage && !isSignUpPage && !isResetPasswordPage && (
              <div className={classes.termsContainer}>
                By clicking on Login, I accept the{' '}
                <span className={classes.terms}>Terms &amp; Conditions </span>
                &amp; <span className={classes.terms}>Privacy Policy</span>
              </div>
            )}
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}
