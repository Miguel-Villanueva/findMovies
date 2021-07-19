import React, { useEffect } from "react";
import { findPopularMovies, findQueryMovies } from "../api/constants";
import { useQuery } from "react-query";
import { Typography, Box, CircularProgress } from "@material-ui/core";
import { ReactComponent as Surprised } from "../assets/surprised.svg";
import { getQueryMovieIDs, getPopularMovieIDs } from "../api/util";
import { PosterDisplay } from "./PosterDisplay";

//Searches the user query or the most popular movies
export const SearchResults = (props) => {
  const query = props.search;

  const { isLoading, error, data } = useQuery(query, () =>
    query === "" ? findPopularMovies() : findQueryMovies(query)
  );

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
  const queryIDs =
    query === "" ? getPopularMovieIDs(data) : getQueryMovieIDs(data);

  return (
    <Box mr={"7%"} ml={"7%"} mt={15}>
      {query === "" ? (
        <Typography variant="h6">YOU MIGHT LIKE</Typography>
      ) : (
        <Typography variant="h6">SEARCH RESULTS</Typography>
      )}

      <PosterDisplay movieIDs={queryIDs} handleClick={props.handleClick} />
    </Box>
  );
};
