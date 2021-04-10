import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../src/Layout";
import {
    Card,
    CardContent,
    TextField,
    Button,
    Container,
    Grid,
    Typography,
} from "@material-ui/core";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import SubtitlesIcon from "@material-ui/icons/Subtitles";
import DetailsIcon from "@material-ui/icons/Details";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CreateContact } from "../src/apis/global-api";
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
            "& textarea": {
                width: "100%",
                border: "none",
                borderBottom: "solid 1px #ccc",
                height: "100px",
            },
            "& textarea:focus": {
                outline: "none",
                borderBottom: "solid 1px var(--wrapper)",
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
        backgroundColor: "var(--wrapper)",
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

export default function Contact({ user, formtype = "add", product = {} }) {
    const classes = useStyles();
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [message, setmessage] = useState();

    const [errs, seterrs] = useState({});

    const [backdrop, setbackdrop] = useState(false);
    const [formerrs, setformerrs] = useState([]);
    const [snackbar, setsnackbar] = useState(false);
    const [snackbarMsg, setsnackbarMsg] = useState("");
    const [snackbarType, setsnackbarType] = useState("success");

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

    const updateformData = (e, type) => {
        e.preventDefault();
        eval("set" + type + "('" + e.target.value + "')");
    };

    const checkValidation = () => {
        setformerrs("");
        if (!name || !email || !message) {
            setformerrs(["All fields are required"]);
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e && e.preventDefault();
        let is_valid = checkValidation();

        if (!is_valid) {
            return;
        }
        setbackdrop(true);

        let data = {
            name: name,
            email: email,
            message: message,
        };

        CreateContact(data).then((response) => {
            setbackdrop(false);
            if (response.error) {
                
                setformerrs(response.msg);

                setsnackbar(true);
                setsnackbarMsg("Form not submitted.Try again later");
                setsnackbarType("error");
            } else {
                setsnackbar(true);
                setsnackbarMsg("Form  submitted successfully");
                setsnackbarType("success");
                setname('')
                setemail('')
                setmessage('')
            }
        });
    };
    const handlesnackbar = () => {
        setsnackbar(!snackbar);
    };


    return (
        <Layout>
            <Snackbar
                open={snackbar}
                autoHideDuration={6000}
                onClose={handlesnackbar}
            >
                <Alert onClose={handlesnackbar} severity={snackbarType}>
                    {snackbarMsg}
                </Alert>
            </Snackbar>
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
                                        Contact Us
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
                                                        id="name"
                                                        label="Name"
                                                        value={name}
                                                        onChange={(e) => updateformData(e, "name")}
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
                                                        id="email"
                                                        label="Email"
                                                        value={email}
                                                        type="email"
                                                        onChange={(e) => updateformData(e, "email")}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>

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
                                                        id="message"
                                                        label="Message"
                                                        value={message}
                                                        placeholder="Message"
                                                        onChange={(e) => updateformData(e, "message")}
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
