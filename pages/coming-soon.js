import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layout from "../src/Layout";
import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { commonStyles, desktopStyles, mobileStyles, TabStyles } from '../src/styles';

const useStyles = makeStyles(theme => ({
  ...commonStyles,
  [theme.breakpoints.up('md')]: desktopStyles,
  [theme.breakpoints.between('sm', 'md')]: TabStyles,
  [theme.breakpoints.down('sm')]: mobileStyles
}))

export default function CommingSoon() {

  const classes = useStyles()
  
  return (
    <Layout>
      <section className={classes.section} style={{textAlign: 'center'}}>
        <img className={classes.csoonImg} src="/static/images/csoon.svg" />
        <Typography variant="h2">Page is Under Development</Typography>
      </section>
    </Layout>
  );
}

