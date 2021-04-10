import React, { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import DetailsIcon from "@material-ui/icons/Details";
import SchoolIcon from "@material-ui/icons/School";
import LockIcon from "@material-ui/icons/Lock";
import AttachmentOutlinedIcon from "@material-ui/icons/AttachmentOutlined";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { commonStyles, desktopStyles, mobileStyles, TabStyles } from "./styles";
import Link from "next/link";
import PageLoader from "../PageLoader";
import { ResetPasswordAPI } from "../../apis/auth-api";
const useStyles = makeStyles((theme) => ({
  ...commonStyles,
  [theme.breakpoints.up("sm")]: desktopStyles,
  [theme.breakpoints.between("xs", "sm")]: TabStyles,
  [theme.breakpoints.down("xs")]: mobileStyles,
}));
import { useDispatch } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { authenticated } from "../../redux/actions/auth";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ImageCropper from "../ImageCropper";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ResetPassword = ({ user }) => {
  const [loading, setloading] = useState(false);
  const [searchloading, setsearchloading] = useState(false);
  const [error, seterror] = useState([]);
  const [password, setpassword] = useState('');
  const [oldpassword, setoldpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [snackbar, setsnackbar] = useState(false);
  const [snackbarMsg, setsnackbarMsg] = useState("");
  const [snackbarType, setsnackbarType] = useState("success");

  const dispatch = useDispatch();
  const classes = useStyles();

  

  const updatePassword = () => {

    let is_valid = checkValidation();

    if (!is_valid) {
      return;
    }    
    let data = {
      password: password,
      confirmpassword: confirmpassword,
      oldpassword: oldpassword,
      user_id:user.id
      
    };
    
    setloading(true);
    ResetPasswordAPI(data, user.id).then((data) => {
      setloading(false);
      if (data && data.error) {
        seterror(data.msg);
      } else {
        setsnackbar(true);
        setsnackbarMsg("Password updated successfully.");
        setsnackbarType("success");
        setpassword('')
        setoldpassword('')
        setconfirmpassword('')
      } 
    });
  };

  const checkValidation = () => {
    seterror("");
    if (
      !password ||
      !oldpassword ||
      !confirmpassword 
    ) {
      seterror(["All fields are required"]);
      return false;
    }
   if(password.length < 6){
    seterror(["Password must be 6 chracters long"]);
    return false;
   };
   if(password != confirmpassword){
    seterror(["Confirm password not matched"]);
    return false;
   };
   return true;
 }

  const updateformData = (e, type) => {
    e.preventDefault();
    eval("set" + type + "('" + e.target.value + "')");
  };

 

  const handlesnackbar = () => {
    setsnackbar(!snackbar);
  };

  return (
    <section className={classes.section}>
      <Container maxWidth="xl">
        <PageLoader loading={loading} />
       
        <Snackbar
          open={snackbar}
          autoHideDuration={6000}
          onClose={handlesnackbar}
        >
          <Alert onClose={handlesnackbar} severity={snackbarType}>
            {snackbarMsg}
          </Alert>
        </Snackbar>

        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography className={classes.editTitle} variant="h3">
              Reset Password
            </Typography>
          </Grid>
          
          <Grid item lg={9} md={9} sm={8} xs={12}>
            <Card className={classes.card}>
              <CardContent className={classes.cardBody}>
                {/* <Typography variant="h5">Edit Profile Details</Typography> */}
                <form className={classes.form} noValidate autoComplete="off">
                  <div className={`${classes.formInput} ${classes.formInputFullWidth}`}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <PersonIcon />
                      </Grid>
                      <Grid item className={classes.formInputField}>
                        <TextField
                          id="fname"
                          label="Old Password"
                          value={oldpassword}
                          type='password'
                          onChange={(e) => updateformData(e, "oldpassword")}
                        />
                      </Grid>
                    </Grid>
                  </div>
                    <div className={`${classes.formInput} ${classes.formInputFullWidth}`}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <PersonIcon />
                      </Grid>
                      <Grid item className={classes.formInputField}>
                        <TextField
                          id="fname"
                          label="New Password"
                          value={password}
                          type='password'
                          onChange={(e) => updateformData(e, "password")}
                        />
                      </Grid>
                    </Grid>
                  </div>
                    <div className={`${classes.formInput} ${classes.formInputFullWidth}`}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <PersonIcon />
                      </Grid>
                      <Grid item className={classes.formInputField}>
                        <TextField
                          id="fname"
                          label="ConfirmPassword"
                          value={confirmpassword}
                          type='password'
                          onChange={(e) => updateformData(e, "confirmpassword")}
                        />
                      </Grid>
                    </Grid>
                  </div>
                

                  <Button
                    variant="contained"
                    className={classes.Button}
                    onClick={updatePassword}
                  >
                    Update
                  </Button>
                </form>
                <div>
                  {error.length > 0 &&
                    error.map((text, index) => (
                      <Typography color="error" key={`err-${index}`}>
                        {text}
                      </Typography>
                    ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default ResetPassword;
