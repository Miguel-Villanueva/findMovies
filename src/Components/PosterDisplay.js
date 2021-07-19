import React from "react";
import { useQuery } from "react-query";
import { metaDataByMovie } from "../api/constants";
import { ReactComponent as Surprised } from "../assets/surprised.svg";
import { useWindowDimensions } from "../useWindowsDimension";
import {
  CircularProgress,
  GridList,
  GridListTile,
  GridListTileBar,
  makeStyles,
} from "@material-ui/core";
import { transformMetaData } from "../api/util";
import CallMadeIcon from "@material-ui/icons/CallMade";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  movieGridHolder: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",

    [theme.breakpoints.down("sm")]: {},
  },
  icon: {
    color: "#FFFFFF",
  },
}));

export const PosterDisplay = (props) => {
  const classes = useStyles();
  const { isLoading, error, data } = useQuery(props.movieIDs, () =>
    metaDataByMovie(props.movieIDs)
  );
  const handleClick = props.handleClick;
  const { height, width } = useWindowDimensions();

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

  const metaData = transformMetaData(data);

  const display = Object.keys(metaData).map((movie) => {
    return (
      <GridListTile key={metaData[movie].id} cols={1}>
        <img src={metaData[movie].image} alt={metaData[movie].title} />
        <GridListTileBar
          title={metaData[movie].title}
          subtitle={metaData[movie].year}
          actionIcon={
            <IconButton
              className={classes.icon}
              onClick={() => handleClick(metaData[movie].id)}
            >
              <CallMadeIcon />
            </IconButton>
          }
        />
      </GridListTile>
    );
  });

  return (
    <div>
      <GridList
        className={classes.movieGridHolder}
        spacing={50}
        cellHeight={width < 800 ? height / 3.5 : height / 2.5}
        cols={width < 500 ? 2 : 4}
      >
        {display}
      </GridList>
    </div>
  );
};
