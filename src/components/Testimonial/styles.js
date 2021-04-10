// import {
//   secondaryDark, backgroundColor, blueText, mainText
// } from 'src/_styles/colors'

export const commonStyles = {
  carousel: {
    marginTop: '5rem',
    '& .swiper-button-prev': {
      color: '#000',
      left: '4%',
      outline: 'none'
    },
    '& .swiper-button-next': {
      color: '#000',
      right: '4%',
      outline: 'none'
    },
    '& .swiper-button-disabled': {
      opacity: '0'
    },
    '& .swiper-container': {
      paddingBottom: '2rem'
    },
    '& .swiper-slide-shadow-left': {
      backgroundImage: 'linear-gradient(to left, var(--theme-light), rgba(0, 0, 0, 0))'
    },
    '& .swiper-slide-shadow-right': {
      backgroundImage: 'linear-gradient(to left, var(--theme-light), rgba(0, 0, 0, 0))'
    }
  },
  slideContent: {
    marginTop: '1rem'
  },
  card:{
    width: '100%',
    minHeight: '500px',
    boxShadow: '0 14px 18px rgba(0,0,0,0.05)',
  },
  cardBody:{
    textAlign: 'center',
    padding: '2rem 3rem'
  },
  name:{
    marginBottom: '5px',
    textTransform: 'uppercase'
  },
  review:{
    marginTop: '1.5rem',
    fontSize: '1.2rem'
  },
  image:{
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    objectFit: 'cover'
  }
}

export const mobileStyles = {
  carousel:{
    marginTop: '1rem',
    '& .swiper-button-prev': {
      transform: 'scale(0.6)'
    },
    '& .swiper-button-next': {
      transform: 'scale(0.6)'
    },
    '& .swiper-container': {
      paddingBottom: 0
    }
  },
  review:{
    fontSize: '14px',
    marginTop: '1rem'
  },
  card:{
    minHeight: 'auto'
  },
  cardBody:{
    padding: '2rem'
  }
}

export const TabStyles = {

}

export const desktopStyles = {

}
