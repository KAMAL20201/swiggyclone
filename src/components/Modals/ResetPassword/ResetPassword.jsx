import React, { useState } from 'react';
import { supabase } from '../../../client';
import classes from '../SignUp/SignUp.module.css';
import clsx from 'clsx';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

        setIsLoading(true);
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        });
        if (error) {
          console.log(error);
          toast.error('There was an error updating your password.', {
            duration: 4000,
            position: 'top-center',
          });
        } else {
          toast.success('Password updated successfully!', {
            duration: 4000,
            position: 'top-center',
          });
        }

    setIsLoading(false);
  };

  return (
    <div className={classes.resetPageCon}>
      <form onSubmit={handleChangePassword} className={classes.resetForm}>
        <div className={classes.form_group}>
          <input
            name="newpassword"
            id="newpassword"
            type="password"
            autoComplete="off"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={classes.input}
            required
          />
          <label htmlFor="newpassword" className={classes.label}>
            New Password
          </label>
        </div>
        <div className={classes.form_group}>
          {' '}
          <input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            autoComplete="off"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={classes.input}
            required
          />
          <label htmlFor="confirmPassword" className={classes.label}>
            Confirm Password
          </label>
        </div>
        <button
          type="submit"
          className={clsx(classes.loginButton, isLoading && classes.loading)}
          disabled={newPassword !== confirmPassword}
        >
          UPDATE PASSWORD
        </button>
        {isLoading && (
          <div className={classes.progressBar}>
            <div className={clsx(classes.filler)}></div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
