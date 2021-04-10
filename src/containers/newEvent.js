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
import SchoolIcon from "@material-ui/icons/School";
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import LinkIcon from '@material-ui/icons/Link';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import Autocomplete from "@material-ui/lab/Autocomplete";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { searchUniversities, searchEventCategories, CreateOrder } from "../apis/global-api";
import { AddEvent, UpdateEvent } from "../apis/auth-api";
import CategoryIcon from "@material-ui/icons/Category";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useDispatch } from "react-redux";
import { authenticated } from "../redux/actions/auth";
import { useRouter } from "next/router";
import { fileToBase64, isPhone } from "../Utils/helpers";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
      '& textarea': {
        width: '100%',
        border: 'none',
        borderBottom: 'solid 1px #ccc',
        height: '100px',
        background: 'transparent'
      },
      '& textarea:focus': {
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

export default function NewEvent({ user, formtype = "add", event = {} }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [files, setfiles] = useState([]);
  const [filesInfo, setfilesInfo] = useState([]);
  const [title, settitle] = useState(event.title);
  const [description, setdescription] = useState(event.description);
  const [promo_code, setpromo_code] = useState(event.promo_code);
  const [price, setprice] = useState(event.price);
  const [eventDate, seteventdate] = useState(event.event_date);
  const [eventTime, seteventtime] = useState(event.event_time);
  const [contact, setcontact] = useState(event.contact_number);
  const [bookLink, setbooklink] = useState(event.book_event_link);
  const [visitLink, setvisitlink] = useState(event.visit_website_link);
  const [socialLinks, setsociallinks] = useState([
    {
      text: event.social_profiles ? event.social_profiles.text : "",
      link: event.social_profiles ? event.social_profiles.link : ""
    }
  ]);
  const [university, setuniversity] = useState({
    name: event.university ? event.university.name : "",
    id: event.university ? event.university.id : "",
  });
  const [category, setcategory] = useState({
    name: event.category ? event.category.name : "",
    id: event.category ? event.category.id : "",
  });
  const [errs, seterrs] = useState({});
  const [universities, setuniversities] = useState(
    event.university
      ? [{ name: event.university.name, id: event.university.id }]
      : []
  );
  const [categories, setcategories] = useState(
    event.category
      ? [{ name: event.category.name, id: event.category.id }]
      : []
  );
  const [promoCodeDicount, setpromoCodeDicount] = useState(0);
  const [loading, setloading] = useState(false);
  const [loadingUni, setloadingUni] = useState(false);
  const [backdrop, setbackdrop] = useState(false);
  const [formerrs, setformerrs] = useState([]);
  const [eventData, seteventData] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();
  const [snackbar, setsnackbar] = useState(false);
  const [snackbarMsg, setsnackbarMsg] = useState("");
  const [snackbarType, setsnackbarType] = useState("success");
  useEffect(() => {
    // let eventd = {
    //   id: 2,
    //   event_price: 100
    // }
    // paymentHandler(eventd)
    // return
    addFields();
    if (event.images) {
      let updatedImages = [];
      let updatedImagesInfo = [];
      event.images.map((fileData, index) => {
        updatedImages = updatedImages.concat(fileData.base64_data);
        updatedImagesInfo = updatedImagesInfo.concat({
          type: fileData.type,
          data: fileData.link,
        });

        if (index + 1 == event.images.length) {
          setfiles(updatedImages);
          setfilesInfo(updatedImagesInfo);
        }
      });
    }
    if (event.social_profiles) {
      let sp = [];
      event.social_profiles.map((item, index) => {
        sp = sp.concat({
          text: item.text,
          link: item.link,
        });
        if (index + 1 == event.social_profiles.length) {
          setsociallinks(sp);
        }
      });
    }
  }, [event]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...socialLinks];
    list[index][name] = value;
    setsociallinks(list);
  };

  const addFields = () => {
    if (socialLinks.length < 5) {
      for (var i = 0; i < 5; i++) {
        setsociallinks([...socialLinks, { text: "", link: "" }]);
      }
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (filesArr) => {
    let count = 0;
    filesArr.map((file, index) => {
      count++;
      const reader = new FileReader();
      let filesArr = files;
      let filesInfoArr = filesInfo;
      reader.onload = (event) => {
        console.log("testfile", index, filesArr, filesArr);
        //store result into your state array.
        filesArr[index] = event.target.result;
        filesInfoArr[index] = {
          type: file["type"].split("/")[0],
          data: event.target.result,
        };
        // let updatedImages = ();
        // let updatedImagesInfo = ();
        setfiles(filesArr);
        setfilesInfo(filesInfoArr);
        if (count == filesArr.length) {
          setOpen(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const updateformData = (e, type) => {
    e.preventDefault();
    eval("set" + type + "('" + e.target.value + "')");
  };

  const handleUniSearch = (e) => {
    let value = e ? e.target.value : "";
    if (!value) return;
    setloadingUni(true);
    searchUniversities(value).then((response) => {
      setloadingUni(false);
      setuniversities(response);
    });
  };

  const handleCatSearch = (e) => {
    let value = e ? e.target.value : "";
    if (!value) return;
    setloading(true);
    searchEventCategories(value).then((response) => {
      setloading(false);
      setcategories(response.data);
    });
  };

  const checkValidation = () => {
    setformerrs("");
    if (
      !title ||
      !description ||
      !price ||
      !university.name ||
      !category.name ||
      !eventDate ||
      !eventTime ||
      !contact ||
      !bookLink ||
      !visitLink
    ) {
      setformerrs(["All fields are required"]);
      return false;
    }
    if (!files.length) {
      setformerrs(["Images are required"]);
      return false;
    }
    if (!isPhone(contact)) {
      setformerrs(["Contact number is not valid.Please enter 10 digit number"]);
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
    let university_id = universities.find(
      (item) => item.name == university.name
    );
    let category_id = categories.find((item) => item.name == category.name);
    let data = {
      title: title,
      description: description,
      price: price,
      university_id: university_id.id,
      category_id: category_id.id,
      event_date: eventDate,
      event_time: eventTime,
      contact_number: contact,
      book_event_link: bookLink,
      visit_website_link: visitLink,
      social_profiles: socialLinks,
      files: files,
      seller_id: user.id,
      active: event ? event.active : event.event_price > 0 ? false : true,
      promo_code:promo_code
    };
    event = event ? event : eventData
    if (formtype == "edit" && event.id) {
      UpdateEvent(data, event.id).then((response) => {
        if (response.error) {
          setbackdrop(false);
          setformerrs(response.msg);
        } else {
          if (event.event_price > 0 && !event.order_id) {
            paymentHandler(response.body.event)
          } else {
            router.push("/profile/events");

          }
        }
      });
    } else {
      AddEvent(data).then((response) => {
       
        if (response.error) {
          setbackdrop(false);
          setformerrs(response.msg);
        } else if (response.body && response.body.event) {
          seteventData(response.body.event)

          if (response.body.event.event_price > 0) {
           
            paymentHandler(response.body.event,response.body.promo_code)
          } else {

            router.push("/profile/events");

          }
        } else {
          alert('there was some problem while, saving try it later')
        }
      });
    }
  };

  const removeImage = (index) => {
    let filterFiles = files.filter(function (file, i) {
      return i !== index;
    });
    let filterFilesInfo = filesInfo.filter(function (file, i) {
      return i !== index;
    });

    setfilesInfo(filterFilesInfo);
    setfiles(filterFiles);

  };
  const handlesnackbar = () => {
    setsnackbar(!snackbar);
  };

  const paymentHandler = async (event,promoCodeDetail) => {
    if (!event) {
      setsnackbar(true);
      setsnackbarMsg("Event not valid");
      setsnackbarType("error");
    }
    const APP_URL = process.env.APP_URL+'/'
    let receipt_id = 'receipt_event' + event.id
    let event_price = event.event_price * 100
    let promo_code_id = 0
    if(promoCodeDetail!='') {
      let discount = event_price*promoCodeDetail.amount/100
      event_price  = event_price - discount
      promo_code_id  = promoCodeDetail.id
    }
    // e.preventDefault();
    const orderUrl = `${APP_URL}order/${event_price}/${receipt_id}`;
    // return
    const response = await axios.get(orderUrl);

    const { data } = response;
    const options = {
      key: process.env.RAZOR_PAY_KEY_ID,
      name: "App",
      description: "App description",
      order_id: data.id,
      // modal:{
      //   escape:false
      // },
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `${APP_URL}capture/${paymentId}/${event_price}`;

          console.log(url);

          const captureResponse = await axios.post(url, {});
          console.log(captureResponse.data);
          let resp = JSON.parse(captureResponse.data)
          let data = {
            'reciept_id': receipt_id,
            'rzp_transaction_id': resp.id,
            'rzp_order_id': resp.order_id,
            'status': resp.status,
            'price': resp.amount / 100,
            'user_id': user.id,
            'type': 'event',
            'event_id': event.id,
            'promo_code_id':promo_code_id
          }

          CreateOrder(data).then((response) => {
            // console.log(response)
            if (response.error) {
              setbackdrop(false);
              setformerrs(response.msg);
            } else {
              router.push("/profile/events");
            }
          });

        } catch (err) {
          console.log(err)
          alert('Oops !! There was some error while processing.Dont panic, just contact admin in case in case of emergency ')
        }
      },
      "modal": {
        "ondismiss": function () {
          setbackdrop(false);
          setsnackbar(true);
          setsnackbarMsg("You have dismissed payment.Event will be in inactive mode until you enable it");
          setsnackbarType("error");
          console.log('dismissed')
        }
      }
      // theme: {
      //   color: "#686CFD",
      // },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const showPayButton = () => {
    let ev = event ? event : eventData
    if (ev.id && ev.event_price && ev.event_price > 0 && !ev.order_id) {
      return (
        <Button
          onClick={() => paymentHandler(ev)}
          variant="secondary"
          className={classes.Button}
        >
          Pay Now
        </Button>
      )
    }
    return null
  }


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
        <Snackbar
          open={snackbar}
          autoHideDuration={6000}
          onClose={handlesnackbar}
        >
          <Alert onClose={handlesnackbar} severity={snackbarType}>
            {snackbarMsg}
          </Alert>
        </Snackbar>
        <Container maxWidth="xl">
          <Grid container>
            <Grid item lg={9} md={9} sm={8} xs={12} style={{ margin: "auto" }}>
              <Card className={classes.card}>
                <CardContent className={classes.cardBody}>
                  <Typography variant="h4" style={{ marginBottom: "1rem" }}>
                    {formtype == "add" ? "Add" : "Edit"} Event Details
                  </Typography>
                  <form
                    className={classes.form}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <div className={classes.formInput}>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <SubtitlesIcon />
                        </Grid>
                        <Grid item className={classes.formInputField}>
                          <TextField
                            id="fname"
                            label="Title"
                            value={title}
                            onChange={(e) => updateformData(e, "title")}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <div className={classes.formInput}>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <LocalOfferIcon />
                        </Grid>
                        <Grid item className={classes.formInputField}>
                          <TextField
                            id="lname"
                            label="Price"
                            value={price}
                            type="number"
                            onChange={(e) => updateformData(e, "price")}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <div className={classes.formInput}>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <EventIcon />
                        </Grid>
                        <Grid item className={classes.formInputField}>
                          <TextField
                            id="eventDate"
                            label=""
                            value={eventDate}
                            type="date"
                            onChange={(e) => updateformData(e, "eventdate")}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <div className={classes.formInput}>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <ScheduleIcon />
                        </Grid>
                        <Grid item className={classes.formInputField}>
                          <TextField
                            id="eventTime"
                            label=""
                            value={eventTime}
                            type="time"
                            onChange={(e) => updateformData(e, "eventtime")}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <div className={classes.formInput}>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <CategoryIcon />
                        </Grid>
                        <Grid item className={classes.formInputField}>
                          <Autocomplete
                            required
                            options={categories}
                            getOptionLabel={(option) => {
                              return option.name;
                            }}
                            getOptionSelected={(option, value) =>
                              option.name === value.name
                            }
                            loading={loading}
                            value={category}
                            onInputChange={handleCatSearch}
                            // onChange={(e) => updateformData(e, "university")}
                            onSelect={(e) =>
                              setcategory({ name: e.target.value })
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Search Categories"
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: (
                                    <React.Fragment>
                                      {loading ? (
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
                          {errs["category"] && (
                            <Typography color="error">
                              Please select a category.
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </div>

                    <div className={classes.formInput}>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <ContactPhoneIcon />
                        </Grid>
                        <Grid item className={classes.formInputField}>
                          <TextField
                            id="contact"
                            label="Contact Number"
                            value={contact}
                            type="number"
                            onChange={(e) => updateformData(e, "contact")}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <div className={classes.formInput}>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <LinkIcon />
                        </Grid>
                        <Grid item className={classes.formInputField}>
                          <TextField
                            id="bookLink"
                            label="Book Event Link"
                            value={bookLink}
                            type="text"
                            onChange={(e) => updateformData(e, "booklink")}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <div className={classes.formInput}>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <LinkIcon />
                        </Grid>
                        <Grid item className={classes.formInputField}>
                          <TextField
                            id="visitLink"
                            label="Visit Website Link"
                            value={visitLink}
                            type="text"
                            onChange={(e) => updateformData(e, "visitlink")}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <div className={`${classes.formInput} ${classes.formInputFullWidth}`}>
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
                            loading={loadingUni}
                            value={university}
                            onInputChange={handleUniSearch}
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
                                      {loadingUni ? (
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
                          {errs["university"] && (
                            <Typography color="error">
                              Please select a university.
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </div>
                    {/* <p>Write one of these social text available : Facebook, Twitter, Linkedin, Instagram, Youtube</p>
                    {socialLinks.length > 0 &&
                      socialLinks.map(
                        (item, index) => (
                          <div className={classes.formInput} key={index}>
                            <div>
                              <TextFieldsIcon />
                              <TextField
                                label="Social text"
                                name="text"
                                value={item.text}
                                type="text"
                                onChange={(e) => handleInputChange(e, index)}
                              />
                            </div>
                            <div>
                              <LinkIcon />
                              <TextField
                                label="Social Link"
                                name="link"
                                value={item.link}
                                type="text"
                                onChange={(e) => handleInputChange(e, index)}
                              />
                            </div>
                          </div>
                        )
                      )} */}
                    <div className={`${classes.formInput} ${classes.formInputFullWidth}`}>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <DetailsIcon />
                        </Grid>
                        <Grid item className={`${classes.formInputField} ${classes.formInputFieldFull}`}>
                          <textarea
                            id="about"
                            label="Description"
                            value={description}
                            placeholder="Description"
                            onChange={(e) => updateformData(e, "description")}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    {formtype == "add" ? 
                     <div className={`${classes.formInput} ${classes.formInputFullWidth}`}>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <DetailsIcon />
                        </Grid>
                        <Grid item className={`${classes.formInputField} ${classes.formInputFieldFull}`}>
                          <TextField
                            id="about"
                            label="Promo Code"
                            value={promo_code}
                            placeholder="Promo Code"
                            onChange={(e) => updateformData(e, "promo_code")}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    : ""}
                    <div
                      className={`${classes.formInput} ${classes.formInputFullWidth} `}
                    >
                      <Typography variant="h6" style={{ marginBottom: "1rem" }}>
                        {formtype == "add" ? "Add" : "Edit"} Media
                      </Typography>
                      <div className={classes.Images}>
                        {/* <img src="/static/images/culture.png" />
                        <img src="/static/images/technical.png" />
                        <img src="/static/images/library.png" /> */}
                        {filesInfo.length > 0 &&
                          filesInfo.map(
                            (file, index) => (
                              <div key={index}>
                                {file.type == "image" && (
                                  <img src={file.data} />
                                )}
                                {file.type == "video" && (
                                  <video src={file.data} controls />
                                )}
                                <DeleteIcon
                                  onClick={() => removeImage(index)}
                                />
                              </div>
                            )
                            // <ProductMedia
                            //   file={file}
                            //   key={`img${index}`}
                            //   index={index}
                            //   removeFile={() => removeImage(index)}
                            // />
                            // <img src={file.data} key={`img${index}`} />
                          )}
                        <Button
                          onClick={handleOpen.bind(this)}
                          className={classes.AddBtn}
                        >
                          <PhotoCameraOutlinedIcon />
                          More+
                        </Button>
                      </div>
                      <DropzoneDialog
                        open={open}
                        onSave={handleSave.bind(this)}
                        acceptedFiles={["image/*", "video/*"]}
                        showPreviews={true}
                        maxFileSize={50000000}
                        onClose={handleClose.bind(this)}
                        className="dialogeCustom"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.Button}
                    >
                      {formtype == "add" ? "Add" : "Edit"} Event
                    </Button>

                    {showPayButton()}
                  </form>
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
