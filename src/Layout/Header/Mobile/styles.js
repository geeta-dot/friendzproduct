export const commonStyles = {
  root: {
    flexGrow: 1,
  },
  AppbarBg:{
    background: '#fff',
    color: '#333'
  },
  menuButton: {
    marginRight: "2rem",
  },
  title: {
    flexGrow: 1,
    display: "block",
  },
  search: {
    position: "relative",
    marginLeft: 0,
    width: "100%",
  },
  searchIcon: {
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
    width: "100%",
  },
  fullList: {
    width: "auto",
  },
  logo: {
    height: "50px",
    width: "auto",
    padding: "5px 0",
  },
  menuIcons: {
    marginLeft: "auto",
    display: "flex",
  },
  sideBar: {
    width: "280px",
    "& .MuiDrawer-paper": {
      width: "280px",
    },
    "& .MuiBackdrop-root": {
      pointerEvents: "none",
    },
    "& a": {
      color: "#333",
      textDecoration: "none",
    },
    "& a.active": {
      color: "var(--theme)",
    },
    "& a.active svg": {
      color: "var(--theme)",
    },
  },
  searchBar: {
    position: "fixed",
    width: "100%",
    background: "#fff",
    left: "0",
    zIndex: "100",
    display: "flex",
    top: "0",
    height: "57px",
  },
  searchbtn: {
    height: "35px",
    background: "var(--theme)",
    color: "#fff",
    alignSelf: "center",
    borderRadius: "4px",
    padding: "5px 10px",
    border: "none",
  },
};
