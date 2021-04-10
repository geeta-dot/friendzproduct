import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Swiper from 'react-id-swiper';
import StarRatings from 'react-star-ratings'
import { Card, CardContent, Box, Typography, Link } from '@material-ui/core';
import { commonStyles, desktopStyles, mobileStyles, TabStyles } from './styles'

const useStyles = makeStyles(theme => ({
  ...commonStyles,
  [theme.breakpoints.up('sm')]: desktopStyles,
  [theme.breakpoints.between('xs', 'sm')]: TabStyles,
  [theme.breakpoints.down('xs')]: mobileStyles
}))

const Testimonial = ({ data }) => {


  const classes = useStyles()

  const params = {
    loop: true,
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: '1',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 600,
      modifier: 1,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      600: {
        slidesPerView: '2',
      }
    }
  }

  return (
    <div className={classes.carousel}>
      <Swiper {...params}>
        {data &&
          data.length &&
          data.map((item) => (
            <div className={classes.TestimonialSlide} key={item.id}>
              <Card className={classes.card}>
                <CardContent className={classes.cardBody}>
                  <img src={item.link} alt="" className={classes.image} />
                  <Box className={classes.slideContent}>
                    <Typography variant="h6" className={classes.name}>
                      {item.name}
                    </Typography>
                    <StarRatings
                      rating={item.rating}
                      starRatedColor="#FFC107"
                      starHoverColor="#FFC107"
                      starDimension="26px"
                      numberOfStars={5}
                      name={data.id}
                    />
                    <Typography className={classes.review}>
                      {item.text}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </div>
          ))}
      </Swiper>
    </div>
  );
}

export default Testimonial
