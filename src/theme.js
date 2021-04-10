import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    primary: {
      main: '#916dd5',
      contrastText: '#FFF'
    },
    secondary: {
      main: '#33271C'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    },
  },
});


theme.typography.h1 = {
  fontSize: '5.6rem',
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    fontSize: '3.5rem',
  },
};

theme.typography.h2 = {
  fontSize: '3.6rem',
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.1rem',
  },
};

theme.typography.h3 = {
  fontSize: '2.4rem',
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.6rem',
  },
};

theme.typography.h4 = {
  fontSize: '2rem',
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.6rem',
    lineHeight: '1.6rem',
  },
};

theme.typography.h5 = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.4rem',
  },
};

theme.typography.h6 = {
  fontSize: '1.4rem',
  fontWeight: '600',
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
};

export default theme;
