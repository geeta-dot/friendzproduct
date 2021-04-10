export const commonStyles = {
  section:{
    padding: '2.5rem 0 5rem'
  },
  editTitle:{
    marginBottom: '2rem',
    textAlign: 'center'
  },
  ProfileContainer:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem 1rem',
    border: '#ccc solid 1px',
    marginRight: '2.5rem'
  },
  ProfileImage:{
    borderRadius: '50%',
    marginTop: '2rem',
    width: '200px',
    height: '200px',
    border: 'solid 2px var(--theme)',
    position: 'relative',
    overflow:'hidden',
    '& img':{
      borderRadius:'50%',
      width: '100%'
    },
    '&::after':{
      width: '100%',
      height: '30%',
      content: '""',
      background: 'rgba(145, 109, 213, 0.58)',
      position: 'absolute',
      bottom: '0',
      left: '0%'
    },
  },
  uploadIcon:{
    position: 'absolute',
    bottom :'10%',
    zIndex: '2',
    left: '40%',
    color: '#fff',
    cursor: 'pointer'
  },
  Button:{
    // width: '85%',
    height:'50px',
    marginTop: '2.5rem',
    backgroundColor: 'var(--theme)',
    color: '#fff',
    fontSize: '1rem',
    boxShadow: 'none',
    maxWidth: '250px'
    },
  vHide:{
    visibility: 'hidden'
  },
  form:{
    display: 'flex',
    flexWrap: 'wrap',
    '& .MuiTextField-root':{
      // marginBottom: '1rem'
    }
  },
  card:{
    boxShadow: 'none',
    border: '#ccc solid 1px',
    height: '100%'
    // width: 'max-content'
  },
  cardBody:{
    padding: '2rem !important' 
  },
  formInput:{
    marginBottom: '2rem',
    // marginTop: '1rem',
    width: '50%'
  },
  formInputFullWidth:{
    marginBottom: '1rem',
    marginTop: '1rem',
    width: '100%'
  },
  formInputField:{
    width: '80%',
     '& .MuiTextField-root':{
       width: '100%'
     }
  },
  formInputFieldFull:{
    width: '90%',
    '& .MuiTextField-root': {
      width: '100%'
    }
  },
  // formInputIcon:{
  //   background: '"var(--theme)"',
  //   color: '#fff',
  //   padding: '0.5rem'
  // }
}

export const mobileStyles = {
  ProfileContainer: {
    marginRight: '0',
    marginBottom: '2rem'
  },
  formInput:{
    width: '100%'
  },
  formInputFieldFull: {
    width: '80%',
  }
}

export const TabStyles = {
  ProfileContainer:{
    marginRight: '1.5rem'
  }
}

export const desktopStyles = {

}
