// import {
//   secondaryDark, backgroundColor, blueText, mainText
// } from 'src/_styles/colors'

export const commonStyles = {
  root: {
    position: "absolute",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    zIndex: "99",
    backgroundColor: "#fff",
    transition: "all ease-in 350ms",
  },
  scrolled: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    zIndex: "99",
    backgroundColor: "#fff",
    boxShadow: "0px 14px 18px rgba(0,0,0,0.1)",
  },
  Menu: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    margin: "0",
    padding: "0",
    listStyleType: "none",
    "& li": {
      marginRight: "1.3rem",
    },
    "& li ul li": {
      marginRight: "0",
    },
    "& a": {
      color: "#000",
      fontSize: "1.1rem",
      fontWeight: "500",
      textDecoration: "none",
    },
    "& li:hover a": {
      color: "var(--theme)",
    },
    "& li:hover .MuiList-root a": {
      color: "#000",
    },
    "& li.active a": {
      color: "var(--theme)",
    },
    "& button": {
      color: "#000",
      fontSize: "1.1rem",
      fontWeight: "500",
      textTransform: "capitalize",
    },
    "& button:hover .MuiButton-label": {
      background: "none",
      color: "var(--theme)"
    },
    "& button .MuiTouchRipple-root": {
      display: 'none'
    }
  },
  MenuRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
    margin: "0",
    padding: "0",
    listStyleType: "none",
    "& li": {
      marginRight: "1rem",
    },
  },
  logo: {
    margin: "1rem 0",
    width: "auto",
    height: "85px",
    transition: "all ease-in 350ms",
  },
  logoScrolled: {
    margin: "0.2rem 0",
    width: "auto",
    height: "65px",
  },
};

export const mobileStyles = {

}

export const TabStyles = {
  Menu: {
    '& li': {
      marginRight: '1rem'
    },
    '& a': {
      fontSize: '1rem',
    }
  }
}

export const desktopStyles = {

}
