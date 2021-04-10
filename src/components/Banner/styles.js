// import {
//   secondaryDark, backgroundColor, blueText, mainText
// } from 'src/_styles/colors'

export const commonStyles = {
  carousel: {
    // marginBottom: '1rem',
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
    '& .swiper-pagination': {
      bottom: '1.5rem'
    },
    '& .swiper-pagination-bullet': {
      width: '16px',
      height: '16px',
      border: 'solid #fff 1px',
      background: 'transparent',
      opacity: 1
    },
    '& .swiper-pagination-bullet-active': {
      background: '#fff'
    },
  },
  BannerSlide: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  slideContent: {
    height: '700px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#fff',
    '& h1': {
      marginBottom: '1rem'
    }
  },
  Button: {
    marginTop: '2rem',
    width: '14rem',
    height: '4.5rem',
    fontSize: '1.4rem',
    color: '#fff',
    borderRadius: '10px',
    backgroundColor: '#000',
    '&:hover': {
      backgroundColor: '#000',
      textDecoration: 'none'
    }
  }
}

export const desktopStyles = {
  slideContent: {
    padding: '0 2rem',
    height: '510px',
    '& h1': {
      fontSize: '5rem'
    }
  },
  Button: {
    width: '12.5rem',
    height: '4.2rem',
    fontSize: '1.4rem',
  }
}

export const TabStyles = {
  slideContent: {
    padding: '0 2rem',
    height: '420px',
    '& h1': {
      fontSize: '3.5rem',
      marginBottom: '0.5rem'
    }
  },
  Button: {
    width: '11.5rem',
    height: '4rem',
    fontSize: '1.3rem',
    marginTop: '1.5rem'
  }
}

export const mobileStyles = {
  carousel: {
    '& .swiper-button-prev': {
      transform: 'scale(0.6)'
    },
    '& .swiper-button-next': {
      transform: 'scale(0.6)'
    }
  },
  slideContent: {
    padding: '0 1rem',
    height: '420px',
    '& h1': {
      fontSize: '2.5rem',
      marginBottom: '0.5rem'
    },
  },
  Button: {
    width: '8.5rem',
    height: '3rem',
    fontSize: '1rem',
    marginTop: '1.5rem'
  }
}