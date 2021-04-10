import React from "react";
import ImageEditorRc from "react-cropper-image-editor";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  Modal:{
    '& .MuiDialog-paperWidthSm':{
      height: '610px',
      [theme.breakpoints.down('sm')]: {
        height: '400px'
      } 
    },
    '& .cropper':{
      width: '100%',
      height: '400px',
      [theme.breakpoints.down('sm')]:{
        height: '200px'
      } 
    },
    '& .cropper ul':{
      display: 'flex',
      padding: '0',
      listStyle: 'none'
    },
    '& .cropper ul li':{
      marginRight: '1rem'
    },
    '& .cropper ul button':{
        background: '#000000',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        padding: '10px 15px',
        height: '100%',
        fontSize: '1rem'
    }
  }
}));

export const ImageCropper = ({ open, handleClose, handleSave, image }) => {

  const classes = useStyles();

  if (!image) {
    return null;
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      className={classes.Modal}
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" onClose={handleClose}>
        Crop Profile Picture
      </DialogTitle>
      <DialogContent>
        <ImageEditorRc
          // ref="cropper"
          crossOrigin="true" // boolean, set it to true if your image is cors protected or it is hosted on cloud like aws s3 image server
          src={image}
          aspectRatio={1 / 1}
          className={"cropper"}
          guides={true}
          rotatable={true}
          saveImage={(e) => handleSave(e)} // it has to catch the returned data and do it whatever you want
          responseType="blob/base64"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropper;
