import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../Layout";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import EventCard from "../components/EventCard";
import Sidebar from "../components/Sidebar";
import Advertisement from "../components/Advertisement";
// import CardHorizontal from "../components/CardHorizontal";
import Testimonial from "../components/Testimonial";
import TuneIcon from "@material-ui/icons/Tune";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { OurConceptData, TestimonialData } from "../utils";
import StickyBox from "react-sticky-box";
import {
  commonStyles,
  desktopStyles,
  mobileStyles,
  TabStyles,
} from "../styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const fetch = require("node-fetch");

const useStyles = makeStyles((theme) => ({
  ...commonStyles,
  [theme.breakpoints.up("md")]: desktopStyles,
  [theme.breakpoints.between("sm", "md")]: TabStyles,
  [theme.breakpoints.down("sm")]: mobileStyles,
}));
import { useRouter } from "next/router";
import { getEvents, getAllFeedback } from "../apis/global-api";
import { useSelector } from "react-redux";

function Events({ data, url, showState = false, query }) {
  const [events, setevents] = useState([]);
  const [loadMore, setloadMore] = useState(false);
  const [lastPage, setlastPage] = useState(false);
  const [page, setpage] = useState(0);
  const [list_reviews, setlist_reviews] = useState([]);
  const [adslist, setadslist] = useState([]);
  const user = useSelector((state) => state.auth_user.user);

  useEffect(()=>{
   const API_URL = process.env.api_url;
   async function fetchAds(){
     let adsres = await fetch(API_URL + "/adverts", );
     const ads = await adsres.json();
     setadslist(ads)
    }
   fetchAds()
 },[]);

  useEffect(() => {
    console.log("url", url);
    if (url) fetchTypeEvents(url, 0, []);
    getAllFeedback().then((data) => {
      setlist_reviews(data);
    });
    // setevents(data);
  }, [data, url]);

  const handleButtonClick = () => {
    if (!loadMore) {
      setloadMore(true);
      fetchTypeEvents(url, page, events);
      // timer.current = setTimeout(() => {
      //   setLoading(false);
      // }, 2000);
    }
  };

  const fetchTypeEvents = (url, page, events) => {
    page = !page ? 1 : page + 1;
    setpage(page);
    url = `${url}&page=${page}`;
    getEvents(url).then((data) => {
      if (events && events.data) {
        data.data = events.data.concat(data.data);
      }
      if (data) {
        setevents(data);
      }
      if (data && data.current_page == data.last_page) {
        setlastPage(true);
      }
      // console.log(page, url, data);

      setloadMore(false);
    });
  };
  // console.log(events)
  const router = useRouter();

  const classes = useStyles();

  const matches = useMediaQuery('(max-width:600px)');

  const MobileSidebar = () => {
    const toggle = () => {
      setshowsidebar(!showsidebar);
    };

    const [showsidebar, setshowsidebar] = React.useState(false);
    return (
      <>
        <Button className={classes.fliterBtn} onClick={toggle}>
          <TuneIcon />
          Filter
        </Button>
        {showsidebar && <Sidebar type="events" />}
      </>
    );
  };
  const handleAddProduct = () => {
    if (user.id) {
      router.push("/post/event");
    } else {
      window.location.replace("/?signup=open");
    }
  };

  return (
    <Layout>
      {adslist && adslist.eventHeader && (
        <Advertisement
          adImg={adslist.eventHeader.link}
          adlink={adslist.eventHeader.openlink}
        />
      )}

      {/* events Section */}
      <section className={classes.section}>
        <Container maxWidth="xl">
          <Box className={classes.productsHeader}>
            <Typography variant="h5">Events in your College</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddProduct}
            >
              Add Event
            </Button>
          </Box>
        </Container>
        <Container maxWidth="xl">
          <Grid container>
            <Grid
              item
              lg={3}
              md={3}
              sm={12}
              xs={12}
              className="scrollarea"
              // style={{ height: "200px", overflow: "scroll" }}
            >
              {matches ? (
                <Sidebar showFilterBtn="true" query={query} />
              ) : (
                <StickyBox offsetTop={100} offsetBottom={20}>
                  <Sidebar type="events" query={query} />
                </StickyBox>
              )}
            </Grid>
            <Grid item lg={9} md={9} sm={12} xs={12}>
              <Box className={classes.ProductsGridWrapper}>
                {events.data &&
                  events.data.length > 0 &&
                  events.data.slice(0, 8).map((data, index) => (
                    <React.Fragment key={data.id}>
                      <EventCard data={data} />
                      {index == 2 && adslist && adslist.event1 && (
                        <Advertisement
                          adImg={adslist.event1.link}
                          adlink={adslist.event1.openlink}
                        />
                      )}
                    </React.Fragment>
                  ))}
              </Box>

              {events.data && events.data.length <= 0 && (
                <Typography variant="h4">
                  Oops!! we we could not find related to your search. Please
                  search something else
                </Typography>
              )}

              <Box className={classes.ProductsGridWrapper}>
                {events.data &&
                  events.data.length > 0 &&
                  events.data
                    .slice(8, events.data.length)
                    .map((data, index) => (
                      <React.Fragment key={data.id}>
                        <EventCard data={data} />
                        {index == 2 && adslist && adslist.event2 && (
                          <Advertisement
                            adImg={adslist.event2.link}
                            adlink={adslist.event2.openlink}
                          />
                        )}
                      </React.Fragment>
                    ))}
              </Box>

              {events.data && events.data.length > 0 && !lastPage && (
                <div className={classes.loadMorewrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.loadMore}
                    disabled={loadMore}
                    onClick={handleButtonClick}
                  >
                    Load More
                  </Button>
                  {loadMore && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* <section className={classes.section} style={{ background: "#F3F3F3" }}>
        <Container maxWidth="lg">
          <Box className={classes.sectionHeader}>
            <Typography variant="h2"> OUR CONCEPT</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, aretent consectetuer adipiscing elit
              Lorem ipsum dolor sit amet, aretent consectetuer adipiscing elit
            </Typography>
          </Box>
          <Box className={classes.EventIconCardWrapper}>
            {OurConceptData.map((data) => (
              <CardHorizontal key={data.id} data={data} />
            ))}
          </Box>
        </Container>
      </section> */}

      <section
        className={classes.section}
        style={{ background: 'var(--theme-light)' }}
      >
        <Container maxWidth="xl">
          <Box className={classes.sectionHeader}>
            <Typography variant="h2">REVIEW</Typography>
            {/* <Typography>
              Lorem ipsum dolor sit amet, aretent consectetuer adipiscing elit
              Lorem ipsum dolor sit amet, aretent consectetuer adipiscing elit
            </Typography> */}
          </Box>
          {list_reviews && list_reviews.length > 0 && (
            <Testimonial data={list_reviews} />
          )}
        </Container>
      </section>
    </Layout>
  );
}



export default Events;
