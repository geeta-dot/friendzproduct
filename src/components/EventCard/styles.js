// import {
//   secondaryDark, backgroundColor, blueText, mainText
// } from 'src/_styles/colors'

export const commonStyles = {
  card: {
    border: "none",
    boxShadow: "none",
    width: "100%",
    maxWidth: "310px",
    // margin: "1rem 1rem 1rem 0",
    display: "grid",
    // minHeight: "475px",
    gridTemplateRows: "auto 1fr",
  },
  cardInner: {
    // height: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "0.7rem 1rem 1rem !important",
    border: "#D6D6D6 solid 4px",
    borderTop: "none",
    position: "relative",
    top: "-5px",
    minHeight: "150px",
  },
  Orangecard: {
    border: "solid 4px var(--theme)",
    borderTop: "none",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    flex: "0 0 80%",
    textAlign: "left",
    fontSize: "1.35rem",
    fontWeight: "500",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  cardBody: {
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "#C8C8C8 solid 1px",
    // textAlign: 'center'
  },
  cardFooter: {
    display: "flex",
    flexWrap: "wrap",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  Orangeprice: {
    color: "var(--theme)",
  },
  date: {
    fontSize: "1rem",
    marginTop:'0.5rem'
  },
  college: {
    fontSize: "1rem",
    color: "#4A4A4A",
    marginTop: "0.2rem",
    fontStyle: "italic",
  },
  excerpt: {
    fontSize: "1rem",
    color: "#4A4A4A",
    marginBottom: "1rem",
  },
};

export const mobileStyles = {
  title: {
    fontSize: "1rem",
  },
  image: {
    height: "220px",
  },
  excerpt: {
    fontSize: "14px",
  },
  cardFooter: {
    marginTop: "1rem",
  },
  college: {
    fontSize: "0.8rem",
  },
  card: {
    // minHeight: '445px',
    margin: 'auto'
  },
  cardInner:{
    minHeight: '130px',
  },
  price:{
    fontSize: '1.2rem'
  }
};

export const TabStyles = {};

export const desktopStyles = {};
