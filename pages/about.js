import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../src/Layout';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import {
  commonStyles,
  desktopStyles,
  mobileStyles,
  TabStyles,
} from '../src/styles';

const useStyles = makeStyles((theme) => ({
  ...commonStyles,
  [theme.breakpoints.up('md')]: desktopStyles,
  [theme.breakpoints.between('sm', 'md')]: TabStyles,
  [theme.breakpoints.down('sm')]: mobileStyles,
}));



export default function About({ bproducts, sproducts, events, reviews, ads }) {
  const classes = useStyles();

    return (
    <Layout>
        <section className={classes.section}>
        <Container maxWidth="xl">
          <Box className={classes.sectionHeader}>
            <Typography variant="h3">
              About
            </Typography>
            <p>
              
Friendzproducts platform is only made for college students where one can find a plethora of items options to opt. The best part about us is that neither buyer nor seller has to move anywhere. One gets all things done within the college campus at feasible prices. We come forward to save your energy, time and efforts. Want to buy a bike? We are here for you. Want to sell your books? We are again here for you. We care for you and your pocket-money that is why we serve without any service fee.You could also put a request for a particular item you are looking for. At Friendzpreoducts.com, you will also get to know about various events happening throughout colleges in India.

            </p>
              </Box>
        </Container>
      </section>
    </Layout>
  );
}