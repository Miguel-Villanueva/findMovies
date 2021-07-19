// Transforms array size 100 of "/title/tt12676326/" -> array size 8 of "tt12676326"
import BrokenImageIcon from "@material-ui/icons/BrokenImage";

//Retrieves top 8 most popular IMDB movie codes
export const getPopularMovieIDs = (data) =>
  data
    .map((link) => {
      return link.substring(7, link.length - 1);
    })
    .slice(0, 8);

//Retrieves top 8 IMDB movie code results from user query
export const getQueryMovieIDs = (data) =>
  data.results
    .filter((movie) => movie.id.substring(0, 7) === "/title/")
    .map((movie) => {
      return movie.id.substring(7, movie.id.length - 1);
    });

//Transforms metadata object into {title, image, year, rating}
export const transformMetaData = (data) => {
  return Object.keys(data).map((movie) => {
    return {
      id: movie,
      title: data[movie].title.title,
      image: data[movie].title.hasOwnProperty("image")
        ? data[movie].title.image.url
        : { BrokenImageIcon },
      year: data[movie].title.year,
      rating: data[movie].ratings.rating,
    };
  });
};

export const transformOverviewData = (data) => {
  return {
    title: data.title.title,
    image: data.title.hasOwnProperty("image")
      ? data.title.image.url
      : { BrokenImageIcon },
    year: data.title.year,
    rating: data.ratings.rating ? data.ratings.rating : "No Rating Available",
    genres: data.genres,
    plot: data.hasOwnProperty("plotSummary")
      ? data.plotSummary.text
      : data.hasOwnProperty("plotOutline")
      ? data.plotOutline.text
      : "No Plot Summary Available",
  };
};
