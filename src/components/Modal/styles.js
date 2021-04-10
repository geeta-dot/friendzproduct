export const commonStyles = {
  card: {
    border: 'none',
    boxShadow: 'none',
    margin: '1rem 1.5rem'
  },
  Autocomplete:{
    '& .MuiInputBase-root': {
      width: '250px'
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
    width: '90px',
    height: '80px',
    objectFit: 'contain',
    marginBottom: '1rem'
  },
  title: {
    marginBottom: '1rem',
    textAlign: 'center'
  },
  Button: {
    marginTop: '2rem',
    fontSize: '1rem',
    color: '#fff',
    borderRadius: '4px',
    width: '150px',
    backgroundColor: '#000',
    '&:hover': {
      backgroundColor: '#000',
      textDecoration: 'none'
    }
  },
  closeIcon:{
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    color: '#444'
  }
}

export const mobileStyles = {
  image: {
    width: '50px',
    height: '50px',
    marginBottom: '5px'
  },
  cardBody: {
    padding: '1rem !important'
  }
}

export const TabStyles = {

}

export const desktopStyles = {

}
