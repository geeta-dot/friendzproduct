import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../src/Layout";
import Accordian from "../src/components/Accordian";
import { Backdrop, Box, Button, Container, Grid, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import StickyBox from "react-sticky-box";


import {
  commonStyles,
  desktopStyles,
  mobileStyles,
  TabStyles,
} from "../src/styles";
import { getAllBuyRequests } from "../src/apis/global-api";
import { useSelector } from "react-redux";
import Router from "next/router";
import Sidebar from "../src/components/Sidebar";
BuyRequest.getInitialProps = ({ query }) => {
  return { query };
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: '1.5rem'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  ...commonStyles,
  [theme.breakpoints.up("md")]: desktopStyles,
  [theme.breakpoints.between("sm", "md")]: TabStyles,
  [theme.breakpoints.down("sm")]: mobileStyles,
}));

export default function BuyRequest({ query }) {
  const user = useSelector((state) => state.auth_user.user);

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [requests, setrequests] = useState({});
  const [loadMore, setloadMore] = useState(false);
  const [lastPage, setlastPage] = useState(false);
  const [page, setpage] = useState(0);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    // const { m_uni } = query;
    // console.log("queryrequest", m_uni);
    // if (m_uni) {
    //   setselectedUni(m_uni);

    // }
    getProductRequest();
  }, [query]);

  const handleAddProduct = () => {
    if (user.id) {
      Router.push("/post/request");
    } else {
      window.location.replace("/?signup=open");
    }
  };

  const getProductRequest = (page) => {
    page = !page ? 1 : page + 1;
    setpage(page);
    let url = `&page=${page}`;

    const { m_uni } = query;

    if (m_uni) {
      url = url + "&m_uni=" + m_uni;
    }

    console.log("queryrequesturl", url);

    getAllBuyRequests(url).then((data) => {
      setloading(false);
      if (requests && requests.data) {
        data.data = requests.data.concat(data.data);
      }
      if (data) {
        setrequests(data);
      }
      if (data && data.current_page == data.last_page) {
        setlastPage(true);
      }
      setloadMore(false);
      // setrequests(data)
      // if (data && data.current_page == data.last_page) {
      //   setlastPage(true);
      // } else {
      //   setlastPage(false);
      // }
    });
  };

  const handleButtonClick = () => {
    if (!loadMore) {
      setloadMore(true);
      getProductRequest(page);
      // timer.current = setTimeout(() => {
      //   setLoading(false);
      // }, 2000);
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Layout>
      <section className={classes.section}>
        <Container maxWidth="xl">
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Box className={classes.productsHeader}>
                <Typography variant="h3">Buy Requests</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddProduct}
                >
                  Add Request
                </Button>
              </Box>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <StickyBox offsetTop={100} offsetBottom={20}>
                <Sidebar type="requests" query={query} />
              </StickyBox>
            </Grid>
            <Grid item lg={9} md={9} sm={12} xs={12}>
              <Box>
                {loading && (
                  <Backdrop
                    className={classes.backdrop}
                    open={loading}
                    // onClick={handleClose}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                )}
                <div className={classes.root}>
                  {requests &&
                    requests.data &&
                    requests.data.length > 0 &&
                    requests.data.map((data) => (
                      <Accordian
                        data={data}
                        isAuthUser={data.user_id == user.id}
                        key={data.id}
                      />
                    ))}
                  {/* <Accordian />
                  
                  <Accordian /> */}
                </div>

                { requests.data &&  requests.data.length <= 0 && (
                  <Typography variant="h4">
                    No product request for now
                  </Typography>
                )}
              </Box>

              {requests.data && requests.data.length > 0 && !lastPage && (
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
    </Layout>
  );
}
