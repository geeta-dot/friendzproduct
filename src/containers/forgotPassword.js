import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../Layout";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import SubtitlesIcon from "@material-ui/icons/Subtitles";
import DetailsIcon from "@material-ui/icons/Details";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ForgotPasswordAPI , UpdatePasswordAPI} from "../apis/global-api";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useDispatch } from "react-redux";
import { authenticated } from "../redux/actions/auth";
import { useRouter } from "next/router";
import { fileToBase64 } from "../Utils/helpers";
import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles((theme) => ({
  section: {
    padding: "5rem 0",
    position: "relative",
    overflow: "hidden",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
  },
  pdTitle: {
    marginBottom: "2rem",
  },
  card: {
    boxShadow: "none",
    border: "#ccc solid 1px",
    height: "100%",
    background: "rgba(255, 255, 255, 0.6)",
    "&::before": {
      content: '""',
      background: "url(/static/images/circleCenter.svg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      top: "55%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      height: "540px",
      width: "540px",
      position: "absolute",
      zIndex: "-1",
    },
    "&::after": {
      content: '""',
      background: "url(/static/images/circleCenter.svg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      bottom: "-15rem",
      left: "-25rem",
      height: "50rem",
      width: "50rem",
      position: "absolute",
      zIndex: "-1",
    },
  },
  cardBody: {
    padding: "2rem !important",
  },
  formInput: {
    marginBottom: "2rem",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  formInputFullWidth: {
    width: "100%",
  },
  formInputField: {
    width: "80%",
    "& .MuiTextField-root": {
      width: "100%",
    },
  },
  formInputFieldFull: {
    [theme.breakpoints.up("sm")]: {
      width: "90%",
      "& .MuiTextField-root": {
        width: "100%",
      },
      '& textarea':{
        width: '100%',
        border: 'none',
        borderBottom: 'solid 1px #ccc',
        height: '50px'
      },
      '& textarea:focus':{
        outline: 'none',
        borderBottom: 'solid 1px var(--theme)'
      }
    },
  },
  formControl: {
    width: "100%",
  },
  Button: {
    width: "80%",
    height: "50px",
    marginTop: "1rem",
    backgroundColor: "var(--theme)",
    color: "#fff",
    fontSize: "1rem",
    boxShadow: "none",
    maxWidth: "200px",
  },
  Images: {
    display: "flex",
    flexWrap: "wrap",
    "& img": {
      width: "125px",
      height: "125px",
      objectFit: "contain",
      marginRight: "10px",
      marginBottom: "10px",
      border: "solid 1px #333 ",
    },
    "& video": {
      width: "125px",
      height: "125px",
      objectFit: "contain",
      marginRight: "10px",
      marginBottom: "10px",
      border: "solid 1px #333 ",
    },
  },
  AddBtn: {
    border: "solid 1px #333",
    width: "125px",
    height: "125px",
    display: "grid",
  },
  dialogeCustom: {
    "& .MuiGrid-spacing-xs-8": {
      width: "100%",
      margin: "0",
    },
  },
}));

export default function ForgotPassword({  }) {
  const classes = useStyles();
  const [email, setemail] = useState('');
  const [successMsg, setsuccessMsg] = useState('');  
  const [page, setpage] = useState('forgot');
  const [code, setcode] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');


  const [errs, seterrs] = useState({});

  const [loading, setloading] = useState(false);
  const [loadingUni, setloadingUni] = useState(false);
  const [backdrop, setbackdrop] = useState(false);
  const [formerrs, setformerrs] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();



  const checkValidation = () => {
    setformerrs("");
    if (
      !email
       ){
      setformerrs(["Email is required"]);
      return false;
    }
   
    return true;
  };

  const handleSubmit = (e, uploaded_files) => {

    e && e.preventDefault();
    let is_valid = checkValidation();

    if (!is_valid) {
      return;
    }
    
    setbackdrop(true);
       let data = {
      email: email,
      
    };
    
      ForgotPasswordAPI(data).then((response) => {
        if (response && response.error) {
          setbackdrop(false);
          setformerrs(response.msg);
         
        } else {
          setbackdrop(false);
          setsuccessMsg('You may have got the 6 digit code in your email for reset the password.')          
          setpage('reset')
        }
      });
    
  };


  const handleSubmitReset = (e, uploaded_files) => {

    e && e.preventDefault();
    let is_valid = checkValidation();

    if (!is_valid) {
      return;
    }

    if(password.length < 6){
      setformerrs(["Password must be 6 characters long"]);
      return;
    }
    if(password !=confirmpassword){
      setformerrs(["Password and confirm password should be same"]);
      return;
    }

    setbackdrop(true);
       let data = {
      email:email,
      code: code,
      password:password,
      confirmpassword:confirmpassword
      
    };
    
      UpdatePasswordAPI(data).then((response) => {
        if (response && response.error) {
          setbackdrop(false);
          setformerrs(response.msg);
          setpage('reset')
        } else {
            setsuccessMsg('Password reset successfully. Redirecting....')  
            window.location.replace("/?signup=open");
         }
      });
    
  };

   const updateformData = (e, type) => {
    e.preventDefault();
    eval("set" + type + "('" + e.target.value + "')");
  };

 

  return (
    <Layout>
      <section className={classes.section}>
        {backdrop && (
          <Backdrop
            className={classes.backdrop}
            open={backdrop}
            // onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <Container maxWidth="xl">
          <Grid container>
            <Grid item lg={9} md={9} sm={8} xs={12} style={{ margin: "auto" }}>
              <Card className={classes.card}>
                <CardContent className={classes.cardBody}>
                  <Typography variant="h4" style={{ marginBottom: "1rem" }}>
                    Forgot Password

                  </Typography>
                  <span className="success-msg" style={{ color: "green", fontSize:"16px",textAlign:"center" }}>{successMsg}</span>
                  {page =='forgot' && (

                  <form
                    className={classes.form}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                  <div className={`${classes.formInput} ${classes.formInputFullWidth}`}>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <SubtitlesIcon />
                        </Grid>
                        <Grid item className={classes.formInputField}>
                          <TextField
                            id="email"
                            label="Email"
                            value={email}
                            onChange={(e) => updateformData(e, "email")}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  
             
                   

                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.Button}
                    >
                     Submit
                    </Button>
                  </form>
                  )}

                  {page =='reset' && (

                  <form
                    className={classes.form}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmitReset}
                  >
                  <div className={`${classes.formInput} ${classes.formInputFullWidth}`}>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <SubtitlesIcon />
                        </Grid>
                        <Grid item className={classes.formInputField}>
                          <TextField
                            id="code"
                            label="Code"
                            value={code}
                            onChange={(e) => updateformData(e, "code")}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <div className={`${classes.formInput} ${classes.formInputFullWidth}`}>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <SubtitlesIcon />
                        </Grid>
                        <Grid item className={classes.formInputField}>
                          <TextField
                            id="password"
                            label="Password"
                            value={password}
                            type="password"
                            onChange={(e) => updateformData(e, "password")}
                          />
                        </Grid>
                      </Grid>
                    </div>

                     <div className={`${classes.formInput} ${classes.formInputFullWidth}`}>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <SubtitlesIcon />
                        </Grid>
                        <Grid item className={classes.formInputField}>
                          <TextField
                            id="confirmpassword"
                            label="Confirm Password"
                            value={confirmpassword}
                            type="password"
                            onChange={(e) => updateformData(e, "confirmpassword")}
                          />
                        </Grid>
                      </Grid>
                    </div>

                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.Button}
                    >
                     Submit
                    </Button>
                  </form>
                  )}

                  {formerrs.length > 0 &&
                    formerrs.map((msg, index) => (
                      <Typography color="error" key={`error${index}`}>
                        {msg}
                      </Typography>
                    ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Layout>
  );
}
