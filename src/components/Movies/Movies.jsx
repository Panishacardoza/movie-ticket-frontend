import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getAllMovies } from "../../helper/ApiHelpers";
import MovieItem from "./MovieItem";

const Movies = () => {
  const [movies, setMovies] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        variant='h4'
        padding={2}
        textAlign='center'
        margin={"auto"}
        color='white'
        bgcolor={"#900C3F"}
        width='40%'
      >
        All Movie
      </Typography>
      <Box
        width={"100%"}
        margin={5}
        display={"flex"}
        justifyContent='flex-start'
        flexWrap={"wrap"}
      >
        {movies &&
          movies.map((movie, index) => (
            <MovieItem
              key={index}
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Movies;
