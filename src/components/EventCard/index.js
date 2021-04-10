import React ,{useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography, Link } from '@material-ui/core'
import StarRatings from 'react-star-ratings'
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { DeleteEvent , Favourite} from "../../apis/auth-api";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { commonStyles, desktopStyles, mobileStyles, TabStyles } from './styles'
import { authenticated } from "../../redux/actions/auth";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
const API_HOST = process.env.API_HOST;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(theme => ({
  ...commonStyles,
  [theme.breakpoints.up('sm')]: desktopStyles,
  [theme.breakpoints.between('xs', 'sm')]: TabStyles,
  [theme.breakpoints.down('xs')]: mobileStyles
}))

function EventCard({ data, isAuthUser = false, showState=false }) {
  const dispatch = useDispatch();
  const [isSaved, setisSaved] = React.useState(data.saved)
  const [eventStar, seteventStar] = React.useState(isSaved ? 1 : 0)
  const [snackbar, setsnackbar] = React.useState(false);
  const [snackbarMsg, setsnackbarMsg] = React.useState("");
  const [snackbarType, setsnackbarType] = React.useState("success");
  const user = useSelector((state) => state.auth_user.user.id);
  const userFavEvents = useSelector((state) => state.auth_user.userFavEvents);
  const accessToken = useSelector((state) => state.auth_user.accessToken);
  const userdetail = useSelector((state) => state.auth_user.user);

    useEffect(() => {
       isFavourite();
    }, [userFavEvents])
  const router = useRouter();
  const favPage = router.pathname.search('favourite')==-1 ? false : true;

  const classes = useStyles()

  const isFavourite = () => {
      if (userFavEvents && userFavEvents.includes(data.id)) {
          console.log(userFavEvents,userFavEvents.includes(data.id))
          setisSaved(1);
          seteventStar(1);
         
      }
    };
  const changeRating = () => {
    console.log('clk');
    if (!accessToken || accessToken==''){
      window.location.replace("/?signup=open");
    }
   
    if (!isSaved && eventStar == 0) {

       Favourite({'type_id':data.id,type:'event','user_id':user,'action':'add'}).then((response) => {
        if (response.error) {
          setsnackbar(true);
          setsnackbarMsg("There is some error.Please try again later");
          setsnackbarType("error");          
          dispatch(authenticated(userdetail, accessToken, response.body.favEvents,response.body.favProducts));

        } else {
          setsnackbar(true);
          setsnackbarMsg("Added to favourites");
          setsnackbarType("success");
          dispatch(authenticated(userdetail, accessToken, response.body.favEvents,response.body.favProducts));

         
        }
      });

      seteventStar(1);
      setisSaved(!isSaved);
    } else {

       Favourite({'type_id':data.id,type:'event','user_id':user,'action':'remove'}).then((response) => {
       
        if (response.error) {
          setsnackbar(true);
          setsnackbarMsg("There is some error.Please try again later");
          setsnackbarType("error");       
          dispatch(authenticated(userdetail, accessToken, response.body.favEvents,response.body.favProducts));
        } else {
          setsnackbar(true);
          setsnackbarMsg("Removed from favourites");
          setsnackbarType("success");
          dispatch(authenticated(userdetail, accessToken, response.body.favEvents,response.body.favProducts));
          if(favPage){
            document.getElementById('card_'+data.id).parentElement.remove();
          }
        }
      });

      seteventStar(0);
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
    router.push("/post/event/edit/" + data.id);
  };
  const handleDelete = () => {
    DeleteEvent(data, data.id).then((response) => {
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


  
  const handlesnackbar = () => {
    setsnackbar(!snackbar);
  };


  return (
    <Card className={`${classes.card} event__card`} id={"card_"+data.id}>
      {/* <img src={data.image.url} alt="" className={classes.image} /> */}
      {data.images.length > 0 && (
        <Link href={`/events/item/${data.id}`}>
          <img
            src={`${API_HOST}/generate-thumb/220/300/${data.images[0].absolute_path}`}
            alt=""
            className={classes.image}
          />
        </Link>
      )}
      <CardContent
        className={
          isSaved
            ? `${classes.cardInner} ${classes.Orangecard} `
            : `${classes.cardInner}`
        }
      >
             <Snackbar
            open={snackbar}
            autoHideDuration={6000}
            onClose={handlesnackbar}
          >
            <Alert onClose={handlesnackbar} severity={snackbarType}>
              {snackbarMsg}
            </Alert>
          </Snackbar>
        <div className={classes.flex}>
          <Typography variant="h6" className={classes.title}>
            {data.title.length >= 25 && (
              <Link href={`/events/item/${data.id}`}>
                {data.title.substring(0, 25) + "..."}{" "}
              </Link>
            )}
            {data.title.length < 25 && (
              <Link href={`/events/item/${data.id}`}>{data.title}</Link>
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
          {!isAuthUser &&
            isSaved ?    <FavoriteIcon style={{ color: 'var(--theme)' }} onClick={changeRating}  id={data.id} /> : 
            <FavoriteBorderIcon style={{ color: 'var(--theme)' }} onClick={changeRating}  id={data.id} />  }
          
          

        </div>
        {isAuthUser ?

          data.active ? <Typography color="success" variant="h6" className={classes.date}>Active</Typography> : <Typography color="error" variant="h6" className={classes.date}>Inactive</Typography> :''}

      
        <div className={classes.flex}>
          <Typography className={classes.date}>{data.event_date}</Typography>
          {/* <Typography
            className={
              isSaved
                ? `${classes.price} ${classes.Orangeprice} `
                : `${classes.price}`
            }
          >
            &#8377;{data.price}
          </Typography> */}
        </div>
        <div className={classes.cardBody}>
          {/* <Typography className={classes.excerpt}>
            {data.description.substring(0, 35) + "..."}{" "}
          </Typography> */}
          {data.university.name.length >= 25 && (
            <Typography className={classes.college}>
              {data.university.name.substring(0, 25) + "..."}{" "}
            </Typography>
          )}
          {data.university.name.length < 25 && (
            <Typography className={classes.college}>
              {data.university.name}
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default EventCard