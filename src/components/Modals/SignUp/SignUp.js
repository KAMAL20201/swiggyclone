import classes from './SignUp.module.css';
import { useModal } from '../../../contexts/signInModalContext';
import { useState } from 'react';
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
  const [isSignUpPage, setisSignUpPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
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
        emailRedirectTo: 'http://localhost:3000',
        data: {
          full_name: name,
        },
      },
    });
    if (error) {
      console.log(error?.message);
      toast(error?.message, {
        duration: 4000,
        position: 'bottom-center',
      });
    } else {
      console.log(data);
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
                  {isSignUpPage ? 'Sign Up' : 'Login'}
                </h1>

                <div className={classes.createAccount}>
                  or
                  {isSignUpPage ? (
                    <span
                      className={classes.createAccountLink}
                      onClick={() => setisSignUpPage(false)}
                    >
                      {' '}
                      login to your account
                    </span>
                  ) : (
                    <span
                      className={classes.createAccountLink}
                      onClick={() => setisSignUpPage(true)}
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
              {isSignUpPage && (
                <>
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
                </>
              )}

              <div className={classes.loginButtonContainer}>
                {isSignUpPage ? (
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
                    {isLoading && (
                      <div className={classes.progressBar}>
                        <div className={clsx(classes.filler)}></div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      type="submit"
                      className={clsx(
                        classes.loginButton,
                        isLoading && classes.loading
                      )}
                      onClick={handleLoginUser}
                    >
                      LOGIN
                    </button>
                    {isLoading && (
                      <div className={classes.progressBar}>
                        <div className={clsx(classes.filler)}></div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className={classes.termsContainer}>
              By clicking on Login, I accept the{' '}
              <span className={classes.terms}>Terms &amp; Conditions </span>
              &amp; <span className={classes.terms}>Privacy Policy</span>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}
