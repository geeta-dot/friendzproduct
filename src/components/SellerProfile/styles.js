export const commonStyles = {
  section: {
    padding: "2.5rem 0 5rem",
  },
  editTitle: {
    marginBottom: "2rem",
    textAlign: "center",
  },
  ProfileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem 1rem",
    border: "#ccc solid 1px",
    marginRight: "2.5rem",
  },
  ProfileImage: {
    borderRadius: "50%",
    width: "200px",
    height: "200px",
    border: "solid 2px var(--theme)",
    position: "relative",
    overflow: "hidden",
    "& img": {
      borderRadius: "50%",
      width: "100%",
    },
  },
  uploadIcon: {
    position: "absolute",
    bottom: "10%",
    zIndex: "2",
    left: "40%",
    color: "#fff",
    cursor: "pointer",
  },
  Button: {
    width: "80%",
    height: "50px",
    marginTop: "2.5rem",
    backgroundColor: "var(--theme)",
    color: "#fff",
    fontSize: "1rem",
    boxShadow: "none",
    maxWidth: "200px",
  },
  vHide: {
    visibility: "hidden",
  },
  card: {
    boxShadow: "none",
    border: "#ccc solid 1px",
    height: "100%",
    // width: 'max-content'
  },
  cardBody: {
    // padding: "2rem !important",
  },
  ProfileDetails: {
    marginTop: "2rem",
    "& h6": {
      fontSize: "15px",
      display: "flex",
      alignItems: "center",
      margin: "1rem",
    },
    "& h6 svg": {
      marginRight: "1rem",
    },
    "& a": {
      color: "#2A66EA",
      wordBreak: "break-all",
    },
  },
  productsHeader: {
    paddingBottom: "1rem",
    borderBottom: "solid 1px #BDBDBD",
    display: "flex",
    justifyContent: "space-between",
  },
  ProductsGridWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat( auto-fit, minmax(300px, 1fr) )",
    gridGap:'1rem',
    "&:nth-of-type(1)": {
      paddingTop: "2rem",
    },
    "&:nth-last-of-type(1)": {
      paddingTop: "2rem",
    },
  },
  Noads: {
    display: "grid",
    textAlign: "center",
    placeContent: "center",
    "& h5": {
      marginBottom: "1rem",
    },
    "& img": {
      width: "150px",
    },
  },
  addmorebtn: {
    background: "#f47104",
    padding: "6px 15px",
    color: "#fff",
    borderRadius: "5px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
  },
  addmoreGrid: {
    display: "grid",
    textAlign: "center",
    placeContent: "center",
  },
};

export const mobileStyles = {
  ProfileContainer: {
    marginRight: "0",
    marginBottom: "2rem",
  }
};

export const TabStyles = {
  ProfileContainer: {
    marginRight: "1.5rem",
  },
};

export const desktopStyles = {};
