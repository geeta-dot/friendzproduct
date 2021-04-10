import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Card, CardContent, Typography, Link } from '@material-ui/core'
import { commonStyles, desktopStyles, mobileStyles, TabStyles } from './styles'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles(theme => ({
  ...commonStyles,
  [theme.breakpoints.up('sm')]: desktopStyles,
  [theme.breakpoints.between('xs', 'sm')]: TabStyles,
  [theme.breakpoints.down('xs')]: mobileStyles
}))

const CardHorizontal = ({ data}) => {

  const classes = useStyles()

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isVideo = data.id == "concept1"

  return (
    <Card className={classes.card}>
      <CardContent className="cardBody">
        {isVideo && <>
          <div className={classes.Media}>
            <img src={data.image.url} alt="" className="image" onClick={handleOpen} style={{cursor:'pointer'}} />
          </div>
          <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <div className={classes.paper}>
              <iframe width="1266" height="712" src="https://www.youtube.com/embed/rUWxSEwctFU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </Modal>
        </>}
        {!isVideo && <>
          <div className={classes.Media}>
            <img src={data.image.url} alt="" className="image" />
          </div>
        </>}
        <div className="content" >
          <Typography variant="h4" className={classes.title}>{data.title}</Typography>
          <Typography className={classes.excerpt}>{data.excerpt}</Typography>
          <Button variant="contained" component={Link} target="_blank" href={data.link.url} className={classes.Button}>
            {data.link.name}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardHorizontal
