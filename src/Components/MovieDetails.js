import React from "react";
import {
  makeStyles,
  Dialog,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { overviewByMovie } from "../api/constants";
import { useQuery } from "react-query";
import { Grid, CircularProgress } from "@material-ui/core";
import { ReactComponent as Surprised } from "../assets/surprised.svg";
import { transformOverviewData } from "../api/util";
import StarIcon from "@material-ui/icons/Star";
import { useTheme } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  dialogWindow: {
    [theme.breakpoints.up('md')]: {
      minWidth: '1200px'
    },
  },
  movieImage: {
    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
    height: "100%",
    width: "100%",
  },
  star: {
    color: "error",
  },
  movieInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",

    marginLeft: "25px",
    marginRight: "25px",
  },
}));

export const MovieDetails = (props) => {
  const classes = useStyles();
  const { onClose, movieID, open } = props;
  const { isLoading, error, data } = useQuery(["details", movieID], () =>
    overviewByMovie(movieID)
  );
  const theme = useTheme();
  const mediaQuery = useMediaQuery(theme.breakpoints.up('m')) ? 1 : 3;
  console.log(mediaQuery);
  if (movieID === "") {
    return <div></div>;
  }
  const handleClose = () => {
    onClose(movieID);
  };

  if (isLoading) {
    return (
      <div className='loading'>
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <Surprised />
      </div>
    );
  }
  const movieData = transformOverviewData(data);

  return (
    <div>
      <Dialog
        className={classes.dialogWindow}
        fullWidth={true}
        maxWidth={"lg"}
  
        onClose={handleClose}
        open={open}
      >
        <Grid container direction="row">
          <Grid item xs={mediaQuery} style={{margin: '0 auto'}}>
              <img
                className={classes.movieImage}
                src={movieData.image}
                alt={movieData.title}
              />
            
          </Grid>
          <Grid className={classes.movieInfo} item xs={8}>
            <Typography variant="h3">{movieData.title}</Typography>
            <Typography variant="subtitle2">Year: {movieData.year} </Typography>
            <Typography variant="h5">
              <StarIcon color="error" />
              {movieData.rating}/10
            </Typography>
            <Typography variant="body1">{movieData.plot}</Typography>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};
