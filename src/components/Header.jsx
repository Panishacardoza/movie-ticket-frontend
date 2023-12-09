import { AppBar, Box, Toolbar, IconButton } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, useEffect } from "react";
import { getAllMovies } from "../helper/ApiHelpers";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminActions, userActions } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  // logout
  const logOut = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };
  return (
    <>
      <AppBar position='sticky' sx={{ bgcolor: "#2b2d42" }}>
        <Toolbar>
          <Box width={"20%"}>
            <IconButton LinkComponent={Link} to='/'>
              <MovieIcon />
            </IconButton>
          </Box>
          <Box width={"50%"} margin={"auto"}>
            <Autocomplete
              onChange={handleChange}
              freeSolo
              options={movies && movies.map((options) => options.title)}
              renderInput={(params) => (
                <TextField
                  sx={{ input: { color: "white" } }}
                  {...params}
                  placeholder='Search Accros Movie'
                />
              )}
            />
          </Box>
          <Box display={"flex"}>
            <Tabs
              textColor='inherit'
              indicatorColor='secondary'
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab LinkComponent={Link} to='/movies' label='Movie' />
              {!isAdminLoggedIn && !isUserLoggedIn && (
                <>
                  <Tab LinkComponent={Link} to='/admin' label='Admin' />
                  <Tab LinkComponent={Link} to='/auth' label='Auth' />
                </>
              )}
              {isUserLoggedIn && (
                <>
                  <Tab LinkComponent={Link} to='/user' label='Profile' />
                  <Tab
                    onClick={() => logOut(false)}
                    LinkComponent={Link}
                    to='/'
                    label='Logout'
                  />
                </>
              )}
              {isAdminLoggedIn && (
                <>
                  <Tab LinkComponent={Link} to='/user-admin' label='Profile' />
                  <Tab LinkComponent={Link} to='/add' label='Add Movies' />
                  <Tab
                    onClick={() => logOut(true)}
                    LinkComponent={Link}
                    to='/'
                    label='Logout'
                  />
                </>
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
