import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../src/Layout";
import StarRatings from "react-star-ratings";
import { Container, Card, CardContent, Box, Typography, Link, Button } from "@material-ui/core";
import { getAllFeedback } from "../src/apis/global-api";

import Router from "next/router";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: "1rem",
    boxShadow: "none",
  },
  cardBody: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "50%",
    marginRight: "1rem",
    flexShrink: "0",
  },
  reviewContent: {
    flex: "1",
  },
  heading:{
    fontSize: '3rem',
    textAlign: 'center',
    margin: '1rem 0',
    [theme.breakpoints.down("sm")]:{
      fontSize: '2.5rem'
    }
  }
}));

export default function Feedback() {
  const classes = useStyles();
  const [list_reviews, setlist_reviews] = useState([]);

  useEffect(() => {
    getAllFeedback().then((data) => {
      setlist_reviews(data);
    });
  }, []);

  return (
    <Layout>
      <section className={classes.section}>
        <Container maxWidth="xl">
          <Typography variant="h3" className={classes.heading}>
            Feedback
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ textAlign: 'center', marginBottom: '1rem' }}
            onClick={() => {
              Router.push('/post/feedback');
            }}
          >
            Add Your Feedback
          </Button>
          {list_reviews &&
            list_reviews.length > 0 &&
            list_reviews.map((item) => (
              <div className={classes.TestimonialSlide} key={item.id}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardBody}>
                    <img src={item.link} alt="" className={classes.image} />
                    <Box className={classes.reviewContent}>
                      <Typography variant="h6" className={classes.name}>
                        {item.name}
                      </Typography>
                      <StarRatings
                        rating={item.rating}
                        starRatedColor="#FFC107"
                        starHoverColor="#FFC107"
                        starDimension="21px"
                        numberOfStars={5}
                        name={item.id}
                      />
                      <Typography className={classes.review}>
                        {item.text}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </div>
            ))}

          {list_reviews && list_reviews.length <= 0 && (
            <Typography variant="h4" style={{textAlign:'center',margin:20}}>No feedbacks for now</Typography>
          )}
        </Container>
      </section>
    </Layout>
  );
}
