// import {
//   secondaryDark, backgroundColor, blueText, mainText
// } from 'src/_styles/colors'

export const commonStyles = {
  backdrop: {
    zIndex: 99999,
    color: "#fff",
  },
  section: {
    padding: "5rem 0",
    position: "relative",
  },
  ptZero: {
    paddingTop: "0 !important",
  },
  spacingBox: {
    margin: "3rem 0",
  },
  sectionHeader: {
    textAlign: "center",
    maxWidth: "910px",
    margin: "0 auto",
    "& h3": {
      marginBottom: "1rem",
    },
    "& h2": {
      marginBottom: "1rem",
      textTransform: "uppercase",
    },
    "& p": {
      color: "#4A4A4A",
      fontSize: "1.25rem",
    },
  },
  IconCardWrapper: {
    maxWidth: "960px",
    margin: "2rem auto 0",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    "&::before": {
      content: '""',
      background: "url(/static/images/circleCenter.svg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      top: "55%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      height: "540px",
      width: "540px",
      position: "absolute",
      zIndex: "-1",
    },
    "&::after": {
      content: '""',
      background: "url(/static/images/circleCenter.svg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      bottom: "-15rem",
      left: "-25rem",
      height: "50rem",
      width: "50rem",
      position: "absolute",
      zIndex: "-1",
    },
  },
  EventIconCardWrapper: {
    margin: "2rem auto 0",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  productsHeader: {
    paddingBottom: "1rem",
    borderBottom: "solid 1px #BDBDBD",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    "& h5": {
      marginBottom: "1rem",
    },
  },
  downloadApp: {
    padding: "3rem 0",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      background: "rgba(235, 238, 239, 0.6)",
      zIndex: "1",
    },
  },
  downloadTitle: {
    position: "relative",
    zIndex: "2",
    marginLeft: "auto",
    "& h3": {
      color: "#2A66EA",
    },
  },
  downloadContent: {
    margin: "0 auto",
    position: "relative",
    zIndex: "2",
    width: "max-content",
    "& h5": {
      marginBottom: "1rem",
      textAlign: "center",
    },
  },
  downloadLinks: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& a": {
      width: "48%",
    },
    "& img": {
      width: "100%",
    },
  },
  ProductsGridWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat( auto-fit, 300px )",
    gridGap:'1rem',
    "&:nth-of-type(1)": {
      paddingTop: "2rem",
    },
    "&:nth-last-of-type(1)": {
      paddingTop: "2rem",
    },
  },
  productContentSection: {
    margin: "3rem 0",
    padding: "2rem",
    backgroundSize: "120%",
    textAlign: "center",
    backgroundPosition: "center",
    "& h4": {
      fontWeight: "600",
    },
    "& button": {
      marginTop: "6rem",
      marginBottom: "2rem",
      width: "290px",
      height: "51px",
      border: "2px solid #000",
      background: "none",
      borderRadius: "5px",
      fontSize: "1rem",
      fontWeight: "600",
    },
  },
  fliterBtn: {
    background: "var(--theme)",
    color: "#fff",
    width: "1rem",
    marginLeft: "auto",
    marginTop: "1rem",
    marginRight: "5px",
    width: "8rem",
    height: "2.5rem",
    display: "flex",
    "&:hover": {
      background: "var(--theme)",
    },
  },
  Breadcrumbs: {
    "& a": {
      fontWeight: "500",
    },
    "& p": {
      fontWeight: "500",
    },
  },
  csoonImg: {
    maxWidth: "500px",
    width: "80%",
    marginBottom: "1rem",
  },
  loadMore: {
    fontSize: "1rem",
    padding: "0.6rem 2rem",
  },
  loadMorewrapper: {
    textAlign: "center",
    position: "relative",
    marginTop: '1.2rem'
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  catBtn: {
    fontSize: "1.5rem",
    textTransform: "capitalize",
    "& + div": {
      zIndex: "99",
    },
    "&:hover": {
      background: "none",
    },
    "& .MuiTouchRipple-root": {
      display: "none",
    },
  },
};

export const mobileStyles = {
  section: {
    padding: "1rem 0",
  },
  productContentSection:{
    margin: '1rem 0',
    paddingBottom: '0'
  },
  spacingBox: {
    margin: "0.5rem 0",
  },
  productsHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    "&> div:nth-child(2)": {
      alignSelf: "flex-end" 
    },
    "& h5":{
      marginBottom:0
    }
  },
  sectionHeader: {
    "& h3": {
      marginBottom: "1rem",
      lineHeight: "2rem",
    },
    "& h2": {
      marginBottom: "0rem",
    },
    "& p": {
      fontSize: "14px",
    },
  },
  IconCardWrapper: {
    "&::after": {
      display: "none",
    },
    "&::before": {
      width: "20rem",
      height: "20rem",
    },
  },
  EventIconCardWrapper: {
    marginTop: '1rem',
    "& .swiper-container":{
      paddingBottom: '2.5rem'
    },
    "& .swiper-pagination-bullet-active":{
      background: 'var(--theme)'
    },
    "& .swiper-button-prev": {
      display: "none",
    },
    "& .swiper-button-next": {
      display: "none",
    },
  },
  downloadTitle: {
    "& h3": {
      marginBottom: "2rem",
      textAlign: "center",
    },
  },
  downloadLinks: {
    "& img": {
      width: "100px",
    },
  },
  ProductsGridWrapper: {
    paddingTop: "1rem",
    "& .event__card": {
      width: "100% !important",
    },
  },
};

export const TabStyles = {
  IconCardWrapper: {
    "&::after": {
      display: "none",
    },
  },
};

export const desktopStyles = {
  downloadTitle: {
    width: "50%",
  },
  EventIconCardWrapper: {
    "& .swiper-pagination":{
      display:'none'
    }
  }
};
