import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Swiper from 'react-id-swiper';
import { Box, Button, Container, Typography, Link } from '@material-ui/core';
import { commonStyles, desktopStyles, mobileStyles, TabStyles } from './styles'

const useStyles = makeStyles(theme => ({
  ...commonStyles,
  [theme.breakpoints.between('md','lg')]: desktopStyles,
  [theme.breakpoints.between('sm', 'md')]: TabStyles,
  [theme.breakpoints.down('sm')]: mobileStyles
}))

const Banner = ({ data }) => {

  const classes = useStyles()

  const params = {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }

    return (
    <div className={classes.carousel}>
      <Swiper {...params}>
        <div className={classes.BannerSlide} style={{ backgroundImage:'url(/static/images/collegeplus.jpg)' }} >
            <Container maxWidth="xl">
              <Box className={classes.slideContent}>
                {/* <Typography variant="h1">Buy, Sell, Rent</Typography>
                <Typography variant="h3">and check events in your college</Typography>
                <Button variant="contained" component={Link} to="/" className={classes.Button}>
                  Learn More
                </Button> */}
              </Box>
            </Container>
        </div>
        <div className={classes.BannerSlide} style={{ backgroundImage:'url(/static/images/buy.jpg)' }} >
            <Container maxWidth="xl">
              <Box className={classes.slideContent}>
              </Box>
            </Container>
        </div>
        <div className={classes.BannerSlide} style={{ backgroundImage:'url(/static/images/sell.jpg)' }} >
            <Container maxWidth="xl">
              <Box className={classes.slideContent}>
              </Box>
            </Container>
        </div>
        <div className={classes.BannerSlide} style={{ backgroundImage:'url(/static/images/request.jpg)' }} >
            <Container maxWidth="xl">
              <Box className={classes.slideContent}>
              </Box>
            </Container>
        </div>
        <div className={classes.BannerSlide} style={{ backgroundImage:'url(/static/images/events.jpg)' }} >
            <Container maxWidth="xl">
              <Box className={classes.slideContent}>
              </Box>
            </Container>
        </div>
      </Swiper>
    </div>
  )
}

export default Banner
