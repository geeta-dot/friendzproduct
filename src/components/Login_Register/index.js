import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { AuthForm } from "./AuthForm";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AccountBox from "@material-ui/icons/AccountBox";
import { unauthenticated } from "../../redux/actions/auth";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTab-textColorPrimary.Mui-selected": {
      color: "#ffffff",
      background: "var(--theme)",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .MuiTab-textColorPrimary": {
      background: "#dfdfdf",
    },
    "& .MuiButton-containedPrimary": {
      marginTop: "1rem",
    },
  },
  Login: {
    position: "relative",
    marginTop: "5rem",
    "&::before": {
      top: "0",
      left: "0",
      width: "440px",
      height: "440px",
      content: '""',
      zIndex: "-1",
      position: "absolute",
      transform: "translate(-50%, -50%)",
      background: "url(/static/images/circleCenter.svg)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    [theme.breakpoints.down("sm")]:{
      marginTop: '1.5rem'
    }
  },
  Img: {
    textAlign: "center",
    [theme.breakpoints.down("sm")]:{
      '& img':{
        height: '65px'
      }
    }
  },
  orange: {
    color: "#fff",
    backgroundColor: "var(--theme)",
    width: "30px",
    height: "30px",
    fontSize: "1rem",
  },
  transparent: {
    color: "#000",
    width: "30px",
    height: "25px",
    backgroundColor: "transparent",
  },
  desktopMenu:{
    '& .MuiPopover-paper':{
      minWidth: '200px',
      textAlign: 'right'
    },
    '& li':{
      justifyContent: 'space-between'
    }
  }
}));

const Login_Register = ({ isMobile = false, modalOpen = false }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAMenu, setopenAMenu] = useState(false);
  const [openBMenu, setopenBMenu] = useState(false);
  const [openCMenu, setopenCMenu] = useState(false);
  const [openDMenu, setopenDMenu] = useState(false);

  const dispatch = useDispatch();

  const toggleModal = () => {
    if (location.search.indexOf("signup=open") != -1) {
      setOpen(true);
    } else if (modalOpen != open) {
      setOpen(modalOpen);
    }
  }

  useEffect(() => {
    toggleModal()
  }, [modalOpen]);



  router.events.on('routeChangeComplete', toggleModal)

  const accessToken = useSelector((state) => state.auth_user.accessToken);
  const user = useSelector((state) => state.auth_user.user);
  // console.log("User", user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const openModal = (event) => {
    if (!accessToken) {
      setOpen(true);
    } else {
      if (isMobile) {
        gotoProfile();
      } else {
        setAnchorEl(event.currentTarget);
      }
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const gotoProfile = () => {
    router.push("/profile");
  };
  const gotoProfileEdit = () => {
    router.push("/profile/edit");
  };
  const gotoEvents = () => {
    router.push("/profile/events");
  };
  const gotoRequeste = () => {
    router.push("/profile/requests");
  };
  const gotoFavEvents = () =>{
    router.push("/profile/favourite-events");
  };
  const gotoFavProducts = () =>{
    router.push("/profile/favourite-products");
  };
  const gotoAddRequest = () =>{
    router.push("/post/request");
  };
  const gotoResetPassword = () => {
    router.push("/profile/reset-password");
  }
  

  const logout = () => {
    setAnchorEl(null);
    router.push("/");
    dispatch(unauthenticated());
  };

  const toggleASubmenu = () => {
    setopenAMenu(!openAMenu);
  };
  const toggleBSubmenu = () => {
    setopenBMenu(!openBMenu);
  };
  const toggleCSubmenu = () => {
    setopenCMenu(!openCMenu);
  };
  const toggleDSubmenu = () => {
    setopenDMenu(!openDMenu);
  };

  const classes = useStyles();

  return (
    <div>
      <Avatar
        onClick={openModal}
        aria-controls="auth-menu"
        aria-haspopup="true"
        className={user.first_name ? classes.orange : classes.transparent}
      >
        {user.first_name ? user.first_name.charAt(0) : <AccountCircleIcon />}
      </Avatar>
      <Menu
        id="auth-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        // open={!!menuPosition}
        // onClose={() => setMenuPosition({}) || handleClose}
        // anchorReference="anchorPosition"
        // anchorPosition={menuPosition}
        className={classes.desktopMenu}
      >
        {/* <List> */}
          <MenuItem button onClick={toggleASubmenu}>
            Profile
            {openAMenu ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
          <Collapse in={openAMenu} timeout="auto" unmountOnExit>
            <MenuItem onClick={gotoProfile}>View Profile</MenuItem>
            <MenuItem onClick={gotoResetPassword}>Reset Password</MenuItem>
          </Collapse>
          <MenuItem button onClick={toggleBSubmenu}>
            Ads
            {openBMenu ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
          <Collapse in={openBMenu} timeout="auto" unmountOnExit>
            <MenuItem onClick={gotoProfile}>Published Ads</MenuItem>
            <MenuItem onClick={gotoFavProducts}>Favourite Products</MenuItem>
          </Collapse>
          <MenuItem button onClick={toggleCSubmenu}>
            Events
            {openCMenu ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
          <Collapse in={openCMenu} timeout="auto" unmountOnExit>
            <MenuItem onClick={gotoEvents}>Published Events</MenuItem>
            <MenuItem onClick={gotoFavEvents}>Favourite Events</MenuItem>
          </Collapse>
          <MenuItem button onClick={toggleDSubmenu}>
            Requests
            {openDMenu ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
          <Collapse in={openDMenu} timeout="auto" unmountOnExit>
            <MenuItem onClick={gotoRequeste}>Published Requests</MenuItem>
            <MenuItem onClick={gotoAddRequest}>Add Product Request</MenuItem> 
          </Collapse>
          <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>

      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
        className={classes.modal}
      >
        <div className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Login" />
            <Tab label="SignUp" />
          </Tabs>
          <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
            <div className={classes.Login}>
              <div className={classes.Img}>
                <img src="/static/images/logo.png" width="100" />
              </div>
              <AuthForm type="login" />
            </div>
            <div>
              <AuthForm type="signup" />
            </div>
          </SwipeableViews>
        </div>
      </Dialog>
    </div>
  );
};

export default Login_Register;
