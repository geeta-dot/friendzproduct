// import {
//   secondaryDark, backgroundColor, blueText, mainText
// } from 'src/_styles/colors'

export const commonStyles = {
  card: {
    border: 'none',
    background: 'none',
    boxShadow: 'none',
    width: '284px',
    height: '284px',
    margin: '1rem',
    '&:hover': {
      background: '#fff',
      boxShadow: '0 14px 18px rgba(0,0,0,0.09)'
    }
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center'
  },
  image: {
    width: '100px',
    height: '127px',
    objectFit: 'contain'
  },
  eventName: {
    marginTop: '1rem'
  }
}

export const mobileStyles = {
  card: {
    width: '31%',
    height: '7.5rem',
    margin: '1%'
  },
  image: {
    width: '50px',
    height: '50px',
    marginBottom: '5px'
  },
  eventName: {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    wordBreak: 'break-all',
    marginTop:0
  },
  cardBody: {
    padding: '1rem !important',
    display: 'block'
  }
}

export const TabStyles = {
  card: {
    width: '200px',
    height: '8.5rem',
    margin: '1%'
  },
  image: {
    width: '80px',
    height: '80px',
    marginBottom: '5px'
  },
  eventName: {
    fontSize: '1rem',
    lineHeight: '1.2rem',
    wordBreak: 'break-all',
    marginTop: 0
  },
  cardBody: {
    padding: '1rem !important',
    display: 'block'
  }
}

export const desktopStyles = {
  card: {
    width: '324px',
    height: '310px',
  },
  image: {
    width: '150px',
    height: '167px',
    objectFit: 'contain'
  },
}
