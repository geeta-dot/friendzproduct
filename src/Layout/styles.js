// import {
//   secondaryDark, backgroundColor, blueText, mainText
// } from 'src/_styles/colors'

export const commonStyles = {
  Wrapper: {
    '& ::-webkit-scrollbar': {
      width: '10px',
      backgroundColor: '#F5F5F5',
    },
    '& ::-webkit-scrollbar-thumb': {
      backgroundColor: 'var(--theme)',
    },
    '& a': {
      cursor: 'pointer !important',
      textDecoration: 'none'
    },
    '& .dialogeCustom .MuiGrid-spacing-xs-8':{
      width: '100%',
      margin: '0'
    }
  },
  Main: {
    '& .swiper-container-horizontal > .swiper-scrollbar': {
      display: 'none'
    },
    '& .image-gallery-content .image-gallery-slide .image-gallery-image':{
      maxHeight: 'calc(100vh - 80px)',
      height: '500px',
      objectFit: 'cover'
    }
  },
  loader: {
    position: 'fixed',
    width: '100vW',
    height: '100vh',
    display: 'flex',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    background: 'rgba(0,0,0,0.7)'
  },
}

export const mobileStyles = {
  Main: {
    paddingTop: '56px',
    '& .swiper-container-horizontal > .swiper-scrollbar': {
      display: 'block',
      bottom: '0'
    },
    '& .swiperScrollbarDrag': {
      backgroundColor: 'rgb(252, 130, 26)'
    },
    '& .image-gallery-content .image-gallery-slide .image-gallery-image': {
      height: 'auto',
      width: '100%',
      objectFit: 'contain'
    }
  }
}

export const TabStyles = {
  Main: {
    paddingTop: '56px'
  },
}

export const desktopStyles = {
  Main: {
    paddingTop: '7.5rem'
  },
  Wrapper: {
    '& .MuiContainer-maxWidthXl': {
      width: '90%',
      maxWidth: '1404px'
    }
  }
}
