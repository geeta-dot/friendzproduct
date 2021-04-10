export const commonStyles = {
  section:{
    padding: '2rem 0 5rem',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      background: 'url(/static/images/circleCenter.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      top: '55%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      height: '540px',
      width: '540px',
      position: 'absolute',
      zIndex: '-1'
    },
    '&::after': {
      content: '""',
      background: 'url(/static/images/circleCenter.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      bottom: '-15rem',
      left: '-25rem',
      height: '50rem',
      width: '50rem',
      position: 'absolute',
      zIndex: '-1'
    }
  },
  card: {
    // margin: '0 2rem 2rem 0',
    border: '#D6D6D6 solid 2px',
    boxShadow: 'none',
    padding: '1.5rem 2rem',
    borderRadius: '6px',
    position: 'relative'
  },
  Gallery:{
    '& .image-gallery-thumbnail':{
      width: '23%'
    },
    '& .image-gallery-thumbnail.active':{
      border: '4px solid var(--theme)'
    },
    '& .image-gallery-left-nav .image-gallery-svg':{
      width: '60px',
      height: '60px',
      color: 'black',
    },
    '& .image-gallery-right-nav .image-gallery-svg':{
      width: '60px',
      height: '60px',
      color: 'black',
    },
    '& .image-gallery-thumbnails-wrapper':{
      marginTop: '2rem'
    },
    '& .image-gallery-left-nav':{
      left: '-3.5rem',
      outline: 'none'
    },
    '& .image-gallery-right-nav':{
      right: '-3.5rem',
      outline: 'none'
    },
    '& .video-wrapper iframe':{
      width: '100%',
      height: '500px'
    },
    '& .video-wrapper video':{
      width: '100%',
      height: '500px'
    },
    '& .play-button': {
      cursor: 'pointer',
      position: 'absolute',
      left: '0',
      top: '0',
      bottom: '0',
      right: '0',
      margin: 'auto',
      height: '60px',
      width: '100px',
      backgroundColor: 'rgba(0,0,0,.7)',
      borderRadius: '5px',
    },
    '& .play-button::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: '16.5px',
      left: '40px',
      margin: '0 auto',
      borderStyle: 'solid',
      borderWidth: '12.5px 0 12.5px 20px',
      borderColor: 'transparent transparent transparent rgba(255,255,255,1)',
    }
  },
  heading:{
    color: '#868686',
    fontSize: '1.1rem'
  },
  paragraph:{
    fontSize: '1.2rem',
    fontWeight: '500'
  },
  box:{
    marginBottom: '2rem'
  },
  Pricebox:{
    borderTop: 'solid 1px #D6D6D6',
    paddingTop: '1rem',
    '& h4':{
      fontWeight: '600'
    }
  },
  cardInnerBody:{
    display: 'flex',
    width: '100%',
    paddingBottom: '0 !important'
  },
  Left: {
    width: '100%'
  },
  Right:{
    width: '80px',
    position: 'absolute',
    right: '1rem',
    top: '1rem',
    display: 'flex',
    justifyContent: 'space-around'
  },
  SellerCard:{
    padding:0,
    '& .MuiCardContent-root':{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  },
  cardInner:{
    padding:'0 !important'
  },
  cardHead:{
    padding: '2.5rem 2rem 0 2rem',
    display: 'flex',
    flexWrap: 'wrap'
  },
  sellerImg:{
    '& img':{
      width: '71px',
      height: '71px',
      borderRadius: '50%',
      border: 'solid 2px var(--theme)'
    }
  },
  sellerDetails:{
    marginLeft: '2rem',
    flex: '1'
  },
  cardAction:{
    display: 'flex',
    flexWrap: 'wrap',
    '& button':{
      width: '50%',
      borderRadius: 0,
      boxShadow: 'none',
      height: '4rem',
    }
  },
  primaryBtn:{
    background: 'var(--theme)',
    color: '#fff',
    '&:hover': {
      background: 'var(--theme)',
    }
  },
  secondaryBtn:{
    background: '#EBEEEF',
    '&:hover': {
      background: '#EBEEEF',
    }
  },
  grid: {
    display: 'grid',
    gridGap: '2rem'
  },
}

export const mobileStyles = {
  card: {
    padding: '1rem',
    marginRight: '0'
  },
  Gallery: {
    '& .image-gallery-thumbnail': {
      width: '33%'
    },
    '& .video-wrapper iframe': {
      width: '100%',
      height: '220px'
    },
    '& .video-wrapper video': {
      width: '100%',
      height: '220px'
    },
  },
  SellerCard:{
    padding: '0',
    order: '1'
  },
  cardHead:{
    padding: '1.5rem 1rem'
  },
  heading:{
    fontSize: '14px'
  }
}

export const desktopStyles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6,1fr)',
    gridGap: '2.5rem'
  },
  spanRow2: {
    gridRow: 'span 3 / auto'
  },
  spanCol2: {
    gridColumn: 'span 3 / auto'
  },
  spanCol4: {
    gridColumn: 'span 3 / auto'
  },
  spanCol6: {
    gridColumn: 'span 6 / auto'
  }
}
