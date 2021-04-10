// import {
//   secondaryDark, backgroundColor, blueText, mainText
// } from 'src/_styles/colors'

export const commonStyles = {
  Footer:{
    padding: '2rem 0',
    backgroundColor: '#151728'
  },
  FooterMenu:{
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '& ul':{
      listStyleType: 'none',
    },
    '& ul li':{
      marginBottom: '0.5rem'
    },
    '& ul li p':{
      color: '#ffffff',
      textTransform: 'uppercase',
      fontSize: '20px',
      fontWeight: 'bold'
    },
    '& ul li a':{
      color: '#ffffff',
      fontSize: '18px',
      fontWeight: '500'
    }
  },
  SocialMenu:{
    '& ul': {
      listStyleType: 'none',
      display: 'flex',
      paddingLeft:0,
      flexWrap: 'wrap'
    },
    '& ul li': {
      marginBottom: '0.5rem'
    },
    '& ul li:first-child': {
      width: '100%'
    },
    '& ul li p': {
      color: '#ffffff',
      textTransform: 'uppercase',
      fontSize: '20px',
      margin:0,
      fontWeight: 'bold'
    },
    '& ul li a': {
      color: '#000',
      marginRight: '0.8rem',
      display: 'inline-block'
    },
    '& ul li svg': {
      width: '1.3em',
      height: '1.3em',
      fill: '#fff',
      marginRight: '10px'
    }
  },
  logo:{
    width:'148px'
  },
  compInfo:{
    color:'#fff',
    paddingRight:'2rem'
  },
  Copyright:{
    backgroundColor: '#151728f0',
    padding: '1rem',
    textAlign: 'center',
    '& p':{
      color: '#fff',
      fontWeight: '500'
    },
    '& a':{
      color: '#fff',
      textDecoration:'underline !important'
    }
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
  contactDetails:{
    '& a':{
      display: 'flex',
      alignItems: 'center'
    },
    '& span':{
      color: '#fff',
      fontSize:'18px',
      display: 'flex',
      alignItems: 'center'
    },
    '& svg':{
      fontSize:'18px',
      marginRight: '10px'
    }
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
  }
}

export const mobileStyles = {
  Copyright:{
    padding:'0.5rem 1rem',
    marginBottom: '2.9rem',
    '& p': {
      fontSize: '14px'
    }
  },
  Footer:{
    paddingTop:'1rem',
    paddingBottom: '0'
  },
  FooterMenu: {
    '& ul': {
      margin: '0',
      borderBottom:'solid 1px #393939',
      textAlign:'center',
      padding: '0.4rem 0',
      width: '100%'
    },
    '& ul li p':{
      margin:0
    },
    '& ul li':{
      marginBottom:'0.3rem'
    },
    '& ul li a': {
      fontSize: '14px'
    },
    '& ul li span': {
      fontSize: '14px'
    }
  },
  logo:{
    display: 'block',
    margin:'auto'
  },
  contactDetails:{
    '& a':{
      justifyContent: 'center'
    },
    '& span':{
      justifyContent: 'center'
    }
  },
  SocialMenu: {
    textAlign:'center',
    '& ul': {
      paddingLeft: '0',
      justifyContent: 'center',
      marginBottom:0,
      borderBottom:'solid 1px #393939'
    },
    '& ul li svg': {
      width: '1em',
      height: '1em',
    }
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
  compInfo:{
    paddingRight:0
  }
}

export const TabStyles = {
  Copyright: {
    marginBottom: '2.9rem'
  },
}

export const desktopStyles = {
  FooterMenu:{
    '& ul': {
      paddingLeft: 0
    },
  },
  downloadTitle: {
    width: "50%",
  },
}
