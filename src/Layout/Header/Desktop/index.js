import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Container, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from "../../../chat/components/ChatIcon";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import useNavbar from "../utils/useNavbar";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { commonStyles, desktopStyles, mobileStyles, TabStyles } from "./styles";
import AuthIcon from "../../../components/Login_Register";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link'
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    "&:hover": {
      backgroundColor: '#fff',
    },
    border: "solid 1px #ccc",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  ...commonStyles,
  [theme.breakpoints.up("md")]: desktopStyles,
  [theme.breakpoints.down("md")]: TabStyles,
}));
import { showModal } from "../../../redux/actions/authModal";

function Header({ modalOpen }) {
  const { isScrolled, navBarRef } = useNavbar();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const [authModal, setauthModal] = React.useState(false);
  const [timeout, settimeout] = React.useState("");
  const anchorRef = React.useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const accessToken = useSelector((state) => state.auth_user.accessToken);

  const goto_commingSoon = () => {
    router.push("/coming-soon");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const classes = useStyles();

  const handleListProduct = (e) => {
    setauthModal(false);
    e.preventDefault();

    if (accessToken) {
      router.push("/post");
    } else {
      router.push("/?signup=open");
    }
  };

  const handleListEvent = (e) => {
    setauthModal(false);
    e.preventDefault();

    if (accessToken) {
      router.push("/post/event");
    } else {
      router.push("/?signup=open");   
    }
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    if (timeout) clearTimeout(timeout);
    settimeout(
      setTimeout(() => {
        router.push("/products?s=" + value);
      }, 600)
    );
  };

  return (
    <nav
      id="navbar"
      className={classNames(classes.root, isScrolled && classes.scrolled)}
      ref={navBarRef}
    >
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={2}>
            <Link href="/">
              <img
                className={classNames(
                  classes.logo,
                  isScrolled && classes.logoScrolled
                )}
                src="/static/images/logo.png"
              />
            </Link>
          </Grid>
          <Grid item xs={9}>
            <ul className={classes.Menu}>
              <li className={router.pathname == "/" ? "active" : ""}>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li
                className={
                  router.asPath == "/products?type=buy" ? "active" : ""
                }
              >
                <Link href="/products?type=buy">Buy</Link>
              </li>

              <li
                className={
                  router.asPath == "/products?type=rental" ? "active" : ""
                }
              >
                <Link href="/products?type=rental">Rent</Link>
              </li>
              <li className={router.pathname == "/events" ? "active" : ""}>
                <Link href="/events">Events</Link>
              </li>
              <li className={router.pathname == "/buy-request" ? "active" : ""}>
                <Link href="/buy-request">Requests</Link>
              </li>
              <li className={router.pathname == "/post" ? "active" : ""}>
                <a>
                  <span onClick={handleListProduct}>Sell</span>
                </a>
              </li>
              <li className={router.pathname == "/post/event" ? "active" : ""}>
                <a>
                  <span onClick={handleListEvent}>Add Event</span>
                </a>
              </li>
              <li className={router.pathname == "/feedback" ? "active" : ""}>
                <Link href="/feedback">Feedback</Link>
              </li>
              <li>
                <Button
                  ref={anchorRef}
                  aria-controls={open ? "More" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  More
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleToggleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem>
                              <Link href="/about">About</Link>
                            </MenuItem>
                            <MenuItem>
                              <Link href="/privacy-policy">Privacy Policy</Link>
                            </MenuItem>
                            <MenuItem>
                              <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </li>
            </ul>
          </Grid>
          <Grid item xs={1}>
            <ul className={classes.MenuRight}>
              {/* <li>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                    onChange={handleSearch}
                  />
                </div>
              </li> */}
              <li>
                <ChatIcon />
              </li>
              {/* <li>
                <NotificationsNoneIcon />
              </li> */}
              <li>
                <AuthIcon modalOpen={authModal} />
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </nav>
  );
}

export default Header;
