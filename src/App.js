import { AppBarSearch } from "./Components/AppBarSearch";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  QueriesObserver,
} from "react-query";
import { SearchResults } from "./Components/SearchResults";

import { Grid } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useState } from "react";
import { MovieDetails } from "./Components/MovieDetails";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#FFFFFF",
    },
    error: {
      main: "#ffd560",
    },
  },
});

const queryClient = new QueryClient();

export const App = () => {
  //const { searchTerm } = useContext(FindMoviesContext)
  //const [searchTerm, setSearchTerm] = useState('')
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setQuery(event.target.value);
  };

  const handleClick = (id) => {
    setSelectedValue(id);
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Grid>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AppBarSearch query={query} handleChange={handleChange} />
          <SearchResults search={query} handleClick={handleClick} />

          {selectedValue === "" ? (
            <div></div>
          ) : (
            <MovieDetails
              movieID={selectedValue}
              open={open}
              onClose={handleClose}
            />
          )}
          {/* <MoviesList query={searchTerm} />
          <MovieDetialsDialog /> */}
          {/* Have Dialog here instead and lift the state up on App level? */}
        </ThemeProvider>
      </QueryClientProvider>
    </Grid>
  );
};
