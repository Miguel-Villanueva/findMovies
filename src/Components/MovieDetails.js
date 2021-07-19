import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Dialog,
  Typography,
} from "@material-ui/core";
import { overviewByMovie } from "../api/constants";
import { useQuery } from "react-query";
import { Grid, Box, CircularProgress } from "@material-ui/core";
import { ReactComponent as Surprised } from "../assets/surprised.svg";
import { transformOverviewData } from "../api/util";
import { makeStyles } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import { CenterFocusStrong } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  dialogWindow: {
    minWidth: "1200px",
  },
  movieImage: {
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
  if (movieID === "") {
    return <div></div>;
  }
  const handleClose = () => {
    onClose(movieID);
  };

  if (isLoading) {
    return (
      <div>
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
  console.log(movieData);
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
          <Grid item xs={3}>
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
