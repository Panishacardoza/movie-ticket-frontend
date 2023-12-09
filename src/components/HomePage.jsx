import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import MovieItem from "./Movies/MovieItem";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getAllMovies } from "../helper/ApiHelpers";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box width={"100%"} height='100%' margin='auto' marginTop={2}>
      <Box margin={"auto"} width='1000px' height="700px" padding={2}>
        <img
          src='https://pbs.twimg.com/media/E57pMzhVgAkFDYd?format=jpg&name=4096x4096'
          alt=''
          width={"100%"}
          height={"100%"}
          
        />
      </Box>
      <Box padding={5} margin='auto'>
        <Typography variant='h4' textAlign={"center"}>
          Latest Release
        </Typography>
      </Box>
      <Box
        margin={"auto"}
        display='flex'
        width='80%'
        justifyContent={"center"}
        alignItems='center'
        flexWrap='wrap'
      >
        {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <MovieItem
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </Box>
      <Box display='flex' padding={4} margin='auto'>
        <Button
          LinkComponent={Link}
          to='/movies'
          variant='outlined'
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
