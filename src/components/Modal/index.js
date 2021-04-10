import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import { Button, Card, CardContent, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { commonStyles, desktopStyles, mobileStyles, TabStyles } from './styles'
import styled from "styled-components";
import { searchUniversities } from "../../apis/global-api";

import { useRouter } from "next/router";

const StyledDialog = styled(Dialog)`
  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;


const useStyles = makeStyles(theme => ({
  ...commonStyles,
  [theme.breakpoints.up('sm')]: desktopStyles,
  [theme.breakpoints.between('xs', 'sm')]: TabStyles,
  [theme.breakpoints.down('xs')]: mobileStyles
}))

const Modal = ({ openStatus }) => {

  useEffect(() => {
    console.log('openStatus', openStatus)
    setopen(openStatus)

  }, [openStatus])

  const [open, setopen] = useState(openStatus);
  const [loading, setloading] = useState(false);
  const [universities, setuniversities] = useState([
    {
      name: "",
      id: "",
    },
  ]);

  const [university, setuniversity] = useState({
    name: "",
    id: "",
  });
  const openModal = () => {
    setopen(true);
  };

  const closeModal = () => {
    setopen(false);
  };
  const router = useRouter();

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 }
  ]

  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };

  const flatProps = {
    options: top100Films.map((option) => option.title),
  };

  const handleUniSearch = (e) => {
    let value = e.target.value;
    if (!value) return;
    setloading(true);
    searchUniversities(value).then((response) => {
      setloading(false);
      setuniversities(response);
    });
  };

  const [value, setValue] = React.useState(null);

  const handleFormSubmit=()=>{
    // let uni = universities.find(
    //   (item) => item.name == university.name
    // );
    closeModal()
    router.push("/products?m_uni=" + university.name);
    // console.log(uni)
  }

  const classes = useStyles()

  return (
    <>
      {/* <button onClick={openModal} style={{ margin: '1rem auto' }}>Open Modal</button> */}
      <StyledDialog
        open={open}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
        className={classes.modal}
      >
        <Card className={classes.card}>
          <CardContent className={classes.cardBody}>
            <CloseIcon onClick={closeModal} className={classes.closeIcon} />
            <img src="/static/images/logo.png" alt="" className={classes.image} />
            <Typography variant="h5" className={classes.title}>Fill Important Details</Typography>
            <Typography >To make Your Search Easy Kindly Please Select Your College Name or Location</Typography>
            <form className={classes.container}>
              {/* <Autocomplete
                {...defaultProps}
                id="debug"
                className={classes.Autocomplete}
                debug
                renderInput={(params) => <TextField {...params} label="Type Your College Name" margin="normal" />}
              /> */}

              <Autocomplete
                className={classes.Autocomplete}
                required
                options={universities}
                getOptionLabel={(option) => {
                  return option.name;
                }}
                getOptionSelected={(option, value) =>
                  option.name === value.name
                }
                loading={loading}
                // value={university}
                onInputChange={(e) => e && handleUniSearch(e)}
                // onChange={(e) => updateformData(e, "university")}
                onSelect={(e) =>
                  e.target.value && setuniversity({ name: e.target.value })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Type Your College Name" margin="normal" />
                )}
              />

              <Button variant="contained" className={classes.Button} onClick={handleFormSubmit}>
                Done
              </Button>
            </form>
          </CardContent>
        </Card>
      </StyledDialog>
    </>
  );
}

export default Modal
