export const commonStyles = {
  root:{
    marginTop: '3rem',
    marginBottom: 0,
    borderBottom: 'solid 1px #BDBDBD',
    '& .MuiAccordion-root':{
      borderTop: 'solid 1px #BDBDBD',
      boxShadow: 'none'
    },
    '& .MuiAccordionSummary-content.Mui-expanded':{
      marginBottom: '0'
    },
    '& .MuiAccordion-root.Mui-expanded':{
      margin: '0'
    },
    '& .MuiAccordionDetails-root':{
      paddingLeft: '0',
      maxHeight: '300px',
      overflow: 'auto'
    },
    '& .MuiAccordionSummary-root':{
      paddingLeft: '0'
    },
    '& .MuiFormControlLabel-label':{
      fontSize: '1.1rem'
    },
    '& .MuiCheckbox-colorPrimary.Mui-checked + .MuiFormControlLabel-label':{
      color: 'var(--theme)'
    },
  },
  title:{
    fontSize: '20px',
  },
  heading:{
    fontSize: '20px',
    marginBottom:'1rem'
  },
  searchField:{
    width: '100%',
    margin: '1rem 0',
    border: 'solid 2px var(--theme)',
    padding: '0.7rem 1rem'
  },
  filterBtn:{
    marginTop:'1rem',
    background:'var(--theme)',
    color: '#fff',
    fontSize: '1rem',
    '&:hover':{
      background: 'var(--theme)'
    }
  }
}

export const mobileStyles = {

}

export const TabStyles = {

}

export const desktopStyles = {
  root:{
    marginRight: '2rem'
  }
}
