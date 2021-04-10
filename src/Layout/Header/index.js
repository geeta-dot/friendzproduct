import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import DesktopNavbar from './Desktop'
import MobileNavbar from './Mobile'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
  form:{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '1rem',
    [theme.breakpoints.down('sm')]:{
      gridTemplateColumns: '1fr'
    }
  },
  modal:{
    padding: '0.5rem'
  }
}))



function Header() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const matches = useMediaQuery(theme => theme.breakpoints.up('md'))

  const HeaderComponent = matches ? <DesktopNavbar modalOpen={handleClickOpen} /> : <MobileNavbar modalOpen={handleClickOpen} />

  const CollegeNames = [
    { title: 'The Shawshank Redemption' },
    { title: 'The Godfather'},
    { title: 'The Godfather: Part II' },
    { title: 'The Dark Knight' },
    { title: '12 Angry Men' },
    { title: "Schindler's List" },
    { title: 'Pulp Fiction' },
    { title: 'The Lord of the Rings: The Return of the King' },
    { title: 'The Good, the Bad and the Ugly'},
  ];


  const classes = useStyles()

  return (
    <>
      {HeaderComponent}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.modal}>
        <DialogTitle id="form-dialog-title">SignUp</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <div className={classes.form}>
            <TextField
              autoFocus
              margin="dense"
              id="fname"
              label="First Name"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="lname"
              label="Last Name"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="phone"
              label="Phone No"
              type="text"
              fullWidth
            />
            <Autocomplete
              id="university"
              options={CollegeNames}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} label="College" fullWidth />}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            SignUp
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
  
}

export default Header