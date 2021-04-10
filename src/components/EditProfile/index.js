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
import { editProfile, updateProfileImg } from "../../apis/auth-api";
const useStyles = makeStyles((theme) => ({
  ...commonStyles,
  [theme.breakpoints.up("sm")]: desktopStyles,
  [theme.breakpoints.between("xs", "sm")]: TabStyles,
  [theme.breakpoints.down("xs")]: mobileStyles,
}));
import { useDispatch } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { searchUniversities } from "../../apis/global-api";
import { authenticated } from "../../redux/actions/auth";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ImageCropper from "../ImageCropper";
import Router from "next/router";
import { isPhone } from "../../Utils/helpers";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EditProfile = ({ user }) => {
  const [loading, setloading] = useState(false);
  const [searchloading, setsearchloading] = useState(false);
  const [error, seterror] = useState([]);
  const [firstname, setfirstname] = useState(user.first_name);
  const [lastname, setlastname] = useState(user.last_name);
  const [university, setuniversity] = useState({
    name: user.university ? user.university.name : "",
  });
  const [phone_no, setphone_no] = useState(user.phone_number);
  const [universities, setuniversities] = useState([
    {
      name: user.university ? user.university.name : "",
      id: user.university ? user.university.id : "",
    },
  ]);
  const [branch, setbranch] = useState(user.branch);
  const [snackbar, setsnackbar] = useState(false);
  const [snackbarMsg, setsnackbarMsg] = useState("");
  const [snackbarType, setsnackbarType] = useState("success");
  const [imageCrop, setimageCrop] = useState(false);
  const [imgFile, setimgFile] = useState("");

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
   if(!user.is_complete){
     setsnackbar(true);
     setsnackbarMsg("Please complete your profile before proceeding");
     setsnackbarType("error");
   }
  }, [])

  const updateProfile = () => {
    let university_id = universities.find(
      (item) => item.name == university.name
    );
    let data = {
      first_name: firstname,
      last_name: lastname,
      university_id: university_id.id,
      phone_number: phone_no,
      branch: branch,
      email: user.email,
    };
    if (phone_no && !isPhone(phone_no)){
      seterror(['Phone number is not valid'])
      return
    } setloading(true);
    editProfile(data, user.id).then((data) => {
      setloading(false);
      if (data && data.error) {
        seterror(data.msg);
      } else if (data && data.body && data.body.user) {
        dispatch(authenticated(data.body.user, data.body.user.api_token));
        setsnackbar(true);
        setsnackbarMsg("Updated successfully.");
        setsnackbarType("success");
         Router.push("/");
      } else {
        setsnackbar(true);
        setsnackbarMsg("There is some error.Please try again later");
        setsnackbarType("error");
      }
    });
  };

  const updateformData = (e, type) => {
    e.preventDefault();
    eval("set" + type + "('" + e.target.value + "')");
  };

  const handleUniSearch = (e) => {
    let value = e.target.value;
    if (!value) return;
    setsearchloading(true);
    searchUniversities(value).then((response) => {
      setsearchloading(false);
      setuniversities(response);
    });
  };

  const handlesnackbar = () => {
    setsnackbar(!snackbar);
  };

  const handleProfileChange = (e) => {
    let files = e.target.files;
    if (files.length) {
      var tmppath = URL.createObjectURL(event.target.files[0]);
      setimgFile(tmppath);
      setimageCrop(true);
    }
  };

  const saveProfileImage = (data) => {
    let formData = {
      img: data,
      api_token: user.api_token,
    };
    updateProfileImg(formData).then((data) => {
      setimageCrop(false);
      setimgFile("");
      if (data && data.error) {
        seterror(data.msg);
      } else if (data && data.body && data.body.user) {
        dispatch(authenticated(data.body.user, data.body.user.api_token));
        setsnackbar(true);
        setsnackbarMsg("Updated successfully.");
        setsnackbarType("success");
      } else {
        setsnackbar(true);
        setsnackbarMsg("There is some error.Please try again later");
        setsnackbarType("error");
      }
    });
  };

  return (
    <section className={classes.section}>
      <Container maxWidth="xl">
        <PageLoader loading={loading} />
        <ImageCropper
          open={imageCrop}
          handleSave={saveProfileImage}
          handleClose={() => setimageCrop(!imageCrop)}
          image={imgFile}
        />
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
              Edit Profile Details
            </Typography>
          </Grid>
          <Grid item lg={3} md={3} sm={4} xs={12}>
            <Box className={classes.ProfileContainer}>
              <Typography variant="h5">Add image</Typography>
              <div className={classes.ProfileImage}>
                <img
                  src={
                    user.profile_img
                      ? user.profile_img
                      : "/static/images/placeholder.jpg"
                  }
                />
                <input
                  type="file"
                  name="file"
                  id="file"
                  className={classes.vHide}
                  onChange={handleProfileChange}
                  accept="image/*"
                />
                <label htmlFor="file">
                  <AttachmentOutlinedIcon className={classes.uploadIcon} />
                </label>
              </div>
              <a href="/profile">
                <Button variant="contained" className={classes.Button}>
                  View Profile
                </Button>
              </a>
            </Box>
          </Grid>
          <Grid item lg={9} md={9} sm={8} xs={12}>
            <Card className={classes.card}>
              <CardContent className={classes.cardBody}>
                {/* <Typography variant="h5">Edit Profile Details</Typography> */}
                <form className={classes.form} noValidate autoComplete="off">
                  <div className={classes.formInput}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <PersonIcon />
                      </Grid>
                      <Grid item className={classes.formInputField}>
                        <TextField
                          id="fname"
                          label="First Name"
                          value={firstname}
                          onChange={(e) => updateformData(e, "firstname")}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.formInput}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <PersonIcon />
                      </Grid>
                      <Grid item className={classes.formInputField}>
                        <TextField
                          id="lname"
                          label="Last Name"
                          value={lastname}
                          onChange={(e) => updateformData(e, "lastname")}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.formInput}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <MailOutlineIcon />
                      </Grid>
                      <Grid item className={classes.formInputField}>
                        <TextField
                          id="email"
                          label="Email"
                          value={user.email}
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.formInput}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <PhoneIphoneIcon />
                      </Grid>
                      <Grid item className={classes.formInputField}>
                        <TextField
                          id="number"
                          label="Phone Number"
                          value={phone_no}
                          onChange={(e) => updateformData(e, "phone_no")}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.formInput}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <SchoolIcon />
                      </Grid>
                      <Grid item className={classes.formInputField}>
                        <Autocomplete
                          required
                          options={universities}
                          getOptionLabel={(option) => {
                            return option.name;
                          }}
                          getOptionSelected={(option, value) =>
                            option.name === value.name
                          }
                          loading={searchloading}
                          value={university}
                          onInputChange={(e) => e && handleUniSearch(e)}
                          // onChange={(e) => updateformData(e, "university")}
                          onSelect={(e) =>
                            setuniversity({ name: e.target.value })
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Search College"
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <React.Fragment>
                                    {searchloading ? (
                                      <CircularProgress
                                        color="primary"
                                        size={20}
                                      />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                  </React.Fragment>
                                ),
                              }}
                            />
                          )}
                        />
                        {/* <TextField id="college" label="College" /> */}
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.formInput}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <DetailsIcon />
                      </Grid>
                      <Grid item className={classes.formInputField}>
                        <TextField
                          id="branch"
                          label="Course"
                          value={branch}
                          onChange={(e) => updateformData(e, "branch")}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  {/* <div className={classes.formInput}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <LockIcon />
                      </Grid>
                      <Grid item className={classes.formInputField}>
                        <TextField
                          id="password"
                          label="Password"
                          type="password"
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.formInput}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <LockIcon />
                      </Grid>
                      <Grid item className={classes.formInputField}>
                        <TextField
                          id="cpassword"
                          label="Confirm password"
                          type="password"
                        />
                      </Grid>
                    </Grid>
                  </div> */}
                  {/* <div className={classes.formInputFullWidth}>
                    <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                    <DetailsIcon />
                    </Grid>
                    <Grid item className={classes.formInputFieldFull}>
                    <TextField id="about" label="About" />
                    </Grid>
                    </Grid>
                  </div> */}

                  <Button
                    variant="contained"
                    className={classes.Button}
                    onClick={updateProfile}
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

export default EditProfile;
