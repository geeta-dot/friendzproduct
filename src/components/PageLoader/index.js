import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  commonStyles,
  desktopStyles,
  mobileStyles,
  TabStyles,
} from "../../../src/styles";
const useStyles = makeStyles((theme) => ({
  ...commonStyles,
  [theme.breakpoints.up("md")]: desktopStyles,
  [theme.breakpoints.between("sm", "md")]: TabStyles,
  [theme.breakpoints.down("sm")]: mobileStyles,
}));

const PageLoader = (props) => {
  const { loading } = props;
  const classes = useStyles();

  return (
    loading && (
      <Backdrop
        className={classes.backdrop}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  );
};

export default PageLoader