import React, { useState } from 'react';
import { Login } from './components/Login'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import './App.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const [isAuthorized, setAuthorized] = useState({
    isOpen: false,
    user: {
      email: '',
      password: '',
    }
  });

  const handleCloseDialog = () => {
    setAuthorized({
      isOpen: false,
      user: {...isAuthorized}
    })
  }

  return (
    <main className="main">
      <div className="main__container">
        <Login setAuthorized={setAuthorized} />

        <Dialog
          open={isAuthorized.isOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth={true}
        >
          <DialogTitle id="alert-dialog-slide-title">{"User data"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Email: {isAuthorized.user.email}
            </DialogContentText>
            <DialogContentText>
              Password: {isAuthorized.user.password}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </main>
  );
}

export default App;
