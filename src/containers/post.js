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
import Autocomplete from "@material-ui/lab/Autocomplete";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { searchUniversities, searchCategories } from "../apis/global-api";
import { AddProduct, UpdateProduct } from "../apis/auth-api";
import CategoryIcon from "@material-ui/icons/Category";
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
      marginBottom: "1rem",
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
      "& textarea": {
        width: "100%",
        border: "none",
        borderBottom: "solid 1px #ccc",
        height: "100px",
      },
      "& textarea:focus": {
        outline: "none",
        borderBottom: "solid 1px var(--theme)",
      },
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

export default function Post({ user, formtype = "add", product = {} }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [files, setfiles] = useState([]);
  const [filesInfo, setfilesInfo] = useState([]);
  const [title, settitle] = useState(product.title);
  const [type, settype] = useState(product.type);
  const [description, setdescription] = useState(product.description);
  const [price, setprice] = useState(product.price);
  const [university, setuniversity] = useState({
    name: product.university ? product.university.name : "",
    id: product.university ? product.university.id : "",
  });
  const [category, setcategory] = useState({
    name: product.category ? product.category.name : "",
    id: product.category ? product.category.id : "",
  });
  const [errs, seterrs] = useState({});
  const [universities, setuniversities] = useState(
    product.university
      ? [{ name: product.university.name, id: product.university.id }]
      : []
  );
  const [categories, setcategories] = useState(
    product.category
      ? [{ name: product.category.name, id: product.category.id }]
      : []
  );
  const [loading, setloading] = useState(false);
  const [loadingUni, setloadingUni] = useState(false);
  const [backdrop, setbackdrop] = useState(false);
  const [time_period, settime_period] = useState(product.time_period);
  const [formerrs, setformerrs] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (product.images) {
      let updatedImages = [];
      let updatedImagesInfo = [];
      product.images.map((fileData, index) => {
        updatedImages = updatedImages.concat(fileData.base64_data);
        updatedImagesInfo = updatedImagesInfo.concat({
          type: fileData.type,
          data: fileData.link,
        });

        if (index + 1 == product.images.length) {
          setfiles(updatedImages);
          setfilesInfo(updatedImagesInfo);
        }
      });
    }
  }, [product]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (filesArr) => {
    console.log(filesArr);
    let count = 0;
    let testARr = [];
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
    searchCategories(value).then((response) => {
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
      !type
    ) {
      setformerrs(["All fields are required"]);
      return false;
    }
    if (!files.length) {
      setformerrs(["Images are required"]);
      return false;
    }
    return true;
  };

  const handleSubmit = (e, uploaded_files) => {
    e && e.preventDefault();

    // console.log(files,filesInfo)
    // return

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
      seller_id: user.id,
      type: type,
      files: files,
      active: true,
      time_period: time_period,
    };
    if (formtype == "edit" && product.id) {
      UpdateProduct(data, product.id).then((response) => {
        if (response.error) {
          setbackdrop(false);
          setformerrs(response.msg);
        } else {
          router.push("/profile");
        }
      });
    } else {
      AddProduct(data).then((response) => {
        if (response.error) {
          setbackdrop(false);
          setformerrs(response.msg);
        } else {
          router.push("/profile");
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
                    {formtype == "add" ? "Add" : "Edit"} Item  Details
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
                    <div className={`${classes.formInput}`}>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <DetailsIcon />
                        </Grid>
                        <Grid item className={`${classes.formInputField} `}>
                          <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">
                              type
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={type}
                              onChange={(e) => updateformData(e, "type")}
                            >
                              <MenuItem value="Buy">Buy</MenuItem>
                              <MenuItem value="Rental">Rental</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </div>
                    {type == "Rental" && (
                      <div className={`${classes.formInput}`}>
                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item>
                            <DetailsIcon />
                          </Grid>
                          <Grid item className={`${classes.formInputField} `}>
                            <FormControl className={classes.formControl}>
                              <InputLabel id="demo-simple-select-label">
                                Time Period
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={time_period}
                                onChange={(e) =>
                                  updateformData(e, "time_period")
                                }
                              >
                                <MenuItem value="day">Day</MenuItem>
                                <MenuItem value="week">Week</MenuItem>
                                <MenuItem value="month">Month</MenuItem>
                                <MenuItem value="year">Year</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </div>
                    )}
                    <div
                      className={`${classes.formInput} ${classes.formInputFullWidth}`}
                    >
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <DetailsIcon />
                        </Grid>
                        <Grid
                          item
                          className={`${classes.formInputField} ${classes.formInputFieldFull}`}
                        >
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
                              <div>
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
                        filesLimit={10}
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
                      {formtype == "add" ? "Add" : "Edit"} Item
                    </Button>
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
