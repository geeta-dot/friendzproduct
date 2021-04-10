import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AccountBox from "@material-ui/icons/AccountBox";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import EventNoteRoundedIcon from "@material-ui/icons/EventNoteRounded";
import LocalMallRoundedIcon from "@material-ui/icons/LocalMallRounded";
import LiveTvRoundedIcon from "@material-ui/icons/LiveTvRounded";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import FeedbackIcon from "@material-ui/icons/Feedback";
import MoreIcon from "@material-ui/icons/More";
import MailIcon from "@material-ui/icons/Mail";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { commonStyles } from "./styles";
import CreateIcon from "@material-ui/icons/Create";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { unauthenticated } from "../../../redux/actions/auth";
import ChatMessageIcon from "../../../chat/components/ChatIcon";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  ...commonStyles,
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const accessToken = useSelector((state) => state.auth_user.accessToken);
  const user = useSelector((state) => state.auth_user.user);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const [timeout, settimeout] = useState("");
  const [searchValue, setsearchValue] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [openAMenu, setOpenAMenu] = useState(false);

  const toggleSubmenu = () => {
    setOpenMenu(!openMenu);
  };

  const toggleASubmenu = () => {
    setOpenAMenu(!openAMenu);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [opensearch, setopensearch] = React.useState(false);

  const handleSearchOpen = () => {
    setopensearch(true);
  };

  const handleSearchClose = () => {
    setopensearch(false);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const logout = () => {
    setAnchorEl(null);
    router.push("/");
    dispatch(unauthenticated());
  };

  // const handleSearch = (e) => {
  //   let value = e.target.value;
  //   settimeout(value);
  // };

  const handleSearch = (e) => {
    let value = e.target.value;
    console.log(value, timeout);
    setsearchValue(value);
    if (timeout) clearTimeout(timeout);
    settimeout(
      setTimeout(() => {
        router.push("/products?s=" + value);
      }, 600)
    );
  };

  const handleSeachClick = () => {
    router.push("/products?s=" + searchValue);
  };

  const SearchAppBarIcon = () => {
    return (
      <div className={classes.searchBar}>
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={handleSeachClick}
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search"
          onChange={handleSearch}
          inputProps={{ "aria-label": "search" }}
          value={searchValue}
        />
        <IconButton className={classes.closeButton} onClick={handleSearchClose}>
          <CloseIcon />
        </IconButton>
      </div>
    );
  };

  const handleListProduct = (e) => {
    e.preventDefault();
    if (accessToken) {
      router.push("/post");
    } else {
      router.push("/?signup=open");   

      // setauthModal(true);
    }
  };

  const handleListEvent = (e) => {
    // setauthModal(false);
    e.preventDefault();
    if (user.id) {
      router.push("/post/event");
    } else {
      router.push("/?signup=open");   
    }
  };

  return (
    <div className={classes.root}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <AppBar position="fixed" className={classes.AppbarBg}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={open} className={classes.sideBar}>
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItem
                  button
                  component={Link}
                  href="/"
                  className={router.pathname == "/" ? "active" : ""}
                >
                  <ListItemIcon>
                    <HomeRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                <Divider />
                <ListItem
                  button
                  component={Link}
                  href="/products?type=buy"
                  className={
                    router.asPath == "/products?type=buy" ? "active" : ""
                  }
                >
                  <ListItemIcon>
                    <LocalMallRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Buy" />
                </ListItem>
                <Divider />
                <ListItem
                  button
                  component={Link}
                  href="/products?type=rental"
                  className={
                    router.asPath == "/products?type=rental" ? "active" : ""
                  }
                >
                  <ListItemIcon>
                    <LocalMallRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Rent" />
                </ListItem>
                <Divider />
                <ListItem
                  button
                  component={Link}
                  href="/events"
                  className={router.pathname == "/events" ? "active" : ""}
                >
                  <ListItemIcon>
                    <EventNoteRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Event" />
                </ListItem>
                <Divider />
                <ListItem
                  button
                  component={Link}
                  // href={!accessToken ? "/?signup=open" : "/post"}
                  onClick={handleListProduct}
                  className={router.pathname == "/post" ? "active" : ""}
                >
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sell" />
                </ListItem>
                <Divider />
                <ListItem
                  button
                  component={Link}
                  href="/buy-request"
                  className={router.pathname == "/buy-request" ? "active" : ""}
                >
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Requests" />
                </ListItem>
                <Divider />
                <ListItem
                  button
                  component={Link}
                  // href={!accessToken ? "/?signup=open" : "/post/event"}
                  onClick={handleListEvent}
                  className={router.pathname == "/post/event" ? "active" : ""}
                >
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Events" />
                </ListItem>
                <Divider />
                <ListItem
                  button
                  component={Link}
                  href="/feedback"
                  className={router.pathname == "/feedback" ? "active" : ""}
                >
                  <ListItemIcon>
                    <FeedbackIcon />
                  </ListItemIcon>
                  <ListItemText primary="Feedback" />
                </ListItem>
                <Divider />
                <ListItem button onClick={toggleSubmenu}>
                  <ListItemIcon>
                    <MoreIcon />
                  </ListItemIcon>
                  <ListItemText primary="More" />
                  {openMenu ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMenu} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link href="/about">
                      <ListItem button>
                        <ListItemIcon>
                          <FeedbackIcon />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                      </ListItem>
                    </Link>
                    <Link href="/privacy-policy">
                      <ListItem button>
                        <ListItemIcon>
                          <FeedbackIcon />
                        </ListItemIcon>
                        <ListItemText primary="Privacy Policy" />
                      </ListItem>
                    </Link>
                    <Link href="/terms-and-conditions">
                      <ListItem button>
                        <ListItemIcon>
                          <FeedbackIcon />
                        </ListItemIcon>
                        <ListItemText primary="Terms &amp; Conditions" />
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>
                <Divider />
                {accessToken && (
                  <>
                    <ListItem button onClick={toggleASubmenu}>
                      <ListItemIcon>
                        <AccountBox />
                      </ListItemIcon>
                      <ListItemText primary="Account" />
                      {openAMenu ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openAMenu} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItem
                          button
                          component={Link}
                          href="/profile"
                          className={
                            router.pathname == "/profile" ? "active" : ""
                          }
                        >
                          <ListItemIcon>{/* <AccountCircle /> */}</ListItemIcon>
                          <ListItemText primary="View Profile" />
                        </ListItem>
                        <Divider />
                        <ListItem
                          button
                          component={Link}
                          href="/profile/edit"
                          className={
                            router.pathname == "/profile/edit" ? "active" : ""
                          }
                        >
                          <ListItemIcon>{/* <CreateIcon /> */}</ListItemIcon>
                          <ListItemText primary="Edit Profile" />
                        </ListItem>
                        <Divider />
                        <ListItem
                          button
                          component={Link}
                          href="/profile"
                          className={
                            router.pathname == "/profile" ? "active" : ""
                          }
                        >
                          <ListItemIcon>{/* <CreateIcon /> */}</ListItemIcon>
                          <ListItemText primary="Published Adds" />
                        </ListItem>
                        <Divider />
                        <ListItem
                          button
                          component={Link}
                          href="/profile/events"
                          className={
                            router.pathname == "/profile/events" ? "active" : ""
                          }
                        >
                          <ListItemIcon>{/* <CreateIcon /> */}</ListItemIcon>
                          <ListItemText primary="Published Events" />
                        </ListItem>
                        <Divider />
                        <ListItem
                          button
                          component={Link}
                          href="/profile/requests"
                          className={
                            router.pathname == "/profile/requests"
                              ? "active"
                              : ""
                          }
                        >
                          <ListItemIcon>{/* <CreateIcon /> */}</ListItemIcon>
                          <ListItemText primary="Published Requests" />
                        </ListItem>
                        <Divider />
                        <ListItem
                          button
                          component={Link}
                          href="/profile/favourite-events"
                          className={
                            router.pathname == "/profile/favourite-events"
                              ? "active"
                              : ""
                          }
                        >
                          <ListItemIcon>{/* <CreateIcon /> */}</ListItemIcon>
                          <ListItemText primary="Favourite Events" />
                        </ListItem>
                        <Divider />
                        <ListItem
                          button
                          component={Link}
                          href="/profile/favourite-products"
                          className={
                            router.pathname == "/profile/favourite-products"
                              ? "active"
                              : ""
                          }
                        >
                          <ListItemIcon>{/* <CreateIcon /> */}</ListItemIcon>
                          <ListItemText primary="Favourite products" />
                        </ListItem>
                        <Divider />
                        <ListItem
                          button
                          component={Link}
                          href="/post/request"
                          className={
                            router.pathname == "/post/request" ? "active" : ""
                          }
                        >
                          <ListItemIcon>{/* <CreateIcon /> */}</ListItemIcon>
                          <ListItemText primary="Add Product Request" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={logout}>
                          <ListItemIcon>
                            <ExitToAppIcon />
                          </ListItemIcon>
                          <ListItemText primary="Logout" />
                        </ListItem>
                      </List>
                    </Collapse>
                  </>
                )}
              </List>
            </Drawer>
            <Link href="/">
              <img className={classes.logo} src="/static/images/logo.png" />
            </Link>
            <div className={classes.menuIcons}>
              {/* <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton> */}
              <ChatMessageIcon />
              {/* <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              {/* <IconButton
                aria-label="search"
                color="inherit"
                onClick={handleSearchOpen}
              >
                <SearchIcon />
              </IconButton> */}

              {/* {opensearch && (
                <div className={classes.searchBar}>
                  <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                    onClick={handleSeachClick}
                  >
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    className={classes.input}
                    placeholder="Search"
                    onChange={handleSearch}
                    inputProps={{ "aria-label": "search" }}
                    value={searchValue}
                  />
                  <button
                    className={classes.searchbtn}
                    onClick={handleSeachClick}
                  >
                    Search
                  </button>
                  <IconButton
                    className={classes.closeButton}
                    onClick={handleSearchClose}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              )} */}
              {/* {opensearch && <SearchAppBarIcon />} */}
            </div>
          </Toolbar>
        </AppBar>
      </ClickAwayListener>
    </div>
  );
}
