import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { searchUniversities } from '../../apis/global-api';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import { simpleSignup, login, googleSignup } from '../../apis/auth-api';
import { useDispatch } from 'react-redux';
import { authenticated } from '../../redux/actions/auth';
import { useRouter } from 'next/router';
import { GoogleLogin } from 'react-google-login';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
const useStyles = makeStyles((theme) => ({
  form: {
    padding: '1.5rem 2.0rem',
    [theme.breakpoints.up('sm')]: {
      margin: '2.5rem',
    },
  },
  modal: {
    padding: '0.5rem',
  },
  button: {
    '&:focus': {
      background: 'rgb(177, 90, 16)',
    },
    '& .MuiCircularProgress-colorPrimary': {
      marginLeft: '10px',
      color: '#fff',
    },
  },
}));

export const AuthForm = ({ type }) => {
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [university, setuniversity] = useState({ name: '' });
  const [password, setpassword] = useState('');
  const [showpassword, setshowpassword] = useState(false);
  const [confirm_password, setconfirm_password] = useState('');
  const [showconfirm_password, setshowconfirm_password] = useState(false);
  const [phone_no, setphone_no] = useState('');
  const [errs, seterrs] = useState({});
  const [universities, setuniversities] = useState([]);
  const [branch, setbranch] = useState('');
  const [loading, setloading] = useState(false);
  const [btnloading, setbtnloading] = useState(false);
  const [backdrop, setbackdrop] = useState(true);
  const [formerrs, setformerrs] = useState([]);
  const [showRedirect, setshowRedirect] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    setformerrs([]);
    submitSignUp();
  };

  const submitLogin = () => {
    setshowRedirect(false);
    setformerrs([]);
    setbtnloading(true);
    let data = {
      email: email,
      password: password,
    };
    login(data).then((response) => {
      if (response.error) {
        setbtnloading(false);
        setformerrs(response.msg);
      } else {
        setbtnloading(false);
        let user = response.body.user;
        let accessToken = response.body.user.api_token;
        let favEvents = response.body.favEvents;
        let favProducts = response.body.favProducts;
        setLogin(user, accessToken, favEvents, favProducts);
        setshowRedirect(true);
      }
    });
  };

  const submitSignUp = () => {
    setshowRedirect(false);
    setbtnloading(true);
    // let university_id = universities.find(
    //   (item) => item.name == university.name
    // );
    let data = {
      // first_name: firstname,
      // last_name: lastname,
      email: email,
      // university_id: university_id.id,
      password: password,
      // phone_number: phone_no,
      // branch: branch,
    };
    simpleSignup(data).then((response) => {
      if (response.error) {
        setbtnloading(false);
        setformerrs(response.msg);
      } else {
        let user = response.body.user;
        let accessToken = response.body.user.api_token;
        setbtnloading(false);
        let favEvents = response.body.favEvents;
        let favProducts = response.body.favProducts;
        setLogin(user, accessToken, favEvents, favProducts);
        setshowRedirect(true);
      }
    });
  };

  const setLogin = (user, accessToken, favEvents, favProducts) => {
    console.log(user, accessToken);
    dispatch(authenticated(user, accessToken, favEvents, favProducts));
    if (user.is_complete) {
      router.push('/');
    } else {
      router.push('/profile/edit');
    }
  };
  const responseGoogleSuccess = (response) => {
    let data = {
      email: response.profileObj.email,
      google_id: response.googleId,
    };
    // return

    googleSignup(data).then((response) => {
      if (response.error) {
        setbtnloading(false);
        setformerrs(response.msg);
      } else {
        let user = response.body.user;
        let accessToken = response.body.user.api_token;
        setbtnloading(false);
        let favEvents = response.body.favEvents;
        let favProducts = response.body.favProducts;
        setLogin(user, accessToken, favEvents, favProducts);
        setshowRedirect(true);
      }
    });
  };
  const responseGoogleFailure = (response) => {
    console.log(response);
    // alert('Oops!! there was some problem while logging in.')
  };

  const backdropClose = () => {
    setbackdrop(false);
  };

  const validateform = (e) => {
    e.preventDefault();
    if (type == 'login') {
      submitLogin();
      return;
    }
    let err = {};
    if (password != confirm_password) {
      err.no_same = 'true';
    }
    if (password.length < 8) {
      err.pwd_length = 'true';
    }
    // if (!university.name) {
    //   err.university = "true";
    // }
    seterrs(err);
    let has_error = Object.keys(err).length;
    if (!parseInt(has_error)) {
      handleSubmit();
    }
  };

  const updateformData = (e, type) => {
    e.preventDefault();
    eval('set' + type + "('" + e.target.value + "')");
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

  const gotoForgotPassword = () => {
    router.push('/forgot-password');
  };
  return (
    <div className={classes.form}>
      <div style={{ textAlign: 'center' }} className="googleBtn">
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText={
            type == 'login' ? 'Login with Google' : 'SignUp with Google'
          }
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
      <br />
      <div style={{ textAlign: 'center' }}>or</div>
      <br />
      <form className={classes.container} onSubmit={validateform}>
        {type == 'signup' && (
          <>
            {/* <TextField
              required
              margin="dense"
              label="First Name"
              type="text"
              fullWidth
              value={firstname}
              onChange={(e) => updateformData(e, "firstname")}
              name="first_name"
            />
            <TextField
              required
              margin="dense"
              label="Last Name"
              type="text"
              fullWidth
              value={lastname}
              onChange={(e) => updateformData(e, "lastname")}
              name="last_name"
            /> */}
          </>
        )}
        <TextField
          required
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => updateformData(e, 'email')}
          name="email"
        />
        {type == 'signup' && (
          <>
            {/* <TextField
              required
              margin="dense"
              label="Phone No"
              type="text"
              fullWidth
              value={phone_no}
              onChange={(e) => updateformData(e, "phone_no")}
              name="phone"
            />
            <Autocomplete
              required
              options={universities}
              getOptionLabel={(option) => {
                return option.name;
              }}
              getOptionSelected={(option, value) => option.name === value.name}
              loading={loading}
              value={university}
              onInputChange={handleUniSearch}
              // onChange={(e) => updateformData(e, "university")}
              onSelect={(e) => setuniversity({ name: e.target.value })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search college"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="primary" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            /> */}
            {errs['university'] && (
              <Typography color="error">Please select a university.</Typography>
            )}
            {/* <TextField
              required
              margin="dense"
              label="Branch"
              type="branch"
              fullWidth
              value={branch}
              onChange={(e) => updateformData(e, "branch")}
              name="branch"
            /> */}
          </>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TextField
            required
            margin="dense"
            label="Password"
            type={showpassword ? 'text' : 'password'}
            fullWidth
            value={password}
            onChange={(e) => updateformData(e, 'password')}
            name="password"
          />
          <span onClick={() => setshowpassword(!showpassword)}>
            {' '}
            {showpassword ? <Visibility /> : <VisibilityOff />}
          </span>
        </div>
        {type == 'signup' && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TextField
              required
              margin="dense"
              label="Confirm Password"
              type={showconfirm_password ? 'text' : 'password'}
              fullWidth
              value={confirm_password}
              onChange={(e) => updateformData(e, 'confirm_password')}
              name="confirm_password"
            />
            <span
              onClick={() => setshowconfirm_password(!showconfirm_password)}
            >
              {' '}
              {showconfirm_password ? <Visibility /> : <VisibilityOff />}
            </span>
          </div>
        )}
        {errs['no_same'] && (
          <Typography color="error">
            Password must match with confirm password
          </Typography>
        )}
        {errs['pwd_length'] && (
          <Typography color="error">Password must have 8 characters</Typography>
        )}
        <div>
          {formerrs.length > 0 &&
            formerrs.map((text, index) => (
              <Typography color="error" key={`err-${index}`}>
                {text}
              </Typography>
            ))}
        </div>
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="primary"
        >
          {type == 'login' ? 'Login' : 'SignUp'}

          {btnloading ? <CircularProgress color="primary" size={20} /> : null}
        </Button>
      </form>

      <p style={{ cursor: 'pointer' }} onClick={gotoForgotPassword}>
        Forgot password ? click <span>here</span>
      </p>
      {showRedirect && (
        <Typography color="primary">
          Redirecting to profile page!!{' '}
          <CircularProgress color="primary" size={20} />
        </Typography>
      )}
    </div>
  );
};
