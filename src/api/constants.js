export const findPopularMovies = async () => {
  console.log("finding popular movies");
  return await fetch(
    `https://imdb8.p.rapidapi.com/title/get-most-popular-movies?currentCountry=US`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_APIKEY,
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
      },
    }
  ).then((res) => res.json());
};

export const mockFindPopularMovies = async () => {
  return await fetch(`http://localhost:8000/popularMovies`, {
    method: "GET",
  }).then((res) => res.json());
};

export const metaDataByMovie = async (ids) => {
  console.log("finding meta data");
  const link = "https://imdb8.p.rapidapi.com/title/get-meta-data?";
  const metaDataParams = (linkAcc, id) => `${linkAcc}&ids=${id}`;
  return await fetch(ids.reduce(metaDataParams, link), {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_APIKEY,
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
    },
  }).then((res) => res.json());
};

export const overviewByMovie = async (id) => {
  console.log("finding overview");
  return await fetch(
    `https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=${id}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_APIKEY,
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
      },
    }
  ).then((res) => res.json());
};

export const findQueryMovies = async (query) => {
  console.log("searching query");
  return await fetch(
    `https://imdb8.p.rapidapi.com/title/find?q=${query.replace(" ", "%")}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_APIKEY,
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
      },
    }
  ).then((res) => res.json());
};
