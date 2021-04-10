// import {
//   secondaryDark, backgroundColor, blueText, mainText
// } from 'src/_styles/colors'
// import {
//   HeadFont
// } from 'src/_styles/global'

export const commonStyles = {
  card: {
    background: 'none',
    boxShadow: 'none',
    margin: '1rem 0.5rem',
    '& .cardBody':{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: '100%'
    },
    '&:nth-child(even) .cardBody':{
      flexDirection: 'row-reverse'
    },
    '& .image':{
      maxHeight: '350px',
      width: 'auto',
      marginRight: '5rem',
      objectFit: 'contain',
      marginBottom: '1rem'
    },
    '&:nth-child(even) .image': {
      marginLeft: '5rem',
    },
    '&:nth-child(even) .content': {
      textAlign: 'right',
    },
  },
  title: {
    margin: '1rem 0'
  },
  excerpt: {
    fontSize: '1.25rem'
  },
  Button: {
    marginTop: '3rem',
    width: '12rem',
    height: '3.5rem',
    fontSize: '1rem',
    color: '#fff',
    borderRadius: '10px',
    backgroundColor: '#000',
    '&:hover': {
      backgroundColor: '#000',
      textDecoration: 'none'
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    background: '#fff',
    border: 'solid #fff 5px',
    boxShadow: 'none',
    padding: 0,
    width: '80%',
    '& iframe': {
      width: '100%'
    }
  }
}

export const mobileStyles = {
  card: {
    marginTop: '0.5rem',
    '& .cardBody': {
      flexDirection: 'column',
      paddingTop: '0',
      paddingBottom: '0',
    },
    '&:nth-child(even) .cardBody': {
      flexDirection: 'column'
    },
    '& .image': {
      width: '100%',
      marginRight: '0',
      objectFit: 'contain',
      marginBottom: '0'
    },
    '&:nth-child(even) .image': {
      marginLeft: '0',
    },
    '&:nth-child(even) .content': {
      textAlign: 'left',
    }
  },
  paper: {
    '& iframe': {
      height: '400px'
    }
  },
  excerpt:{
    fontSize: '14px'
  }
}

export const TabStyles = {
  card: {
    '& .image': {
      marginRight: '2rem',
    },
    '&:nth-child(even) .image': {
      marginLeft: '2rem',
    },
  },
  Button:{
    marginTop: '1.5rem'
  }
}

export const desktopStyles = {

}
