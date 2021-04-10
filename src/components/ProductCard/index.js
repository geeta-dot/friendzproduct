import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Link } from "@material-ui/core";
import StarRatings from "react-star-ratings";
import { commonStyles, desktopStyles, mobileStyles, TabStyles } from "./styles";
import moment from "moment";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { DeleteProduct, Favourite } from "../../apis/auth-api";
import { authenticated } from "../../redux/actions/auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
const API_HOST = process.env.API_HOST;
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  ...commonStyles,
  [theme.breakpoints.up("sm")]: desktopStyles,
  [theme.breakpoints.between("xs", "sm")]: TabStyles,
  [theme.breakpoints.down("xs")]: mobileStyles,
}));

function ProductCard({ data, isAuthUser = false }) {
  const dispatch = useDispatch();
  const [isSaved, setisSaved] = React.useState(data.saved);
  const [productStar, setproductStar] = React.useState(isSaved ? 1 : 0);
  const [snackbar, setsnackbar] = React.useState(false);
  const [snackbarMsg, setsnackbarMsg] = React.useState("");
  const [snackbarType, setsnackbarType] = React.useState("success");
  const userdetail = useSelector((state) => state.auth_user.user);
  const accessToken = useSelector((state) => state.auth_user.accessToken);
  const user = useSelector((state) => state.auth_user.user.id);
  const userFavProducts = useSelector(
    (state) => state.auth_user.userFavProducts
  );

  useEffect(() => {
    isFavourite();
  }, [userFavProducts]);

  const classes = useStyles();
  const router = useRouter();
  const favPage = router.pathname.search("favourite") == -1 ? false : true;

  const changeRating = () => {
    if (!accessToken || accessToken == "") {
      window.location.replace("/?signup=open");
    }

    if (!isSaved && productStar == 0) {
      Favourite({
        type_id: data.id,
        type: "product",
        user_id: user,
        action: "add",
      }).then((response) => {
        if (response.error) {
          setsnackbar(true);
          setsnackbarMsg("There is some error.Please try again later");
          setsnackbarType("error");
          console.log(response.error);
        } else {
          setsnackbar(true);
          setsnackbarMsg("Added to favourites");
          setsnackbarType("success");
          console.log(userdetail, accessToken, response);
          dispatch(
            authenticated(
              userdetail,
              accessToken,
              response.body.favEvents,
              response.body.favProducts
            )
          );
        }
      });

      setproductStar(1);
      setisSaved(!isSaved);
    } else {
      Favourite({
        type_id: data.id,
        type: "product",
        user_id: user,
        action: "remove",
      }).then((response) => {
        console.log(response);
        if (response.error) {
          setsnackbar(true);
          setsnackbarMsg("There is some error.Please try again later");
          setsnackbarType("error");
          console.log(response.error);
        } else {
          setsnackbar(true);
          setsnackbarMsg("Removed from favourites");
          setsnackbarType("success");
          dispatch(
            authenticated(
              userdetail,
              accessToken,
              response.body.favEvents,
              response.body.favProducts
            )
          );
          if (favPage) {
            document.getElementById("card_" + data.id).parentElement.remove();
          }
        }
      });

      setproductStar(0);
      setisSaved(!isSaved);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    router.push("/post/edit/" + data.id);
  };
  const handleDelete = () => {
    DeleteProduct(data, data.id).then((response) => {
      if (response.error) {
        setsnackbar(true);
        setsnackbarMsg("There is some error.Please try again later");
        setsnackbarType("error");
      } else {
        setsnackbar(true);
        setsnackbarMsg("Deleted");
        setsnackbarType("success");
        location.reload();
      }
    });
  };

  const isFavourite = () => {
    if (userFavProducts && userFavProducts.includes(data.id)) {
      console.log(userFavProducts, userFavProducts.includes(data.id));
      setisSaved(true);
      setproductStar(1);
    }
  };

  const handlesnackbar = () => {
    setsnackbar(!snackbar);
  };

  return (
    <Card
      id={'card_' + data.id}
      className={
        isSaved ? `${classes.card} ${classes.Orangecard} ` : `${classes.card}`
      }
    >
      <CardContent className={classes.cardInner}>
        <div className={classes.cardHead}>
          <Snackbar
            open={snackbar}
            autoHideDuration={6000}
            onClose={handlesnackbar}
          >
            <Alert onClose={handlesnackbar} severity={snackbarType}>
              {snackbarMsg}
            </Alert>
          </Snackbar>
          <Typography variant="h6" className={classes.title}>
            {data.title.length >= 25 && (
              <Link href={`/products/item/${data.id}`}>
                {data.title.substring(0, 25) + '...'}{' '}
              </Link>
            )}
            {data.title.length < 25 && (
              <Link href={`/products/item/${data.id}`}>{data.title}</Link>
            )}
          </Typography>
          {isAuthUser && (
            <div>
              <MoreVertIcon
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              ></MoreVertIcon>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </div>
          )}
          {!isAuthUser && isSaved ? (
            <FavoriteIcon
              style={{ color: 'var(--theme)' }}
              onClick={changeRating}
              id={data.id}
            />
          ) : (
            <FavoriteBorderIcon
              style={{ color: 'var(--theme)' }}
              onClick={changeRating}
              id={data.id}
            />
          )}
        </div>
        <div className={classes.cardBody}>
          {data.images.length > 0 && (
            <Link href={`/products/item/${data.id}`}>
              <img
                src={`${API_HOST}/generate-thumb/145/300/${data.images[0].absolute_path}`}
                alt=""
                className={classes.image}
              />
            </Link>
          )}
        </div>
        <div className={classes.cardFooter}>
          <div className={classes.left}>
            <Typography className={classes.excerpt}>
              {data.description.substring(0, 35) + '...'}{' '}
            </Typography>
            {data.university.name.length >= 25 && (
              <Typography className={classes.college}>
                {data.university.name.substring(0, 25) + '...'}{' '}
              </Typography>
            )}
            {data.university.name.length < 25 && (
              <Typography className={classes.college}>
                {data.university.name}
              </Typography>
            )}
          </div>
          <div className={classes.right}>
            <Typography
              className={
                isSaved
                  ? `${classes.price} ${classes.Orangeprice} `
                  : `${classes.price}`
              }
            >
              &#8377;{data.price}
            </Typography>
            <Typography className={classes.date}>
              {moment(data.created_at).format('MMMM D ')}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
