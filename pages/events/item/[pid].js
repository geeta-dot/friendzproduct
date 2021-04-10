import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../../src/Layout";
import {
  Box,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Advertisement from "../../../src/components/Advertisement";
import EventDetail from "../../../src/components/EventDetail";
import Testimonial from "../../../src/components/Testimonial";
import {
  TestimonialData,
} from "../../../src/utils";
import {
  commonStyles,
  desktopStyles,
  mobileStyles,
  TabStyles,
} from "../../../src/styles";
import { useRouter } from "next/router";
import { getEvent, getAllFeedback } from "../../../src/apis/global-api";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
const fetch = require("node-fetch");

const useStyles = makeStyles((theme) => ({
  ...commonStyles,
  [theme.breakpoints.up("md")]: desktopStyles,
  [theme.breakpoints.between("sm", "md")]: TabStyles,
  [theme.breakpoints.down("sm")]: mobileStyles,
}));

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}


export default function singlePage({ query }) {
  const router = useRouter();
  const { pid } = query;
  const [data, setData] = useState({});
  const [loading, setloading] = useState(true);
  const [list_reviews, setlist_reviews] = useState([])

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    getEvent(pid).then((event) => {
      setData(event)
      setloading(false)
    });
    getAllFeedback('?paginate=1').then((data) => {
      setlist_reviews(data)
    });
  };

  const classes = useStyles();


  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Layout>
      <Advertisement />

      <Container maxWidth="xl">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          className={classes.Breadcrumbs}
        >
          <Link color="inherit" href="/" onClick={handleClick}>
            Homepage
          </Link>
          <Typography color="primary">Event</Typography>
        </Breadcrumbs>
      </Container>
      {loading && (
        <Backdrop
          className={classes.backdrop}
          open={loading}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {!loading && <EventDetail data={data} />}
      {/* {!loading && (!data || !data.length) && <Container maxWidth="xl">
        <Box className={classes.sectionHeader}>
          <Typography variant="h4">Event not found!!</Typography>
        </Box> </Container>} */}

      {/* Review Section */}
      <section
        className={classes.section}
        style={{ background: 'var(--theme-light)' }}
      >
        <Container maxWidth="xl">
          <Box className={classes.sectionHeader}>
            <Typography variant="h2">REVIEW</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, aretent consectetuer adipiscing elit
              Lorem ipsum dolor sit amet, aretent consectetuer adipiscing elit
            </Typography>
          </Box>
          {list_reviews && list_reviews.length > 0 && (
            <Testimonial data={list_reviews} />
          )}
        </Container>
      </section>
    </Layout>
  );
}

singlePage.getInitialProps = ({ query }) => {

  return { query };
};
