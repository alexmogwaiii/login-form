import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';

import './Login.scss';

const ColorButton = withStyles((theme) => ({
  root: {
    width: '212px',
    marginTop: '64px',
    height: '48px',
    fontWeight: '500',
    color: '#FEFEFE',
    background: 'linear-gradient(90deg, #FF9146 0%, #FF351B 100%)',
    '&:hover': {
      background: 'linear-gradient(90deg, #FF9146 0%, #FF351B 75%);',
    },
    [theme.breakpoints.down('xs')]: {
      height: '40px',
      width: '163px',
      marginTop: '50px',
    },
  },
  disabled: {
    background: '#B2B7BB',
    color: '#FEFEFE !important',
  }
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '260px',
    height: '48px',
    borderRadius: '10px',
    [theme.breakpoints.down('xs')]: {
      height: '40px',
    },
  },
  outlined: {
    transform: 'translate(14px, 17px)',
    [theme.breakpoints.down('xs')]: {
      transform: 'translate(14px, 14px)'
    }
  },
  error: {
    position: 'absolute',
    top: '50px',
    fontSize: '14px',
    [theme.breakpoints.down('xs')]: {
      top: '40px',
    }
  },
}));

export const Login = React.memo(({ setAuthorized }) => {
  const classes = useStyles();
  const [email, setEmail] = useState({
    query: '',
    error: false,
  });
  const [password, setPassword] = useState({
    query: '',
    error: false,
  });
  const [isPasswordShown, setPasswordShown] = useState(false);

  const togglePasswordShown = () => {
    setPasswordShown(!isPasswordShown);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;

    switch (id) {
      case 'email':
        setEmail({error: false, query: value});
        break;
      case 'password':
        setPassword({error: false, query: value});
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password.query || !email.query) {
      setEmail({ ...email, error: !email.query });
      setPassword({ ...password, error: !password.query });

      return;
    }

    setAuthorized({
      isOpen: true,
      user: {
        email: email.query,
        password: password.query,
      }
    })
  }

  return (
    <div className="login">
      <h1 className="login__title">Login</h1>

      <form
        className="login__form"
        onSubmit={handleSubmit}
      >
        <div className="login__inputs">
          <FormControl variant="outlined">
            <InputLabel
              htmlFor="email"
              className={classes.outlined}
              error={email.error}
            >
              Email address
            </InputLabel>
            <OutlinedInput
              id="email"
              value={email.query}
              onChange={handleChange}
              labelWidth={100}
              className={classes.root}
              error={email.error}
            />
            {email.error
              && <FormHelperText
                  error
                  className={classes.error}
                 >
                  Email required
                 </FormHelperText>
            }
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              className={classes.outlined}
              error={password.error}
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              type={isPasswordShown ? 'text' : 'password'}
              value={password.query}
              onChange={handleChange}
              className={classes.root}
              error={password.error}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordShown}
                    onMouseDown={togglePasswordShown}
                    edge="end"
                  >
                    {isPasswordShown
                      ? <VisibilityOff
                          color={password.error ? 'error' : 'disabled'}
                        />
                      : <Visibility
                          color={password.error ? 'error' : 'disabled'}
                        />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            {password.error
              && <FormHelperText
                  error
                  className={classes.error}
                 >
                  Password required
                 </FormHelperText>
            }
          </FormControl>
        </div>
        <ColorButton
          type="submit"
          variant="contained"
          disabled={email.error || password.error}
        >
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
});

Login.propTypes = {
  setAuthorized: PropTypes.func.isRequired,
};
