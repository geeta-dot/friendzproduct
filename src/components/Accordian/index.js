import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
import { DeleteRequest } from '../../apis/auth-api';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  Accordian: {
    boxShadow: 'none',
    border: 'none',
    marginBottom: '0.5rem',
    position: 'relative',
    '&::after': {
      position: 'absolute',
      width: '100%',
      height: '1px',
      background: '#d2d2d2',
      bottom: '-0.2rem',
      left: 0,
      content: '""',
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      marginBottom: '0',
    },
    '& button': {
      border: 'solid 1px var(--theme)',
    },
  },
  Flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      //   flexDirection: "column",
      alignItems: 'flex-start',
    },
  },
  heading: {
    fontSize: '1.2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  desc: {
    marginBottom: '0.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
  collegeName: {
    color: '#6d6d6d',
    fontStyle: 'italic',
    fontSize: '0.91rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
  },
  Details: {
    display: 'grid',
  },
}));

export default function Accordian({ data, isAuthUser }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [snackbar, setsnackbar] = React.useState(false);
  const [snackbarMsg, setsnackbarMsg] = React.useState('');
  const [snackbarType, setsnackbarType] = React.useState('success');
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    router.push('/post/request/edit/' + data.id);
  };
  const handleDelete = () => {
    DeleteRequest(data, data.id).then((response) => {
      if (response.error) {
        setsnackbar(true);
        setsnackbarMsg('There is some error.Please try again later');
        setsnackbarType('error');
      } else {
        setsnackbar(true);
        setsnackbarMsg('Deleted');
        setsnackbarType('success');
        location.reload();
      }
    });
  };

  const handlesnackbar = () => {
    setsnackbar(!snackbar);
  };

  const gotoChat = () => {
    console.log('clicked');
    router.push('/chat/request/' + data.id);
  };

  return (
    <Accordion className={classes.Accordian}>
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        // expandIcon={<ExpandMoreIcon />}
      >
        <div className={classes.Flex}>
          <Snackbar
            open={snackbar}
            autoHideDuration={6000}
            onClose={handlesnackbar}
          >
            <Alert onClose={handlesnackbar} severity={snackbarType}>
              {snackbarMsg}
            </Alert>
          </Snackbar>
          <Typography variant="h6" className={classes.heading}>
            {data.title}
          </Typography>
          {!isAuthUser && (
            <Button color="primary" onClick={gotoChat}>
              Chat
            </Button>
          )}
          {isAuthUser && (
            <div>
              <MoreVertIcon
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              ></MoreVertIcon>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.Details}>
        <Typography className={classes.desc}>{data.description}</Typography>
        <Typography className={classes.collegeName}>
          {data.university.name}
        </Typography>
        {/* <Typography className={classes.collegeName}>
          Category - {data.category.name}
        </Typography>
        {data.type == 'Rental' && (
          <Typography className={classes.collegeName}>
            Rental / per - {data.time_period}
          </Typography>
        )} */}
      </AccordionDetails>
    </Accordion>
  );
}
