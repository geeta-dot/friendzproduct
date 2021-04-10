// import {
//   secondaryDark, backgroundColor, blueText, mainText
// } from 'src/_styles/colors'

export const commonStyles = {
  card: {
    border: '#D6D6D6 solid 4px',
    boxShadow: 'none',
    width: 'auto',
    maxWidth: '310px',
  },
  Orangecard:{
    border: 'solid 4px var(--theme)'
  },
  cardInner:{
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0.7rem 1rem !important'
  },
  cardHead: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  title: {
    flex: '0 0 80%',
    textAlign: 'left',
    fontSize: '1.35rem',
    fontWeight: '500'
  },
  image: {
    width: 'auto',
    height: '140px',
    objectFit: 'contain',
    maxWidth: '100%'
  },
  cardBody: {
    textAlign: 'center'
  },
  cardFooter: {
    display: 'flex'
  },
  left: {
    flex: '0 0 70%'
  },
  right: {
    flex: '0 0 30%',
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'space-around',
    overflow: 'hidden'
  },
  price:{
    fontSize: '1.5rem',
    fontWeight: '600',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  Orangeprice:{
    color: 'var(--theme)'
  },
  date:{
    fontSize: '0.8rem'
  },
  college:{
    fontSize: '0.8rem',
    color: '#4A4A4A',
    marginTop: '0.2rem'
  },
  excerpt:{
    fontSize: '1rem',
    color: '#4A4A4A'
  }
}

export const mobileStyles = {
  card:{
    margin: 'auto'
  },
  title:{
    fontSize: '1rem'
  },
  excerpt:{
    fontSize: '14px'
  },
  cardFooter:{
    marginTop: '1rem'
  },
  price:{
    fontSize: '1.2rem'
  }
}

export const TabStyles = {

}

export const desktopStyles = {

}
