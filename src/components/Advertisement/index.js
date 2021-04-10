import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    Ad:{
      margin:'0',
      '& a':{
        display: 'block',
        lineHeight: 0
      },
      '& img':{
        width: '100%',
        height: 'auto',
        maxHeight: '380px',
        objectFit: 'cover'
      }
    }
}))

export default function Advertisement(props) {

  const classes = useStyles()

  return (
    <div className={classes.Ad}>
      {/* <Container maxWidth="xl"> */}
      <a href={props.adlink} target="_blank">
          <img src={props.adImg} />
        </a>
      {/* </Container> */}
    </div>
  )
};

