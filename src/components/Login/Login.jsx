/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import './Login.scss';

const ColorButton = withStyles((theme) => ({
  root: {
    width: '212px',
    marginTop: '64px',
    height: '48px',
    color: '#FEFEFE',
    background: 'linear-gradient(90deg, #FF9146 0%, #FF351B 100%)',
    '&:hover': {
      background: 'linear-gradient(90deg, #FF9146 0%, #FF351B 75%);',
    },
    [theme.breakpoints.down('xs')]: {
      height: '40px',
      width: '163px',
      marginTop: '50px',
    }
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '260px',
    height: '48px',
    borderRadius: '10px',
    [theme.breakpoints.down('xs')]: {
      height: '40px',
    }
  },
  outlined: {
    transform: 'translate(14px, 17px)',
    [theme.breakpoints.down('xs')]: {
      transform: 'translate(14px, 14px)'
    }
  }
}));

export const Login = () => {
  const classes = useStyles();
  const [queryEmail, setEmail] = useState('');
  const [queryPassword, setPassword] = useState('');
  const [isPasswordShown, setPasswordShown] = useState(false);

  const togglePasswordShown = () => {
    setPasswordShown(!isPasswordShown);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleChange = (event) => {
    const { id, value } = event.target;
    
    switch (id) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  console.log(queryEmail, queryPassword);

  return (
    <div className="login">
      <h1 className="login__title">Login</h1>

      <form className="login__form">
        <div className="login__inputs">
          <FormControl variant="outlined">
            <InputLabel
              htmlFor="email"
              className={classes.outlined}
            >
              Email address
            </InputLabel>
            <OutlinedInput
              id="email"
              value={queryEmail}
              onChange={handleChange}
              labelWidth={100}
              className={classes.root}
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              className={classes.outlined}
            >
              Password
            </InputLabel>
            <OutlinedInput
            id="password"
            type={isPasswordShown ? 'text' : 'password'}
            value={queryPassword}
            onChange={handlePassword}
            className={classes.root}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordShown}
                  onMouseDown={togglePasswordShown}
                  edge="end"
                >
                  {isPasswordShown ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
          </FormControl>
        </div>
        <ColorButton variant="contained">
            Log in
        </ColorButton>
      </form>

      <div className="login__detail">
        <a className="login__forgot-password" href="#">
          Forgot your password?
        </a>

        <p className="login__new-accoount">
          Don’t have an account yet?
          <a href="#" className="login__register">
            Register
          </a>
        </p>
      </div>
    </div>
  )
};
