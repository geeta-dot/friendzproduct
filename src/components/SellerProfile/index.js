import React, { useState, useEffect } from "react";
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
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import SchoolIcon from "@material-ui/icons/School";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import ProductCard from "../ProductCard";
import EventCard from "../EventCard";
import ResetPassword from "../ResetPassword";
import { commonStyles, desktopStyles, mobileStyles, TabStyles } from "./styles";
import { getProducts, getEvents } from "../../apis/global-api";
import { GetUserFavourite, GetUserRequests } from "../../apis/auth-api";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Accordian from "../Accordian";
import { useRouter } from "next/router";
import { unauthenticated } from "../../redux/actions/auth";

// import Link from "@material-ui/core/Link";


const useStyles = makeStyles((theme) => ({
  ...commonStyles,
  [theme.breakpoints.up("sm")]: desktopStyles,
  [theme.breakpoints.between("xs", "sm")]: TabStyles,
  [theme.breakpoints.down("xs")]: mobileStyles,
}));

const sellerProfile = ({ user, events, favevents, favproducts, resetPwd, requests }) => {
  const [data, setdata] = useState();
  const [eventsdata, seteventsdata] = useState();
  const [faveventsdata, setfaveventsdata] = useState();
  const [favproductsdata, setfavproductsdata] = useState();
  const [requestsdata, setrequestsdata] = useState();
  const auth_user = useSelector((state) => state.auth_user.user);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {

    fetchData();
  }, [user]);

  const logout = () => {
    // setAnchorEl(null);
    router.push("/");
    dispatch(unauthenticated());
  };

  const fetchData = () => {
    getProducts(`?seller_id=${user.id}`).then((data) => setdata(data));
    events && getEvents(`?seller_id=${user.id}`, true).then((data) => seteventsdata(data));
    favevents && GetUserFavourite(user.id, 'event').then((data) => setfaveventsdata(data));
    favproducts && GetUserFavourite(user.id, 'product').then((data) => setfavproductsdata(data));
    requests && GetUserRequests(user.id).then((data) => setrequestsdata(data));
  };
  const classes = useStyles();

  const isAuthUser = auth_user.id && user.id == auth_user.id;

  console.log('faveventsdata', faveventsdata)
  console.log('favproductsdata', favproductsdata)

  return (
    <section className={classes.section}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography className={classes.editTitle} variant="h3">
              {user.first_name} {user.last_name}
            </Typography>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Box className={classes.ProfileContainer}>
              <div className={classes.ProfileImage}>
                <img
                  src={
                    user.profile_img
                      ? user.profile_img
                      : "/static/images/placeholder.jpg"
                  }
                />
              </div>
              <div className={classes.ProfileDetails}>
                <Typography variant="h6">
                  <PersonIcon />
                  {user.first_name} {user.last_name}
                </Typography>
                {/* <Typography variant="h6">
                  <MailOutlineIcon />
                  <a href="mailto:ankittara15@gmail.com">{user.email}</a>
                </Typography>
                <Typography variant="h6">
                  <PhoneIphoneIcon />
                  <a href="tell:9803254362">{user.phone_number}</a>
                </Typography> */}
                <Typography variant="h6">
                  <SchoolIcon />
                  {user.university ? user.university.name : ""}
                </Typography>
                <Typography variant="h6">
                  <EditIcon />
                  <Link variant="contained" className={classes.Button} href="/profile/edit">
                    Edit Profile
                  </Link>
                </Typography>
                <Typography variant="h6">
                  <ExitToAppIcon />
                  <span style={{cursor: 'pointer'}} onClick={logout}>
                    Logout
                  </span>
                </Typography>
              </div>
            </Box>
          </Grid>
          {events && (<Grid item lg={9} md={9} sm={12} xs={12}>
            <Card className={classes.card}>
              <CardContent className={classes.cardBody}>
                <Box className={classes.productsHeader}>
                  <Typography variant="h5">Published Events</Typography>
                  {/* <div className={classes.addmoreGrid}>
                    <a className={classes.addmorebtn} href="/post">Add More ads</a>
                  </div> */}
                </Box>
                <Box className={classes.ProductsGridWrapper}>
                  {eventsdata &&
                    eventsdata.data.length > 0 &&
                    eventsdata.data.map((data) => (
                      <div key={data.id}>
                        <EventCard data={data} isAuthUser={isAuthUser} showState={false} />
                      </div>
                    ))}
                </Box>
                {eventsdata && eventsdata.data.length == 0 && (
                  <div className={classes.Noads}>
                    <Typography variant="h5">
                      There are No Events to show
                    </Typography>
                    <a href="/post/event" title="Add Product">
                      <img src="/static/images/addfile.svg" />
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
          )}
          {favevents && (<Grid item lg={9} md={9} sm={12} xs={12}>
            <Card className={classes.card}>
              <CardContent className={classes.cardBody}>
                <Box className={classes.productsHeader}>
                  <Typography variant="h5">Favourite Events</Typography>
                  {/* <div className={classes.addmoreGrid}>
                    <a className={classes.addmorebtn} href="/post">Add More ads</a>
                  </div> */}
                </Box>
                <Box className={classes.ProductsGridWrapper}>
                  {faveventsdata &&
                    faveventsdata.data.length > 0 &&
                    faveventsdata.data.map((data) => (
                      <div key={data.id}>
                        <EventCard data={data.event} isAuthUser={false} showState={false} />
                      </div>
                    ))}
                </Box>

              </CardContent>
            </Card>
          </Grid>
          )}
          {favproducts && (<Grid item lg={9} md={9} sm={12} xs={12}>
            <Card className={classes.card}>
              <CardContent className={classes.cardBody}>
                <Box className={classes.productsHeader}>
                  <Typography variant="h5">Favourite Products</Typography>
                  {/* <div className={classes.addmoreGrid}>
                    <a className={classes.addmorebtn} href="/post">Add More ads</a>
                  </div> */}
                </Box>
                <Box className={classes.ProductsGridWrapper}>
                  {favproductsdata &&
                    favproductsdata.data.length > 0 &&
                    favproductsdata.data.map((data) => (
                      <div key={data.id}>
                        <ProductCard data={data.product} isAuthUser={false}  />
                      </div>
                    ))}
                </Box>
                {favproductsdata && favproductsdata.data.length == 0 && (
                  <div className={classes.Noads}>
                    <Typography variant="h5">
                      There are No Favourite Products to show
                    </Typography>
                    <a href="/post" title="Add Product">
                      <img src="/static/images/addfile.svg" />
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
          )}
          {requests && (<Grid item lg={9} md={9} sm={12} xs={12}>
            <Card className={classes.card}>
              <CardContent className={classes.cardBody}>
                <Box className={classes.productsHeader}>
                  <Typography variant="h5">Published Requests</Typography>
                  {/* <div className={classes.addmoreGrid}>
                    <a className={classes.addmorebtn} href="/post">Add More ads</a>
                  </div> */}
                </Box>
                <Box className={classes.ProductsGridWrapper}>
                  {requestsdata &&
                    requestsdata.data.length > 0 &&
                    requestsdata.data.map((data) => (
                      <div key={data.id}>
                        <Accordian data={data} isAuthUser={true}/>
                      </div>
                    ))}
                </Box>
                {requestsdata && requestsdata.data.length == 0 && (
                  <div className={classes.Noads}>
                    <Typography variant="h5">
                      There are No Requests to show
                    </Typography>
                    <a href="/post/request" title="Add Product">
                      <img src="/static/images/addfile.svg" />
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
          )}
          {resetPwd && (<Grid item lg={9} md={9} sm={12} xs={12}>
            <Card className={classes.card}>

              <ResetPassword user={user} />
            </Card>
          </Grid>
          )}
          {!events && !favevents && !favproducts && !resetPwd && !requests && (
            <Grid item lg={9} md={9} sm={12} xs={12}>
              <Card className={classes.card}>
                <CardContent className={classes.cardBody}>
                  <Box className={classes.productsHeader}>
                    <Typography variant="h5">Published Ads</Typography>
                    {/* <div className={classes.addmoreGrid}>
                    <a className={classes.addmorebtn} href="/post">Add More ads</a>
                  </div> */}
                  </Box>
                  <Box className={classes.ProductsGridWrapper}>
                    {data &&
                      data.data.length > 0 &&
                      data.data.map((data) => (
                        <div key={data.id}>
                          <ProductCard data={data} isAuthUser={isAuthUser} />
                        </div>
                      ))}
                  </Box>
                  {data && data.data.length == 0 && (
                    <div className={classes.Noads}>
                      <Typography variant="h5">
                        There are No ads to show
                    </Typography>
                      <a href="/post" title="Add Product">
                        <img src="/static/images/addfile.svg" />
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>

      </Container>
    </section>
  );
};

export default sellerProfile;
